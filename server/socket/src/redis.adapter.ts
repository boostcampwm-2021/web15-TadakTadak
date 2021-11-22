import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';

export const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
export const subClient = pubClient.duplicate();

const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server: any = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
