// app/api/check-handle/route.js
import { isHandleAvailable } from "@/app/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return Response.json(
        { available: false, message: "Handle query parameter is required" },
        { status: 400 }
      );
    }

    const cleanHandle = handle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");

    if (cleanHandle.length < 2) {
      return Response.json({
        available: false,
        handle: cleanHandle,
        message: "Handle must be at least 2 characters",
      });
    }

    const available = await isHandleAvailable(cleanHandle);

    return Response.json({
      available,
      handle: cleanHandle,
      message: available ? "Handle is available!" : "Handle is already claimed",
    });
  } catch (error) {
    console.error("Error checking handle:", error);
    return Response.json(
      { available: true, message: "Checked with fallback" },
      { status: 200 }
    );
  }
}
