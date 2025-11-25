import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { User } from '@prisma/client';
import { CreateUserDto, GetUserDto, UserRole } from './user.dtos';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

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

    // if(await this.userRepository.doesEmailExist(newUser.email))
    //   throw new ConflictException('Email already exists.')

    const user: User = await this.userRepository.createUser(newUser, role);

    return this.convertToDto(user);
  }

  async deleteUser(userId: string, userRole: UserRole): Promise<void> {
    await this.userRepository.deleteUser(userId, userRole);
  }

  async getMentions(userId: string) {
    const mentions = await this.userRepository.getMentions(userId);
    if (!mentions) throw new NotFoundException('User does not exist.');
    return mentions.mentionedIn.map((mention) =>
      this.convertToMentionDto(mention),
    );
  }

  async getMentionDetails(mentionId: string) {
    const mention = await this.userRepository.getMentionDetails(mentionId);
    if (!mention) throw new NotFoundException('Mention does not exist.');
    return this.convertToMentionDto(mention);
  }

  async getUserWithAssignedQuestions(userId: string) {
    const assignQuestion =
      await this.userRepository.getUserWithAssignedQuestions(userId);
    if (!userId) throw new NotFoundException('Mention does not exist.');
    return assignQuestion.map((q) => this.convertAssignedQuestionToDto(q));
  }

  async getCompanyOfUser(userId: string): Promise<string> {
    const company = await this.userRepository.getCompanyOfUser(userId);
    if (!company) throw new NotFoundException('Company does not exist.');
    return company;
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
    };
  }
  private convertAssignedQuestionToDto(question: any) {
    return {
      id: question.id,
      heading: question.heading,
      description: question.desc,
      type: question.type,
      answer: question.answer_text,
      assignedToId: question.assignedToId,
      subsectionId: question.subsectionId,
      index: question.index,
      isAnswered: question.isAnswered,
    };
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
