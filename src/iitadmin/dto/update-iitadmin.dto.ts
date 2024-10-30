import { PartialType } from '@nestjs/mapped-types';
import { CreateIITadminDto } from './create-iitadmin.dto';
import { RoleType } from '../entities/roleType';

export class UpdateIitadminDto extends PartialType(CreateIITadminDto) {
  constructor() {
    super();
  }
  readonly name: string;

  readonly email: string;

  readonly office: RoleType;

  readonly password: string;
}
