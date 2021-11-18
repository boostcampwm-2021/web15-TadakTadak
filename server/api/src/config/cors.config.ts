import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsConfig: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['access-control-allow-origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true,
  maxAge: 3600,
  optionsSuccessStatus: 204,
};
