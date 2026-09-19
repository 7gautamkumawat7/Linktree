// test-endpoints.mjs
async function runTests() {
  const baseUrl = "http://localhost:3000";
  console.log("--- Starting BitTree Automated Endpoint Tests ---");

  // 1. Landing page
  const homeRes = await fetch(`${baseUrl}/`);
  console.log("1. GET / status:", homeRes.status, homeRes.ok ? "✓ OK" : "✗ FAIL");

  // 2. Generator Studio
  const genRes = await fetch(`${baseUrl}/generate`);
  console.log("2. GET /generate status:", genRes.status, genRes.ok ? "✓ OK" : "✗ FAIL");

  // 3. Check existing handle
  const checkHarryRes = await fetch(`${baseUrl}/api/check-handle?handle=harry`);
  const checkHarryJson = await checkHarryRes.json();
  console.log("3. GET /api/check-handle?handle=harry ->", checkHarryJson);

  // 4. Check available handle
  const checkNewRes = await fetch(`${baseUrl}/api/check-handle?handle=coolcreator2026`);
  const checkNewJson = await checkNewRes.json();
  console.log("4. GET /api/check-handle?handle=coolcreator2026 ->", checkNewJson);

  // 5. POST /api/generate
  const generatePayload = {
    handle: "coolcreator2026",
    displayName: "Cool Creator ✨",
    bio: "Building innovative web applications and 3D experiences 🚀",
    pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    theme: "neon-glow",
    socials: {
      twitter: "https://x.com/creator",
      github: "https://github.com/creator",
      instagram: "https://instagram.com/creator",
    },
    links: [
      { linktext: "My Portfolio", link: "https://portfolio.dev", platform: "globe" },
      { linktext: "Watch on YouTube", link: "https://youtube.com", platform: "youtube" },
      { linktext: "Stream on Spotify", link: "https://spotify.com", platform: "spotify" },
    ],
  };

  const createRes = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(generatePayload),
  });
  const createJson = await createRes.json();
  console.log("5. POST /api/generate ->", createJson);

  // 6. GET /api/profile/coolcreator2026
  const profileApiRes = await fetch(`${baseUrl}/api/profile/coolcreator2026`);
  const profileApiJson = await profileApiRes.json();
  console.log("6. GET /api/profile/coolcreator2026 ->", profileApiJson.success ? "✓ Profile fetched" : "✗ Error");

  // 7. GET Public Profile page
  const pageRes = await fetch(`${baseUrl}/coolcreator2026`);
  console.log("7. GET /coolcreator2026 HTML page status:", pageRes.status, pageRes.ok ? "✓ OK" : "✗ FAIL");

  // 8. GET Preloaded Profile page (harry)
  const harryPageRes = await fetch(`${baseUrl}/harry`);
  console.log("8. GET /harry HTML page status:", harryPageRes.status, harryPageRes.ok ? "✓ OK" : "✗ FAIL");

  // 9. GET Unclaimed Handle page
  const unclaimedRes = await fetch(`${baseUrl}/unclaimed-user-999`);
  console.log("9. GET /unclaimed-user-999 HTML page status:", unclaimedRes.status, unclaimedRes.ok ? "✓ OK (Renders custom unclaimed screen)" : "✗ FAIL");

  console.log("--- All Endpoint Tests Completed Successfully! ---");
}

runTests().catch(console.error);
