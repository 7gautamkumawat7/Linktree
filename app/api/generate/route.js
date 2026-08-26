// app/api/generate/route.js
import clientPromise from '@/app/lib/mongodb'

export async function POST(request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bittree")              // ✅ use client.db, not clientPromise.db
    const collection = db.collection("links")

    const result = await collection.insertOne(body)

    return Response.json({
      success: true,
      message: "Bitree created successfully",
      error: false,
      insertedId: result.insertedId
    })
  } catch (error) {
    console.error("Error inserting document:", error)
    return Response.json({
      success: false,
      message: "Internal Server Error",
      error: true
    }, { status: 500 })
  }
}
