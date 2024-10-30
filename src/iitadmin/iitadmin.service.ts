import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateIITadminDto } from './dto/create-iitadmin.dto';
import { UpdateIitadminDto } from './dto/update-iitadmin.dto';
import { IITadmin } from './entities/iitadmin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionPoolReadyEvent, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from './entities/roleType';

import { Student } from 'src/iitadmin/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class IITadminService {
  constructor(
    @InjectRepository(IITadmin)
    private IITadminRepository: Repository<IITadmin>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}

  async createIITadmin(
    createIITadminDto: CreateIITadminDto,
  ): Promise<IITadmin> {
    const hashedPassword = await bcrypt.hash(createIITadminDto.password, 10);

    const inputFields = await this.IITadminRepository.findOne({
      where: [
        {
          name: createIITadminDto.name,
          email: createIITadminDto.email,
          office: createIITadminDto.office,
        },
      ],
    });

    if (inputFields) {
      throw new HttpException(
        'credentials exist already',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const adminStaff = new IITadmin();
    Object.assign(adminStaff, createIITadminDto);
    adminStaff.password = hashedPassword;
    return await this.IITadminRepository.save(adminStaff);
  }

  async findAll(): Promise<IITadmin[]> {
    const adminStaff = await this.IITadminRepository.find();
    return adminStaff;
  }

  async findByName(username: string): Promise<IITadmin> {
    const staff = await this.IITadminRepository.findOne({
      where: { name: username },
    });

    return staff;
  }

  async findOne(id: number): Promise<IITadmin> {
    const staff = await this.IITadminRepository.findOne({
      where: { id },
    });

    if (!staff) {
      throw new HttpException(
        'Staff credential not registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return staff;
  }

  //business logic for this is only to allow director or the staff itself to update info
  async update(
    id: number,
    updateIitadminDto: UpdateIitadminDto,
    token: string,
  ): Promise<IITadmin> {
    const decodedToken = this.jwtService.decode(token) as {
      sub: number;
      name: string;
      role: RoleType;
    };
    // decodedToken.sub holds the id of the staff
    const userIdFromToken = decodedToken.sub;
    const officeFromToken = decodedToken.role;

    console.log(decodedToken);

    const iitadmin = await this.IITadminRepository.findOneBy({ id });
    console.log(iitadmin);

    // if (iitadmin.office !== officeFromToken) {
    //   throw new NotFoundException(
    //     `Only members of the office ${officeFromToken} can make this change`,
    //   );
    // }
    const validCheck =
      officeFromToken === iitadmin.office ||
      officeFromToken === RoleType.DIRECTOR;
    // if (iitadmin.office || RoleType.DIRECTOR)

    if (validCheck) {
      Object.assign(iitadmin, updateIitadminDto);

      return await this.IITadminRepository.save(iitadmin);
    } else {
      throw new NotFoundException(
        `Only members of the office ${officeFromToken}, ${RoleType.DIRECTOR} can make this change`,
      );
    }
  }

  //the remove logic is to ensure that only the director is able to delete
  //iit admin staff
  async remove(id: number, token: string): Promise<any> {
    const iitstaff = await this.IITadminRepository.findOneBy({ id });
    const decodedToken = this.jwtService.decode(token) as {
      sub: number;
      name: string;
      role: RoleType;
    };

    const officeFromToken = decodedToken.role;

    const checkRole = officeFromToken === RoleType.DIRECTOR;

    console.log(officeFromToken);
    console.log(checkRole);

    if (!iitstaff) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (officeFromToken === RoleType.DIRECTOR) {
      await this.IITadminRepository.delete(id);

      return {
        message: 'Staff deleted successfully',
      };
    } else {
      throw new UnauthorizedException(
        'You do not have permission to delete staff',
      );
    }
  }

  async create(
    createStudentDto: CreateStudentDto,
    tokenData: string,
  ): Promise<Student> {
    const decodedToken = this.jwtService.decode(tokenData) as {
      sub: number;
      name: string;
      role: RoleType;
    };

    const affairsNadmission = RoleType.ADMISSIONS || RoleType.STUDENT_AFFAIRS;

    if (decodedToken.role === affairsNadmission) {
      const student = new Student();
      Object.assign(student, createStudentDto);

      if (createStudentDto.EntryDate) {
        student.EntryDate = String(new Date(createStudentDto.EntryDate));
        //for past student creation, we input the year
      }
      if (createStudentDto.FutureYear) {
        student.FutureYear = String(new Date(createStudentDto.FutureYear));
        //year for past student to complete their program
      }

      const neitherEntryNorExit =
        !createStudentDto.EntryDate && !createStudentDto.FutureYear;

      const date = new Date();

      if (neitherEntryNorExit) {
        student.EntryDate = `${date.getUTCDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        student.FutureYear = `${date.getUTCDate()}-${date.getMonth() + 1}-${date.getFullYear() + 3}`;
        return await this.studentRepository.save(student);
      }
    } else {
      throw new HttpException(
        'student creation is out of bound to your office',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
