import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IITadmin } from 'src/iitadmin/entities/iitadmin.entity';
import { IITadminService } from 'src/iitadmin/iitadmin.service';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private iitadminService: IITadminService,
    @InjectRepository(IITadmin)
    private IITadminRepository: Repository<IITadmin>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.IITadminRepository.findOne({
      where: [{ name: username }],
    });

    console.log(user);
    // const user = await this.iitadminService.findByName(username);

    const checkPass = await bcrypt.compare(pass, user.password);
    console.log('check pass ', checkPass);

    if (!checkPass) {
      throw new UnauthorizedException('Invalid password');
    }

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const options = {
      expiresIn: '1h',
      secret: jwtConstants.secret,
    };

    const payload = { sub: user.id, name: user.name, role: user.office };
    return {
      access_token: await this.jwtService.sign(payload, options),
    };

    // const { password: clientPassword, name } = user;
  }
}
