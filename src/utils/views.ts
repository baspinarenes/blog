import type { Lang } from "@models/type";

export const incrementViewCount = async (
  entryId: string,
  locale: Lang
): Promise<void> => {
  try {
    const response = await fetch("/api/increment-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entryId,
        locale,
      }),
    });

    if (!response.ok) {
      console.error(
        "[ERROR] Failed to increment view count:",
        await response.json()
      );
    }
  } catch (error) {
    console.error("[ERROR] Error incrementing view count:", error);
  }
};

export const getEntryViews = async (
  entryIds: string[],
  locale: Lang
): Promise<Record<string, number>> => {
  if (!entryIds || entryIds.length === 0) return {};

  try {
    // Batch fetch view counts for all entries
    const response = await fetch(`/api/get-view-counts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entryIds,
        locale,
      }),
    });

    if (!response.ok) {
      console.error(
        "[ERROR] Failed to fetch view counts:",
        await response.text()
      );
      return {};
    }

    const data = await response.json();
    return data.success ? data.viewCounts : {};
  } catch (error) {
    console.error("[DEBUG] Error getting view counts", error);
    return {};
  }
};
