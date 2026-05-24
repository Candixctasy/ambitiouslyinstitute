export function normalizePageSummary(page) {
    const props = page.properties || {};
    const titleProp = props.Title || props.Name || {};
    const titleParts = titleProp.title || [];
    const title = titleParts.map((t) => t.plain_text).join("") || "Untitled";

    return {
        id: page.id,
        title,
        category: props.Category?.select?.name || null,
        status: props.Status?.status?.name || null,
        owner: props.Owner?.people?.[0]?.name || null,
        lastEdited: page.last_edited_time,
        url: page.url,
    };
}

export function normalizeBlock(block) {
    const type = block.type;
    const content = block[type];
    const text = content?.rich_text?.map((t) => t.plain_text).join("") || "";

    return { id: block.id, type, text };
}
