import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  names: string[];

  @IsNotEmpty()
  className: string;

  @IsNotEmpty()
  EntryDate: string;

  @IsNotEmpty()
  FutureYear: string;

  @IsNotEmpty()
  designation: string;

  @IsNotEmpty()
  guardian: string[];

  @IsNotEmpty()
  @IsEmail()
  guardianMail: string;

  @IsNotEmpty()
  @IsNumber()
  guardianNo: number;

  @IsNotEmpty()
  tutor: string;
}

// @IsMobilePhone(locale: string)
//validate the class before save , check if a class with that name already exist and the entry year
//lesser than the current year output
