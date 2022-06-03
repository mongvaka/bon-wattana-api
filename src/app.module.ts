import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import { DemoModule } from './demo/demo.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal:true}
    ),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      entities: ["dist/**/*.entity{.ts,.js}"]
    }),
//ConfigModule.forRoot({
  //   isGlobal: true,
  // }),
  
  //   TypeOrmModule.forRootAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: async (configService: ConfigService) => {
  //       return {
  //         type: "postgres",

  //         host: configService.get('DATABASE_HOST', 'localhost'),
  //         port: Number(configService.get<number>('DATABASE_PORT', 5432)),
  //         username: configService.get('DATABASE_USERNAME', 'postgres'),
  //         password: configService.get('DATABASE_PASSWORD', 'password'),
  //         database: configService.get<string>('DATABASE_SCHEMA', 'postgres'),
  //         useUTC:true,
  //         synchronize: configService.get<boolean>(
  //           'DATABASE_SYNCHRONIZE',
  //           true,
  //         ),
  //         entities: ["dist/**/*.entity{.ts,.js}"],
  //       };
  //     },
  //   }),
    UsersModule,
    DemoModule,
    ProductCategoryModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
