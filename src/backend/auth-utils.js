import { currentMember } from "wix-members-backend";

// Throws unless the currently authenticated member's login email matches the
// requested email — call this before forwarding any email-scoped lookup to
// the AWS API, since the API Gateway key has no concept of Wix member identity
// and will return whatever record is asked for.
export async function assertOwnEmail(email) {
    const member = await currentMember.getMember();
    if (member.loginEmail?.toLowerCase() !== String(email).toLowerCase()) {
        throw new Error("Forbidden: email does not match the authenticated member");
    }
}
