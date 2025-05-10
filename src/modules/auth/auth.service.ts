import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER } from './constant/user';
import { JwtPayload } from './constant/jwp-payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(email: string, password: string) {
    if (email !== USER.email && password !== USER.password) {
      throw new BadRequestException(`Wrong credentials`);
    }

    const token = this.getJwtToken({ email: email });

    return token;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
