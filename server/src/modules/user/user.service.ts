import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { Mention, User } from '@prisma/client';
import { CreateUserDto, GetUserDto, UserRole } from './user.dtos';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  login(data: any) {
    console.log(data);
  }

  /**
   *
   * @param userId
   * @returns { email, name, role, company }
   */
  async getUser(userId: string): Promise<GetUserDto> {
    const user: User | null = await this.userRepository.getUserdetails(userId);

    if (!user) throw new NotFoundException('User not found.');

    return this.convertToDto(user);
  }

  async getUserdetails(email: string): Promise<User> {
    const user: User | null =
      await this.userRepository.getUserdetailsByEmail(email);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async createUser(
    newUser: CreateUserDto,
    role: UserRole,
  ): Promise<GetUserDto> {
    newUser.password = await hash(newUser.password, 12);

    if (role === UserRole.CLIENT && !newUser.company)
      throw new BadRequestException("Please fill client's company details.");

    const user: User = await this.userRepository.createUser(newUser, role);

    // await this.companyService.addUser(user['id'], newUser.company);

    return this.convertToDto(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }

  async getMentions(userId: string) {
    const mentions = await this.userRepository.getMentions(userId);
    if (!mentions) throw new NotFoundException('User does not exist.');
    return mentions.mentionedIn.map((mention) => this.convertToMentionDto(mention));
  }

  async getMentionDetails(mentionId: string) {
    const mention = await this.userRepository.getMention(mentionId);
    if(!mention)
      throw new NotFoundException('Mention does not exist.');
    return this.convertToMentionDto(mention);
  }

  private convertToMentionDto(mention: any) {
    return {
      questionId: mention.comment.question.id,
      mentionedBy: mention.comment.user,
      id: mention.id,
      subsectionId: mention.comment.question.subsection.id,
      sectionId: mention.comment.question.subsection.section.id,
      companyId: mention.comment.question.subsection.section.companyId,
      createdAt: mention.comment.createdAt,
    }
  }

  convertToDto(user: User): GetUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId || '',
    };
  }
}
