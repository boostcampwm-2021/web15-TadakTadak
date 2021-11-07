import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_MYSQL_HOST,
  port: 3306,
  username: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
