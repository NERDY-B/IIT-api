import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IITadminModule } from 'src/iitadmin/iitadmin.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { IITadminService } from 'src/iitadmin/iitadmin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IITadmin } from 'src/iitadmin/entities/iitadmin.entity';
import { Student } from 'src/iitadmin/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IITadmin, Student]),
    IITadminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret || 'manuel',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, IITadminService, JwtService],
})
export class AuthModule {}
