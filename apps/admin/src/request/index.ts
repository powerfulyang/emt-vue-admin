export const aiToolsProxy = async <T = any>(url: string, opts: RequestInit) => {
  const res = await fetch(`/ai-tools${url}`, opts);
  return (await res.json()) as T;
};
