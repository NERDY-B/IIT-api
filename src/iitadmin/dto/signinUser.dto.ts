import { IsEmail, IsNotEmpty } from 'class-validator';

export class signInUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly name: string;

  @IsNotEmpty()
  readonly password: string;
}
