import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthenticationsModule} from './authentications/authentications.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mssql",
          host: configService.get('DATABASE_HOST', '13.229.251.138'),
          port: Number(configService.get<number>('DATABASE_PORT', 1433)),
          username: configService.get('DATABASE_USERNAME', 'brt'),
          password: configService.get('DATABASE_PASSWORD', 'Initial123!'),
          database: configService.get<string>('DATABASE_SCHEMA', 'BRTCONTRACT'),
          useUTC:true,
          synchronize: configService.get<boolean>(
            'DATABASE_SYNCHRONIZE',
            true,
          ),
          entities: ["dist/**/*.entity{.ts,.js}"],
        };
      },
    }),
    AuthenticationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
