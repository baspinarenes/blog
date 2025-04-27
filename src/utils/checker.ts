export const checkDraft = (entry: any) => {
  return (process.env.NODE_ENV === "development" || !entry.data.draft);
}