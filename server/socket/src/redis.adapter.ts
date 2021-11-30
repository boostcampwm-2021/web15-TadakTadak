import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClient } from 'redis';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

const HOST: string = process.env.DB_REDIS_HOST ?? 'localhost';
const PORT: number = process.env.DB_REDIS_PORT ? parseInt(process.env.DB_REDIS_PORT) : 6379;
export const pubClient = new RedisClient({
  host: HOST,
  port: PORT,
});
export const subClient = pubClient.duplicate();

const redisAdapter = createAdapter(pubClient, subClient);

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server: any = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    Logger.log(`Redis Adapted ${process.env.DB_REDIS_HOST}:${PORT}`);
    return server;
  }
}
