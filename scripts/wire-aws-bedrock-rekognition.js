#!/usr/bin/env node
/**
 * Wires up:
 *   1. cai-handler.js   — Bedrock (replaces Anthropic SDK) + Rekognition + S3
 *   2. package.json     — updated dependencies
 *   3. template.yaml    — S3 bucket, Bedrock/Rekognition/S3 IAM, photo-upload route
 *   4. db-handler.js    — /alist/photo-upload presigned URL endpoint
 *   5. alist.web.js     — uploadSkinPhoto web method
 */

const fs   = require('fs');
const path = require('path');

const ROOT   = path.resolve(__dirname, '..');
const LAMBDA = path.join(ROOT, 'aws/lambda');

// ─────────────────────────────────────────────────────────────────────────────
// 1. cai-handler.js
// ─────────────────────────────────────────────────────────────────────────────

let cai = fs.readFileSync(path.join(LAMBDA, 'cai-handler.js'), 'utf8');

// Replace header comment + imports + setup block
cai = cai.replace(
`// C-Ai AWS Lambda handler — ca-central-1
// Serves both Ambitiously Institute (consultation/education AI) and
// By BoBo A List (skin intelligence: intake → mapping → ingredients → formulation).
//
// Secrets Manager secret: ambitiously/anthropic-api-key
// Env vars set by SAM: CLAUDE_MODEL, ALLOWED_ORIGIN, ANTHROPIC_SECRET_NAME

import Anthropic from "@anthropic-ai/sdk";
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secrets = new SecretsManagerClient({ region: "ca-central-1" });
let _anthropicKey = null;

async function getAnthropicKey() {
    if (_anthropicKey) return _anthropicKey;
    const res = await secrets.send(
        new GetSecretValueCommand({ SecretId: process.env.ANTHROPIC_SECRET_NAME })
    );
    _anthropicKey = res.SecretString;
    return _anthropicKey;
}

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";`,

`// C-Ai AWS Lambda handler — ca-central-1
// Serves both Ambitiously Institute (consultation/education AI) and
// By BoBo A List (skin intelligence: intake → mapping → ingredients → formulation).
//
// AI backbone: AWS Bedrock (cross-region inference) — Claude via IAM role, no external API keys.
// Photo analysis: AWS Rekognition pre-processes skin photos (face detection, quality, landmarks)
//   before Claude performs the full Conrad-method esthetic read.
// Storage: S3 for persistent photo storage; photos can arrive as S3 keys or inline base64.
// Env vars set by SAM: BEDROCK_MODEL_ID, BEDROCK_REGION, PHOTO_BUCKET, ALLOWED_ORIGIN

import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {
    RekognitionClient,
    DetectFacesCommand,
} from "@aws-sdk/client-rekognition";
import {
    S3Client,
    GetObjectCommand,
} from "@aws-sdk/client-s3";

const BEDROCK_REGION = process.env.BEDROCK_REGION || "us-east-1";
const MODEL_ID       = process.env.BEDROCK_MODEL_ID || "us.anthropic.claude-3-5-sonnet-20241022-v2:0";
const PHOTO_BUCKET   = process.env.PHOTO_BUCKET || "";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const bedrock     = new BedrockRuntimeClient({ region: BEDROCK_REGION });
const rekognition = new RekognitionClient({ region: "ca-central-1" });
const s3          = new S3Client({ region: "ca-central-1" });

async function callClaude({ max_tokens, system, messages, temperature = 0.7 }) {
    const cmd = new InvokeModelCommand({
        modelId: MODEL_ID,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens,
            system,
            messages,
            temperature,
        }),
    });
    const res = await bedrock.send(cmd);
    return JSON.parse(new TextDecoder().decode(res.body));
}`
);

// Update handler routing: remove client creation + update function calls
cai = cai.replace(
`    const path = event.path || event.rawPath || "/";
    const key = await getAnthropicKey();
    const client = new Anthropic({ apiKey: key });

    try {
        // Institute routes
        if (path.endsWith("/ask")) return await handleAsk(client, body);
        if (path.endsWith("/recommend")) return await handleRecommend(client, body);
        if (path.endsWith("/score-script")) return await handleScoreScript(client, body);

        // A List skin flow routes
        if (path.endsWith("/alist/skin-intake")) return await handleSkinIntake(client, body);
        if (path.endsWith("/alist/skin-intelligence")) return await handleSkinIntelligence(client, body);
        if (path.endsWith("/alist/ingredients")) return await handleIngredients(client, body);
        if (path.endsWith("/alist/formulate")) return await handleFormulate(client, body);`,

`    const path = event.path || event.rawPath || "/";

    try {
        // Institute routes
        if (path.endsWith("/ask")) return await handleAsk(body);
        if (path.endsWith("/recommend")) return await handleRecommend(body);
        if (path.endsWith("/score-script")) return await handleScoreScript(body);

        // A List skin flow routes
        if (path.endsWith("/alist/skin-intake")) return await handleSkinIntake(body);
        if (path.endsWith("/alist/skin-intelligence")) return await handleSkinIntelligence(body);
        if (path.endsWith("/alist/ingredients")) return await handleIngredients(body);
        if (path.endsWith("/alist/formulate")) return await handleFormulate(body);`
);

// handleAsk — signature + call
cai = cai.replace(
`async function handleAsk(client, { question, context = {} }) {
    if (!question?.trim()) return err(400, "question is required");
    const system = [...INSTITUTE_SYSTEM_BLOCKS];
    if (context.role) system.push({ type: "text", text: \`User context — role: \${context.role}, page: \${context.page || "unknown"}.\` });
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content: question }],
    });`,
`async function handleAsk({ question, context = {} }) {
    if (!question?.trim()) return err(400, "question is required");
    const system = [...INSTITUTE_SYSTEM_BLOCKS];
    if (context.role) system.push({ type: "text", text: \`User context — role: \${context.role}, page: \${context.page || "unknown"}.\` });
    const msg = await callClaude({
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content: question }],
    });`
);

// handleRecommend — signature + call
cai = cai.replace(
`async function handleRecommend(client, { profile = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,`,
`async function handleRecommend({ profile = {} }) {
    const msg = await callClaude({
        max_tokens: 1024,`
);

// handleScoreScript — signature + call
cai = cai.replace(
`async function handleScoreScript(client, { script }) {
    if (!script?.trim()) return err(400, "script is required");
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1500,`,
`async function handleScoreScript({ script }) {
    if (!script?.trim()) return err(400, "script is required");
    const msg = await callClaude({
        max_tokens: 1500,`
);

// handleSkinIntake — full replacement to add Rekognition + S3 + photoKeys support
const oldSkinIntake = `async function handleSkinIntake(client, { intake = {} }) {
    const { photos = {}, environment = {}, sensory = {}, history = {} } = intake;

    // Build vision content blocks from provided photos
    const photoBlocks = [];
    const angles = {
        front:       "PHOTO — FRONT VIEW (full face, front-facing):",
        left:        "PHOTO — LEFT PROFILE:",
        right:       "PHOTO — RIGHT PROFILE:",
        decolletage: "PHOTO — NECK + DÉCOLLETAGE:",
    };

    for (const [key, label] of Object.entries(angles)) {
        const photo = photos[key];
        if (!photo) continue;
        photoBlocks.push({ type: "text", text: label });
        if (typeof photo === "string" && photo.startsWith("data:")) {
            const [header, data] = photo.split(",");
            const mediaType = header.split(":")[1].split(";")[0];
            photoBlocks.push({ type: "image", source: { type: "base64", media_type: mediaType, data } });
        } else if (typeof photo === "string" && photo.startsWith("https://")) {
            photoBlocks.push({ type: "image", source: { type: "url", url: photo } });
        }
    }

    const hasPhotos = photoBlocks.length > 0;
    const noPhotoNote = hasPhotos ? "" :
        "\\nNO PHOTOS PROVIDED — analysis is based on sensory and history data only. Confidence score must reflect this limitation. Flag clearly in redFlags.";

    const prompt = \`Perform a complete Conrad-method clinical skin analysis using the photo analysis protocol.\${noPhotoNote}`;

const newSkinIntake = `async function handleSkinIntake({ intake = {} }) {
    const { photos = {}, photoKeys = {}, environment = {}, sensory = {}, history = {} } = intake;

    // Resolve photos: load from S3 when keys are provided (preferred path — photos persist in S3)
    const resolvedPhotos = { ...photos };
    for (const [angle, s3Key] of Object.entries(photoKeys)) {
        if (s3Key && !resolvedPhotos[angle]) {
            const loaded = await loadPhotoFromS3(s3Key);
            if (loaded) resolvedPhotos[angle] = loaded;
        }
    }

    // Rekognition pre-analysis on front photo — objective measurements before C-Ai's esthetic read
    let rekognitionContext = "";
    if (resolvedPhotos.front) {
        const rekData = await analyzeWithRekognition(resolvedPhotos.front, photoKeys.front);
        if (rekData) rekognitionContext = \`\\nREKOGNITION PRE-ANALYSIS (front view — objective measurements before clinical read):\\n\${rekData}\`;
    }

    // Build vision content blocks from resolved photos
    const photoBlocks = [];
    const angles = {
        front:       "PHOTO — FRONT VIEW (full face, front-facing):",
        left:        "PHOTO — LEFT PROFILE:",
        right:       "PHOTO — RIGHT PROFILE:",
        decolletage: "PHOTO — NECK + DÉCOLLETAGE:",
    };

    for (const [key, label] of Object.entries(angles)) {
        const photo = resolvedPhotos[key];
        if (!photo) continue;
        photoBlocks.push({ type: "text", text: label });
        if (typeof photo === "string" && photo.startsWith("data:")) {
            const [header, data] = photo.split(",");
            const mediaType = header.split(":")[1].split(";")[0];
            photoBlocks.push({ type: "image", source: { type: "base64", media_type: mediaType, data } });
        } else if (typeof photo === "string" && photo.startsWith("https://")) {
            photoBlocks.push({ type: "image", source: { type: "url", url: photo } });
        }
    }

    const hasPhotos = photoBlocks.length > 0;
    const noPhotoNote = hasPhotos ? "" :
        "\\nNO PHOTOS PROVIDED — analysis is based on sensory and history data only. Confidence score must reflect this limitation. Flag clearly in redFlags.";

    const prompt = \`Perform a complete Conrad-method clinical skin analysis using the photo analysis protocol.\${noPhotoNote}\${rekognitionContext}`;

cai = cai.replace(oldSkinIntake, newSkinIntake);

// handleSkinIntake — final client.messages.create → callClaude
cai = cai.replace(
`    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1800,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{ role: "user", content: userContent }],
    });
    return ok({ intakeSummary: msg.content[0].text, usage: msg.usage });
}

// Step 2: Skin Intelligence Mapping`,
`    const msg = await callClaude({
        max_tokens: 1800,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{ role: "user", content: userContent }],
    });
    return ok({ intakeSummary: msg.content[0].text, usage: msg.usage });
}

// Step 2: Skin Intelligence Mapping`
);

// handleSkinIntelligence — signature + call
cai = cai.replace(
`async function handleSkinIntelligence(client, { profile = {} }) {
    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1800,`,
`async function handleSkinIntelligence({ profile = {} }) {
    const msg = await callClaude({
        max_tokens: 1800,`
);

// handleIngredients — signature + call
cai = cai.replace(
`async function handleIngredients(client, { skinMap = {}, goals = [], sourcing = [], ingredientCatalog = [] }) {`,
`async function handleIngredients({ skinMap = {}, goals = [], sourcing = [], ingredientCatalog = [] }) {`
);
cai = cai.replace(
`    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 1800,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: \`Based on this skin map`,
`    const msg = await callClaude({
        max_tokens: 1800,
        system: SKIN_SYSTEM_BLOCKS,
        messages: [{
            role: "user",
            content: \`Based on this skin map`
);

// handleFormulate — signature + call
cai = cai.replace(
`async function handleFormulate(client, { skinMap = {}, selectedIngredients = [], productType, preferences = {}, ingredientDetails = [] }) {`,
`async function handleFormulate({ skinMap = {}, selectedIngredients = [], productType, preferences = {}, ingredientDetails = [] }) {`
);
cai = cai.replace(
`    const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 2048,`,
`    const msg = await callClaude({
        max_tokens: 2048,`
);

// Add S3 + Rekognition helpers before ok/err helpers
const helperFunctions = `
// ── AWS service helpers ───────────────────────────────────────────────────────

async function loadPhotoFromS3(s3Key) {
    if (!PHOTO_BUCKET || !s3Key) return null;
    try {
        const res = await s3.send(new GetObjectCommand({ Bucket: PHOTO_BUCKET, Key: s3Key }));
        const chunks = [];
        for await (const chunk of res.Body) chunks.push(chunk);
        const mediaType = res.ContentType || "image/jpeg";
        return \`data:\${mediaType};base64,\${Buffer.concat(chunks).toString("base64")}\`;
    } catch (e) {
        console.error(\`S3 load failed [\${s3Key}]:\`, e.message);
        return null;
    }
}

async function analyzeWithRekognition(photo, s3Key) {
    try {
        let imageParam;
        if (s3Key && PHOTO_BUCKET) {
            imageParam = { S3Object: { Bucket: PHOTO_BUCKET, Name: s3Key } };
        } else if (typeof photo === "string" && photo.startsWith("data:")) {
            imageParam = { Bytes: Buffer.from(photo.split(",")[1], "base64") };
        } else {
            return null;
        }

        const res = await rekognition.send(new DetectFacesCommand({ Image: imageParam, Attributes: ["ALL"] }));
        if (!res.FaceDetails?.length) return "No face detected by Rekognition — confirm photo angle and lighting.";

        const f = res.FaceDetails[0];
        const q = f.Quality || {};
        const p = f.Pose   || {};
        const a = f.AgeRange || {};

        return [
            \`• Image quality: Brightness \${(q.Brightness || 0).toFixed(1)}/100, Sharpness \${(q.Sharpness || 0).toFixed(1)}/100\`,
            \`• Face pose: Yaw \${(p.Yaw || 0).toFixed(1)}° (left/right), Pitch \${(p.Pitch || 0).toFixed(1)}° (up/down), Roll \${(p.Roll || 0).toFixed(1)}°\`,
            \`• Rekognition estimated age range: \${a.Low || "?"}–\${a.High || "?"} years (cross-reference with Glogau)\`,
            \`• Detection confidence: \${(f.Confidence || 0).toFixed(1)}%\`,
            f.Sunglasses?.Value ? \`• ⚠ Sunglasses detected — periorbital and lateral canthus zone analysis limited\` : null,
            f.EyesOpen?.Value === false ? \`• ⚠ Eyes closed — periorbital region analysis limited\` : null,
            f.MouthOpen?.Value ? \`• Mouth open — lower face measurements may be slightly affected\` : null,
        ].filter(Boolean).join("\\n");
    } catch (e) {
        console.error("Rekognition error:", e.message);
        return null;
    }
}

`;

cai = cai.replace(
`// ── Helpers ───────────────────────────────────────────────────────────────────`,
helperFunctions + `// ── Response helpers ─────────────────────────────────────────────────────────`
);

fs.writeFileSync(path.join(LAMBDA, 'cai-handler.js'), cai, 'utf8');
console.log('✅ cai-handler.js updated');

// ─────────────────────────────────────────────────────────────────────────────
// 2. package.json
// ─────────────────────────────────────────────────────────────────────────────

const pkg = {
    name: "ambitiously-lambda",
    version: "1.0.0",
    type: "module",
    description: "C-Ai and data Lambda handlers for Ambitiously Institute + By BoBo A List",
    scripts: { test: "vitest run", "test:watch": "vitest" },
    dependencies: {
        "@aws-sdk/client-bedrock-runtime": "^3.0.0",
        "@aws-sdk/client-dynamodb":        "^3.0.0",
        "@aws-sdk/client-rekognition":     "^3.0.0",
        "@aws-sdk/client-s3":              "^3.0.0",
        "@aws-sdk/s3-request-presigner":   "^3.0.0",
        "@aws-sdk/util-dynamodb":          "^3.0.0",
    },
    devDependencies: { vitest: "^2.0.0" },
};

fs.writeFileSync(path.join(LAMBDA, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('✅ package.json updated');

// ─────────────────────────────────────────────────────────────────────────────
// 3. template.yaml
// ─────────────────────────────────────────────────────────────────────────────

let tmpl = fs.readFileSync(path.join(ROOT, 'aws/template.yaml'), 'utf8');

// Replace Parameters section (add Bedrock params, remove ClaudeModel)
tmpl = tmpl.replace(
`Parameters:
  AllowedOrigin:
    Type: String
    Default: "https://www.ambitiouslybybobo.com"
  ClaudeModel:
    Type: String
    Default: "claude-sonnet-4-6"`,
`Parameters:
  AllowedOrigin:
    Type: String
    Default: "https://www.ambitiouslybybobo.com"
  BedrockRegion:
    Type: String
    Default: "us-east-1"
    Description: "AWS region for Bedrock cross-region inference (Claude runs here)"
  BedrockModelId:
    Type: String
    Default: "us.anthropic.claude-3-5-sonnet-20241022-v2:0"
    Description: "Bedrock model ID — use us. prefix for cross-region inference"`
);

// Update Globals — remove CLAUDE_MODEL and ANTHROPIC_SECRET_NAME
tmpl = tmpl.replace(
`Globals:
  Function:
    Runtime: nodejs20.x
    Architectures: [arm64]
    Timeout: 30
    MemorySize: 512
    Environment:
      Variables:
        ALLOWED_ORIGIN: !Ref AllowedOrigin
        CLAUDE_MODEL: !Ref ClaudeModel
        ANTHROPIC_SECRET_NAME: ambitiously/anthropic-api-key`,
`Globals:
  Function:
    Runtime: nodejs20.x
    Architectures: [arm64]
    Timeout: 60
    MemorySize: 512
    Environment:
      Variables:
        ALLOWED_ORIGIN: !Ref AllowedOrigin`
);

// Replace CAiFunction policies + add Bedrock/Rekognition/S3 env vars
tmpl = tmpl.replace(
`  CAiFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ambitiously-cai
      Handler: cai-handler.handler
      CodeUri: lambda/
      Description: C-Ai — skin intelligence + Institute assistant
      Policies:
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Sub "arn:aws:secretsmanager:ca-central-1:344626517888:secret:ambitiously/anthropic-api-key*"
      Events:`,
`  CAiFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ambitiously-cai
      Handler: cai-handler.handler
      CodeUri: lambda/
      Description: C-Ai — skin intelligence + Institute assistant (Bedrock + Rekognition)
      Environment:
        Variables:
          BEDROCK_MODEL_ID: !Ref BedrockModelId
          BEDROCK_REGION: !Ref BedrockRegion
          PHOTO_BUCKET: !Ref SkinPhotosBucket
      Policies:
        - Statement:
          - Effect: Allow
            Action:
              - bedrock:InvokeModel
            Resource:
              - !Sub "arn:aws:bedrock:\${BedrockRegion}::foundation-model/*"
        - Statement:
          - Effect: Allow
            Action:
              - rekognition:DetectFaces
            Resource: "*"
        - S3ReadPolicy:
            BucketName: !Ref SkinPhotosBucket
      Events:`
);

// Add S3 policy + PHOTO_BUCKET env to DbFunction
tmpl = tmpl.replace(
`        - DynamoDBCrudPolicy:
            TableName: !Ref EncyclopediaTable
      Environment:
        Variables:
          CONTACTS_TABLE:`,
`        - DynamoDBCrudPolicy:
            TableName: !Ref EncyclopediaTable
        - S3CrudPolicy:
            BucketName: !Ref SkinPhotosBucket
      Environment:
        Variables:
          PHOTO_BUCKET: !Ref SkinPhotosBucket
          CONTACTS_TABLE:`
);

// Add photo-upload route to DbFunction events (before the closing of DbFunction)
tmpl = tmpl.replace(
`        EncyclopediaGet:
          Type: Api
          Properties:
            RestApiId: !Ref AmbitiouslyApi
            Path: /bybobo/encyclopedia/{slug}
            Method: GET

# ── DynamoDB Tables`,
`        EncyclopediaGet:
          Type: Api
          Properties:
            RestApiId: !Ref AmbitiouslyApi
            Path: /bybobo/encyclopedia/{slug}
            Method: GET
        PhotoUpload:
          Type: Api
          Properties:
            RestApiId: !Ref AmbitiouslyApi
            Path: /alist/photo-upload
            Method: POST

# ── S3 Buckets ────────────────────────────────────────────────────────────────

  SkinPhotosBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "ambitiously-skin-photos-\${AWS::AccountId}"
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      LifecycleConfiguration:
        Rules:
          - Id: DeleteOldPhotos
            Status: Enabled
            ExpirationInDays: 730
      CorsConfiguration:
        CorsRules:
          - AllowedHeaders:
              - "Content-Type"
            AllowedMethods:
              - PUT
            AllowedOrigins:
              - !Ref AllowedOrigin
            ExposedHeaders:
              - ETag
            MaxAge: 3000

# ── DynamoDB Tables`
);

// Update Outputs to include photo bucket and Bedrock info
tmpl = tmpl.replace(
`Outputs:
  ApiUrl:
    Description: API Gateway base URL — paste into Wix Secrets as CAI_API_URL and DB_API_URL
    Value: !Sub "https://\${AmbitiouslyApi}.execute-api.ca-central-1.amazonaws.com/prod"`,
`Outputs:
  ApiUrl:
    Description: API Gateway base URL — paste into Wix Secrets as CAI_API_URL and DB_API_URL
    Value: !Sub "https://\${AmbitiouslyApi}.execute-api.ca-central-1.amazonaws.com/prod"
  SkinPhotosBucket:
    Description: S3 bucket for skin analysis photos — private, SSE-AES256, 730-day lifecycle
    Value: !Ref SkinPhotosBucket
  BedrockModelId:
    Description: Bedrock model in use for C-Ai
    Value: !Ref BedrockModelId`
);

fs.writeFileSync(path.join(ROOT, 'aws/template.yaml'), tmpl, 'utf8');
console.log('✅ template.yaml updated');

// ─────────────────────────────────────────────────────────────────────────────
// 4. db-handler.js — add /alist/photo-upload endpoint
// ─────────────────────────────────────────────────────────────────────────────

let db = fs.readFileSync(path.join(LAMBDA, 'db-handler.js'), 'utf8');

// Add S3 + presigner imports at the top
db = db.replace(
`import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({ region: "ca-central-1" });`,
`import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const db  = new DynamoDBClient({ region: "ca-central-1" });
const s3  = new S3Client({ region: "ca-central-1" });
const PHOTO_BUCKET = process.env.PHOTO_BUCKET || "";`
);

// Add photo-upload route to dispatcher (before "return err(404...")
db = db.replace(
`        return err(404, "Not found");`,
`        // ── Photo upload presigned URL ─────────────────────────────────────
        if (path.includes("/alist/photo-upload") && method === "POST")
            return ok(await getPhotoUploadUrl(body));

        return err(404, "Not found");`
);

// Add getPhotoUploadUrl function before the closing of the file (before the last comment block or at end)
const photoUploadFn = `
// ── Photo upload ──────────────────────────────────────────────────────────────
// Returns a presigned S3 PUT URL valid for 15 minutes.
// Client uploads photo directly to S3 using this URL; Lambda never touches binary data.
async function getPhotoUploadUrl({ email, angle, contentType = "image/jpeg" }) {
    if (!email || !angle) throw new Error("email and angle required");
    if (!PHOTO_BUCKET) throw new Error("PHOTO_BUCKET not configured");
    const validAngles = ["front", "left", "right", "decolletage"];
    if (!validAngles.includes(angle)) throw new Error(\`angle must be one of: \${validAngles.join(", ")}\`);
    const s3Key = \`\${email.replace(/[^a-zA-Z0-9@._-]/g, "_")}/\${Date.now()}/\${angle}.jpg\`;
    const cmd = new PutObjectCommand({
        Bucket: PHOTO_BUCKET,
        Key: s3Key,
        ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 900 });
    return { uploadUrl, s3Key, expiresIn: 900 };
}

`;

// Insert before the now/ok/err helpers
db = db.replace(
/^(function now\(\))/m,
photoUploadFn + '$1'
);

fs.writeFileSync(path.join(LAMBDA, 'db-handler.js'), db, 'utf8');
console.log('✅ db-handler.js updated');

// ─────────────────────────────────────────────────────────────────────────────
// 5. alist.web.js — add uploadSkinPhoto web method
// ─────────────────────────────────────────────────────────────────────────────

let alist = fs.readFileSync(path.join(ROOT, 'src/backend/alist.web.js'), 'utf8');

// Update comment header
alist = alist.replace(
`// A List Membership — Wix backend module for Ambitiously By BoBo.
// Covers the full skin flow: intake → intelligence → ingredients → formulation.
// Also manages membership status, ongoing skin tracking, and birthday discounts.
//
// Secrets required in Wix Secrets Manager:
//   CAI_API_URL — API Gateway base URL (same as Institute)
//   CAI_API_KEY — API Gateway key (same as Institute)
//   DB_API_URL  — same endpoint
//   DB_API_KEY  — same key`,
`// A List Membership — Wix backend module for Ambitiously By BoBo.
// Covers the full skin flow: intake → intelligence → ingredients → formulation.
// Also manages membership status, ongoing skin tracking, and birthday discounts.
//
// Photo upload flow:
//   1. uploadSkinPhoto({ email, angle }) → returns { uploadUrl, s3Key }
//   2. Wix page does PUT to uploadUrl with photo file (direct S3, no Lambda proxy)
//   3. runSkinIntake({ photoKeys: { front, left, right, decolletage }, ... }) uses s3Keys
//
// Secrets required in Wix Secrets Manager:
//   CAI_API_URL — API Gateway base URL (same as Institute)
//   CAI_API_KEY — API Gateway key (same as Institute)
//   DB_API_URL  — same endpoint
//   DB_API_KEY  — same key`
);

// Add uploadSkinPhoto before Step 1
alist = alist.replace(
`// ── Step 1: AI Skin Intake ────────────────────────────────────────────────────
// intake: { environment: {climate, humidity, uvIndex},
//           sensory: {tightness, sensitivity, oiliness, texture},
//           history: {treatments, allergies, medications, pregnancyNursing} }
export const runSkinIntake = webMethod(
    Permissions.Anyone,
    async (intake) => caiPost("/alist/skin-intake", { intake })
);`,
`// ── Photo upload ──────────────────────────────────────────────────────────────
// Returns a presigned S3 PUT URL. The Wix page then uploads the photo directly
// to S3 using a browser fetch PUT — no binary data through Lambda or Wix backend.
// angle: "front" | "left" | "right" | "decolletage"
export const uploadSkinPhoto = webMethod(
    Permissions.SiteMember,
    async ({ email, angle, contentType = "image/jpeg" }) =>
        dbRequest("POST", "/alist/photo-upload", { email, angle, contentType })
);

// ── Step 1: AI Skin Intake ────────────────────────────────────────────────────
// Accepts EITHER:
//   photoKeys: { front, left, right, decolletage } — S3 keys from uploadSkinPhoto
//   photos:    { front, left, right, decolletage } — inline base64 data URIs (fallback)
// Plus: environment: {climate, humidity, uvIndex},
//       sensory: {tightness, sensitivity, oiliness, texture},
//       history: {treatments, allergies, medications, pregnancyNursing}
export const runSkinIntake = webMethod(
    Permissions.Anyone,
    async (intake) => caiPost("/alist/skin-intake", { intake })
);`
);

fs.writeFileSync(path.join(ROOT, 'src/backend/alist.web.js'), alist, 'utf8');
console.log('✅ alist.web.js updated');

console.log('\n✅ All 5 files updated. Run: node -c aws/lambda/cai-handler.js to verify syntax.');
