import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IITadminModule } from './iitadmin/iitadmin.module';
import { ResultsModule } from './results/results.module';
import { IITadmin } from './iitadmin/entities/iitadmin.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-csi02m3gbbvc73f99kh0-a.onrender.com',
      port: 5432,
      username: 'iitbackend_user',
      password: '5xlZDilpugF6Bx42I4riDU1HSriERUvM',
      database: 'iitbackend',
      entities: [IITadmin],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Disable SSL certificate validation
      },
    }),
    IITadminModule,
    ResultsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
// type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '@Esan0234',
//       database: 'IITbackend',
//       entities: [IITadmin],
