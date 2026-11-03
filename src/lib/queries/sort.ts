/**
 * Default sort for admin-managed content: newest first. `_id` breaks ties between
 * records created in the same millisecond (ObjectIds increase over time).
 */
export const NEWEST_FIRST = { createdAt: -1, _id: -1 } as const;
