import { Module } from '@nestjs/common';
import { IITadminService } from './iitadmin.service';
import { IITadminController } from './iitadmin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IITadmin } from './entities/iitadmin.entity';
import { Student } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IITadmin, Student])],
  controllers: [IITadminController],
  providers: [IITadminService],
  exports: [IITadminService],
})
export class IITadminModule {}
