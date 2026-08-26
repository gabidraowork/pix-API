import { Redis } from "ioredis";
import "dotenv/config";

export const redis = new Redis( {
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});


