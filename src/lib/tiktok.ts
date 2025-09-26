export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to refresh token");
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || "TikTok refresh error");
  return json.data; // { access_token, refresh_token, expires_in, ... }
}
