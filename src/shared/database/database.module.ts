import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        migrations: ['dist/migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
        factories: __dirname + 'dist/**/database/factories/**/*.js',
        seeds: __dirname + 'dist/**/database/seeds/**/*.js',
      }),
    }),
  ],
})
export class DatabaseModule {
  constructor() {
    const host = new ConfigService().get('DB_HOST');
    console.log(
      '🚀 ~ file: database.module.ts ~ line 32 ~ DatabaseModule ~ constructor ~ host',
      host,
    );
    const port = new ConfigService().get('DB_PORT');
    console.log(
      '🚀 ~ file: database.module.ts ~ line 34 ~ DatabaseModule ~ constructor ~ port',
      port,
    );
    const username = new ConfigService().get('DB_USERNAME');
    console.log(
      '🚀 ~ file: database.module.ts ~ line 36 ~ DatabaseModule ~ constructor ~ username',
      username,
    );
    const password = new ConfigService().get('DB_PASSWORD');
    console.log(
      '🚀 ~ file: database.module.ts ~ line 38 ~ DatabaseModule ~ constructor ~ password',
      password,
    );
    const database = new ConfigService().get('DB_NAME');
    console.log(
      '🚀 ~ file: database.module.ts ~ line 40 ~ DatabaseModule ~ constructor ~ database',
      database,
    );
  }
}
