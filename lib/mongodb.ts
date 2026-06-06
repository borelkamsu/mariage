import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cache;

export async function connectMongo() {
  if (cache.conn) return cache.conn;

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("La variable MONGODB_URI n'est pas configuree.");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      family: 4,
      tlsAllowInvalidCertificates:
        process.env.MONGODB_TLS_ALLOW_INVALID_CERTIFICATES === "true",
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
