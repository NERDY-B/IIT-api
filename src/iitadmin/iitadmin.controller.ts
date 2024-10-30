import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IITadminService } from './iitadmin.service';
import { CreateIITadminDto } from './dto/create-iitadmin.dto';
import { UpdateIitadminDto } from './dto/update-iitadmin.dto';
import { IITadmin } from './entities/iitadmin.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Student } from 'src/iitadmin/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('iitadmin')
export class IITadminController {
  constructor(private readonly iitadminService: IITadminService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createIITadminDto: CreateIITadminDto,
  ): Promise<IITadmin> {
    return await this.iitadminService.createIITadmin(createIITadminDto);
  }

  @Get('staffs')
  async findAll(): Promise<IITadmin[]> {
    return this.iitadminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iitadminService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIitadminDto: UpdateIitadminDto,
    @Req() request: any,
  ): Promise<IITadmin> {
    const token = request.headers.authorization.split(' ')[1];
    return this.iitadminService.update(+id, updateIitadminDto, token);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    return this.iitadminService.remove(+id, token);
  }

  @UseGuards(AuthGuard)
  @Post('createStudent')
  async createStudent(
    @Req() request: any,
    @Body() studentDto: CreateStudentDto,
  ): Promise<Student> {
    const token = request.headers.authorization.split(' ')[1];
    return await this.iitadminService.create(studentDto, token);
  }
}

/*
create an entity called IITstaff, the staffs would include role/designaton/office as student affairs, admission, program
when loggedin as student affairs or admission these both office or role or designation should have the exclusive ability of 
creating a student entity and can create as many as required ,in both the entity staff and student entity this would mean 
that the office or role or designation student affair or admission would have a relationship of one to many and many to one respectively
provide a code sample and necessary controller.ts file, service.ts file for both separate entity, keeping in mind that the distinctive 
role or office or designation would be decoded from a token 
*/
