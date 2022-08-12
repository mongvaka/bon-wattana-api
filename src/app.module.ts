import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./api/category/category.entity";
import { CategoryModule } from "./api/category/category.module";
import { CountryModule } from "./api/country/country.module";
import { DistrictModule } from "./api/district/district.module";
import { ProductModule } from "./api/product/product.module";
import { ProvinceModule } from "./api/province/province.module";
import { SubDistrictModule } from "./api/sub-district/sub-district.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationsModule } from "./core/authentications/authentications.module";
import { DemoModule } from "./core/demo/demo.module";
import { ImagesModule } from "./core/images/images.module";
import { UserModule } from "./core/users/users.module";


@Module({
  imports: [
    // ConfigModule.forRoot(
    //   {isGlobal:true}
    // ),
    // TypeOrmModule.forRoot({
    //   type:'postgres',
    //   url:'http://43.228.85.126',
    //   port:5432,
    //   username:'postgres',
    //   password:"password",
    //   autoLoadEntities:true,
    //   schema:'postgres',
    //   synchronize:true,
    //   entities: ["dist/**/*.entity{.ts,.js}"]
    // }),
ConfigModule.forRoot({
    isGlobal: true,
  }),
  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",

          host: configService.get('DATABASE_HOST', 'localhost'),
          port: Number(configService.get<number>('DATABASE_PORT', 5432)),
          username: configService.get('DATABASE_USERNAME', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get<string>('DATABASE_SCHEMA', 'conproject'),
          useUTC:true,
          synchronize: true,
          entities: ["dist/**/**/*.entity{.ts,.js}"],
          
        };
      },
    }),
    ProductModule,
    UserModule,
    DemoModule,
    AuthenticationsModule,
    CountryModule,
    DistrictModule,
    ProvinceModule,
    SubDistrictModule,
    ImagesModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
