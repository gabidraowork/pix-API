import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const transactionQueue = new Queue("transactions",{
    connection: redis
});