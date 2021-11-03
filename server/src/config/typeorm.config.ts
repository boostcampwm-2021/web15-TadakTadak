import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'tadaktadak',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
