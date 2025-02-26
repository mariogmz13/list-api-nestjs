// auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private authModel: Model<Auth>,
    private jwtService: JwtService,
    // private usersService: UsersService,
    private hashService: HashService,
  ) { }

  async generateToken(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getById(id: string): Promise<Auth | null> {
    const user = await this.authModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`El usuario no existe`);
    }
    return user;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.encontrarPorEmail(email);
    const user = await this.authModel.findOne({ email })
    console.log(user);
    if (!user) {
      throw new NotFoundException(`El usuario no existe`);
    }
    
    if (user && (await this.hashService.comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}