// auth/auth.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private authModel: Model<Auth>,
    private jwtService: JwtService,
    // private usersService: UsersService,
    private hashService: HashService,
  ) { }

  async generateToken(payload: any) {
    try {
      const token = await this.jwtService.signAsync(payload)
      return token
    } catch (error) {
      return error
    }
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
    // console.log(user);
    if (!user) {
      throw new NotFoundException(`El usuario no existe`);
      // return 's'
      // new NotFoundException(`El usuario no existe`);
    }
    const passwordCorrect = await this.hashService.comparePasswords(pass, user.password)
    console.log(passwordCorrect);
    if (user && (passwordCorrect)) {
      const { password, ...result } = user;
      // const payload = { sub: user.id, email: user.email }
      const token = await this.generateToken(
        {
          sub: user.id,
          email: user.email
        }
      )
      return token

    } else if (passwordCorrect == false) {
      throw new UnauthorizedException('Contrasena incorrecta')
    }
    return null;
  }

  async register(user: User): Promise<any> {
    const newUser = new this.authModel(user);
    console.log(newUser);
    await newUser.save();

    const email = user.email
    const login = await this.authModel.findOne({ email })

    const token = await this.jwtService.signAsync(
      {
        sub: login._id,
        email: login.email
      }
    )
    console.log('Token: ' + token);
    return token
  }

}