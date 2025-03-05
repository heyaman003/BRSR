import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserRole } from 'src/modules/user/user.dtos';
import { User } from 'src/modules/user/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userDto: CreateUserDto, role: UserRole): Promise<User> {
    try {
      const user = await this.userModel.create({ ...userDto, role });
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserdetails(userId: string): Promise<User | null> {
    try {
      const user: User | null = await this.userModel.findById(userId);
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserdetailsByEmail(email: string): Promise<User | null> {
    try {
      const user: User | null = await this.userModel.findOne({ email: email });
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.userModel.deleteOne({
        _id: userId,
        role:{
          $ne: UserRole.SUPERADMIN
        }
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
