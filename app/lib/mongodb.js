// app/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';
const dbName = process.env.MONGODB_DB || 'bittree';

// MongoDB Client Options optimized for reliability & performance
const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 3000,
  connectTimeoutMS: 3000,
  retryReads: true,
  retryWrites: true,
};

// Helper to serialize MongoDB doc to a plain JS object for Client Components
function serializeDoc(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id ? doc._id.toString() : undefined,
    createdAt: doc.createdAt ? (doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt) : undefined,
    updatedAt: doc.updatedAt ? (doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : doc.updatedAt) : undefined,
  };
}

// In-memory fallback store with preloaded sample profiles
const mockStore = new Map([
  [
    'harry',
    {
      handle: 'harry',
      displayName: 'Code With Harry',
      bio: 'Programming tutorials, web development tips & developer tools 💻✨',
      pic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      theme: 'cyber-dark',
      socials: {
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        github: 'https://github.com',
        twitter: 'https://x.com',
        linkedin: 'https://linkedin.com',
      },
      links: [
        { link: 'https://codewithharry.com', linktext: 'Official Website & Courses', platform: 'globe' },
        { link: 'https://youtube.com', linktext: 'Full Stack Web Dev Playlist', platform: 'youtube' },
        { link: 'https://github.com', linktext: 'Open Source Repositories', platform: 'github' },
        { link: 'https://discord.com', linktext: 'Join Developer Discord', platform: 'discord' },
      ],
      createdAt: new Date().toISOString(),
    },
  ],
  [
    'sarah',
    {
      handle: 'sarah',
      displayName: 'Sarah Chen',
      bio: 'UI/UX Designer & Digital Artist. Crafting futuristic interfaces & 3D art 🎨✨',
      pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      theme: 'sunset-luxe',
      socials: {
        instagram: 'https://instagram.com',
        twitter: 'https://x.com',
        spotify: 'https://spotify.com',
      },
      links: [
        { link: 'https://dribbble.com', linktext: 'Dribbble Portfolio (2026)', platform: 'globe' },
        { link: 'https://figma.com', linktext: 'Free Figma UI Kit', platform: 'globe' },
        { link: 'https://youtube.com', linktext: 'Design System Masterclass', platform: 'youtube' },
      ],
      createdAt: new Date().toISOString(),
    },
  ],
  [
    'alex',
    {
      handle: 'alex',
      displayName: 'Alex Rivers',
      bio: 'Music Producer & Sound Designer. New EP "Midnight Neon" out now! 🎧⚡',
      pic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      theme: 'neon-glow',
      socials: {
        spotify: 'https://spotify.com',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        twitch: 'https://twitch.tv',
      },
      links: [
        { link: 'https://spotify.com', linktext: 'Stream "Midnight Neon" on Spotify', platform: 'spotify' },
        { link: 'https://music.apple.com', linktext: 'Apple Music Exclusive', platform: 'spotify' },
        { link: 'https://twitch.tv', linktext: 'Live Beatmaking Sessions', platform: 'twitch' },
      ],
      createdAt: new Date().toISOString(),
    },
  ],
]);

let cachedClient = null;

/**
 * Ensures index exists on handle for lightning-fast lookups
 */
async function ensureIndexes(connectedClient) {
  try {
    const db = connectedClient.db(dbName);
    await db.collection('links').createIndex({ handle: 1 }, { unique: true });
  } catch (err) {
    // Index already exists or non-critical
  }
}

/**
 * Connects or returns existing MongoDB client connection
 */
export async function getMongoClient() {
  if (cachedClient) {
    return cachedClient;
  }
  if (global._mongoClient) {
    cachedClient = global._mongoClient;
    return cachedClient;
  }

  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log(`✅ Connected to MongoDB successfully at ${uri} [Database: ${dbName}]`);
    await ensureIndexes(client);

    if (process.env.NODE_ENV === 'development') {
      global._mongoClient = client;
    }
    cachedClient = client;
    return cachedClient;
  } catch (err) {
    console.warn(`⚠️ MongoDB connection warning: ${err.message} (Using in-memory fallback)`);
    return null;
  }
}

/**
 * Returns connected Database instance or null if offline
 */
export async function getDatabase() {
  const client = await getMongoClient();
  if (client) {
    return client.db(dbName);
  }
  return null;
}

/**
 * Fetch a profile by handle (Checks MongoDB first, then mockStore fallback)
 */
export async function getProfileByHandle(handle) {
  if (!handle) return null;
  const cleanHandle = handle.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');

  // 1. Try MongoDB first
  try {
    const db = await getDatabase();
    if (db) {
      const doc = await db.collection('links').findOne({ handle: cleanHandle });
      if (doc) {
        return serializeDoc(doc);
      }
    }
  } catch (err) {
    console.error(`❌ MongoDB read error for @${cleanHandle}:`, err.message);
  }

  // 2. Fallback to in-memory store
  const mockDoc = mockStore.get(cleanHandle);
  return mockDoc ? serializeDoc(mockDoc) : null;
}

/**
 * Check if a handle is available
 */
export async function isHandleAvailable(handle) {
  if (!handle) return false;
  const cleanHandle = handle.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');

  try {
    const db = await getDatabase();
    if (db) {
      const doc = await db.collection('links').findOne({ handle: cleanHandle });
      if (doc) return false;
    }
  } catch (err) {
    console.warn(`⚠️ MongoDB check warning:`, err.message);
  }

  return !mockStore.has(cleanHandle);
}

/**
 * Save or update a profile directly in MongoDB
 */
export async function saveProfile(profileData) {
  if (!profileData || !profileData.handle) {
    throw new Error('Profile handle is required');
  }

  const cleanHandle = profileData.handle.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');
  
  // Strip any existing _id to avoid MongoDB immutable _id update error
  const { _id, ...cleanProfile } = profileData;

  const dataToSave = {
    ...cleanProfile,
    handle: cleanHandle,
    updatedAt: new Date(),
  };

  let savedToMongo = false;
  let mongoResult = null;

  try {
    const db = await getDatabase();
    if (db) {
      mongoResult = await db.collection('links').updateOne(
        { handle: cleanHandle },
        { 
          $set: dataToSave,
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
      savedToMongo = true;
      console.log(`✅ MongoDB: Successfully stored profile @${cleanHandle} in database '${dbName}' (Collection: 'links')`);
    } else {
      console.warn(`⚠️ MongoDB database handle unavailable, stored in memory cache only for @${cleanHandle}`);
    }
  } catch (err) {
    console.error(`❌ MongoDB write error for @${cleanHandle}:`, err.message);
  }

  // Mirror in mock store for instant synchronous session caching
  mockStore.set(cleanHandle, { ...dataToSave, createdAt: new Date().toISOString() });

  return {
    success: true,
    handle: cleanHandle,
    savedToMongo,
    mongoResult,
  };
}

/**
 * Check MongoDB connection status
 */
export async function getDatabaseStatus() {
  try {
    const client = await getMongoClient();
    if (client) {
      const db = client.db(dbName);
      const count = await db.collection('links').countDocuments();
      return { 
        status: 'connected', 
        driver: 'mongodb', 
        db: dbName,
        totalDocsInMongo: count 
      };
    }
  } catch (err) {
    return { status: 'error', message: err.message };
  }
  return { status: 'mock_fallback', driver: 'in-memory', totalProfiles: mockStore.size };
}

// For compatibility with scripts importing default clientPromise
export default getMongoClient();
