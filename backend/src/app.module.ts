import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // to get the config variable similar to .env file
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      // Use async factory to configure TypeORM with environment variables
      // This allows you to use the ConfigService to access environment variables
      // and configure the database connection dynamically.
      // This is useful for different environments (development, production, etc.)
      // and allows you to change the database connection settings without hardcoding them.
      // The useFactory function is called with an instance of ConfigService,
      // which provides access to the environment variables defined in .env file.
      // The return value is an object that contains the TypeORM connection options.
      // The connection options include the database type, host, port, username, password,
      // database name, entities, and synchronization settings.
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        synchronize: true, // Set to false in production
        autoLoadEntities: true, // Automatically load entities from modules
      }),
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
