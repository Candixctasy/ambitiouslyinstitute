#!/usr/bin/env node
// Seed the ambitiously-ingredient-encyclopedia DynamoDB table from the JSON file.
//
// Usage:
//   node seed-encyclopedia.js --file /path/to/ambitiously-ingredients-encyclopedia.json
//   node seed-encyclopedia.js --file ./encyclopedia.json --region ca-central-1 --table ambitiously-ingredient-encyclopedia

import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { readFileSync } from "fs";
import { parseArgs } from "util";

const { values } = parseArgs({
    options: {
        file:   { type: "string", short: "f" },
        region: { type: "string", default: "ca-central-1" },
        table:  { type: "string", default: "ambitiously-ingredient-encyclopedia" },
    },
});

if (!values.file) {
    console.error("Usage: node seed-encyclopedia.js --file <path-to-json>");
    process.exit(1);
}

const db = new DynamoDBClient({ region: values.region });
const TABLE = values.table;

function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function batchWrite(items) {
    // DynamoDB BatchWriteItem supports max 25 items per call
    const chunks = [];
    for (let i = 0; i < items.length; i += 25) chunks.push(items.slice(i, i + 25));

    for (const chunk of chunks) {
        const requests = chunk.map(item => ({
            PutRequest: { Item: marshall(item, { removeUndefinedValues: true }) },
        }));
        const res = await db.send(new BatchWriteItemCommand({
            RequestItems: { [TABLE]: requests },
        }));
        const unprocessed = res.UnprocessedItems?.[TABLE]?.length || 0;
        if (unprocessed > 0) {
            console.warn(`  ⚠ ${unprocessed} items unprocessed — retry logic needed for large batches`);
        }
        process.stdout.write(".");
    }
}

async function main() {
    const raw = JSON.parse(readFileSync(values.file, "utf8"));
    // Support both { ingredients: [...] } and plain array
    const ingredients = Array.isArray(raw) ? raw : raw.ingredients;

    if (!ingredients?.length) {
        console.error("No ingredients found in JSON. Expected { ingredients: [...] } or a plain array.");
        process.exit(1);
    }

    console.log(`Seeding ${ingredients.length} ingredients into ${TABLE} (${values.region})...`);

    // Add slug if not present, normalize isPublished to string "true"/"false" for GSI
    const items = ingredients.map(ing => ({
        ...ing,
        slug: ing.slug || slugify(ing.name),
        isPublished: ing.isPublished === true || ing.isPublished === "true" ? "true" : "false",
        seededAt: new Date().toISOString(),
    }));

    await batchWrite(items);
    console.log(`\nDone — ${items.length} ingredients seeded.`);
}

main().catch(e => { console.error(e); process.exit(1); });
