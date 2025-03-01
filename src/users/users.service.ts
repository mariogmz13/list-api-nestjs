import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
            @InjectModel('User') private userModel: Model<User>,
          ) {}
        
          async create(user: User): Promise<any> {
            const newUser = new this.userModel(user);
            return await newUser.save();
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

}
