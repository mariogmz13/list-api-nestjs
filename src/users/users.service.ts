import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { HashService } from 'src/auth/hash.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

    constructor(
            @InjectModel('User') private userModel: Model<User>,
            // private hashService: HashService
            private authService: AuthService
          ) {}
        
          async create(user: User): Promise<any> {
            const newUser = new this.userModel(user);
            const token = this.authService.generateToken(
              {
                sub: user._id, email: user.email 
              }
            )
            newUser.save();
            return token
          }

          async checkEmail(email: String): Promise<User>{
            const mail = await this.userModel.findOne({email}).exec();
            if (mail){
              throw new BadRequestException(`Correo ya registrado`);
            }

            return null
          }
        
          async getAll(): Promise<User[]> {
            return this.userModel.find().exec();
          }
        
          async getById(id: string): Promise<User | null> {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return user;
          }
        
          async getByEmail(email: string): Promise<User | null> {
            const user = await this.userModel.findOne({email}).exec();
            if (!user) {
              throw new NotFoundException(`Usuario con email ${email} no encontrado`);
            }
            return user;
          }
        
          async getByUsername(username: string): Promise<User | null> {
            const user = await this.userModel.findOne({username}).exec();
            if (!user) {
              throw new NotFoundException(`Usuario con nombre de usuario ${username} no encontrado`);
            }
            return user;
          }
        
          async update(id: string, user: User): Promise<User | null> {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
            if (!updatedUser) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return updatedUser;
          }
        
          async delete(id: string): Promise<User> {
            const result = await this.userModel.findByIdAndDelete(id).exec();
            if (!result) {
              throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
            }
            return result
          }

          // async validateUser(username: string, pass: string): Promise<any> {
          //   // const user = await this.usersService.encontrarPorEmail(email);
          //   const user = await this.userModel.findOne({ username }).exec();
          //   if (user && (await this.hashService.comparePasswords(pass, user.password))) {
          //     const { password, ...result } = user;
          //     return result;
          //   }
          //   return null;
          // }

          // async validateUser(email: string, pass: string): Promise<any> {
          //     // const user = await this.usersService.encontrarPorEmail(email);
          //     const user = await this.userModel.findOne({ email })
          //     // console.log(user);
          //     if (!user) {
          //       throw new NotFoundException(`El usuario no existe`);
          //     }
          //     const passwordCorrect = await this.hashService.comparePasswords(pass, user.password)
          //     console.log(passwordCorrect);
          //     if (user && (passwordCorrect)) {
          //       const { password, ...result } = user;
          //       return result;
          //     }else if(passwordCorrect == false){
          //       throw new UnauthorizedException('Contrasena incorrecta')
          //     }
          //     return null;
          //   }
    

}
