// app/api/profile/[handle]/route.js
import { getProfileByHandle } from "@/app/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { handle } = await params;
    if (!handle) {
      return Response.json(
        { success: false, message: "Handle is required" },
        { status: 400 }
      );
    }

    const profile = await getProfileByHandle(handle);

    if (!profile) {
      return Response.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile API:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
