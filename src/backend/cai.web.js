// C-Ai integration — routes AI requests to the AWS Lambda endpoint.
// Secrets required in Wix Secrets Manager:
//   CAI_API_URL — full HTTPS URL of the AWS API Gateway endpoint
//   CAI_API_KEY — API key set on the AWS API Gateway stage

import { Permissions, webMethod } from "wix-web-module";
import { caiPost } from "backend/api-client";

// Sends a free-form question to C-Ai and returns the answer.
// context: optional object with { page, role, sessionId }
export const askCAI = webMethod(
    Permissions.SiteMember,
    async (question, context = {}) => {
        return caiPost("/ask", { question, context });
    }
);

// Returns personalised program/product recommendations for a client profile.
// profile: { skinType, concerns, goals, budget, role }
export const getCAIRecommendations = webMethod(
    Permissions.SiteMember,
    async (profile) => {
        return caiPost("/recommend", { profile });
    }
);

// Scores a consultation script and returns improvement suggestions.
// script: string of the full consultation dialogue
export const scoreConsultationScript = webMethod(
    Permissions.SiteMember,
    async (script) => {
        return caiPost("/score-script", { script });
    }
);
