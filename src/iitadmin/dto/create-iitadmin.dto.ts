import { IsEnum, IsEmail, isString, IsNotEmpty } from 'class-validator';
import { RoleType } from '../entities/roleType';
export class CreateIITadminDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly office: RoleType;

  @IsNotEmpty()
  readonly password: string;
}
