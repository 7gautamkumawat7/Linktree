// lib/mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      // ✅ no need for useNewUrlParser or useUnifiedTopology
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    })
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  })
  clientPromise = client.connect()
}

export default clientPromise
