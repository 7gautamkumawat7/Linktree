// app/api/generate/route.js
import { saveProfile } from "@/app/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { handle, displayName, bio, pic, theme, socials, links } = body;

    // Handle Validation
    if (!handle || typeof handle !== "string") {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Please provide a valid handle.",
        },
        { status: 400 }
      );
    }

    const cleanHandle = handle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");

    if (cleanHandle.length < 2) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "Handle must be at least 2 characters long and contain only letters, numbers, hyphens, or underscores.",
        },
        { status: 400 }
      );
    }

    // Clean and validate links
    const validLinks = Array.isArray(links)
      ? links
          .filter((l) => l && (l.linktext?.trim() || l.link?.trim()))
          .map((l) => ({
            link: l.link?.trim() || "#",
            linktext: l.linktext?.trim() || "Link",
            platform: l.platform || "globe",
          }))
      : [];

    const profilePayload = {
      handle: cleanHandle,
      displayName: displayName?.trim() || cleanHandle,
      bio: bio?.trim() || "",
      pic: pic?.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      theme: theme || "cyber-dark",
      socials: socials || {},
      links: validLinks,
      createdAt: new Date(),
    };

    const result = await saveProfile(profilePayload);

    return Response.json({
      success: true,
      error: false,
      message: "BitTree created successfully! 🎉",
      handle: result.handle,
      data: profilePayload,
    });
  } catch (error) {
    console.error("Error generating BitTree profile:", error);
    return Response.json(
      {
        success: false,
        error: true,
        message: "Failed to generate BitTree: " + (error.message || "Unknown error"),
      },
      { status: 500 }
    );
  }
}
