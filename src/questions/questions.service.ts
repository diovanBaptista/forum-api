import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    return await this.prismaService.questions.create({
      data: {...createQuestionDto, userId: req.sub.sub}
    });
  }

  async findAll() {
    return await this.prismaService.questions.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.questions.findUnique({ where: {id} });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.questions.update({
      where: {id},
      data: updateQuestionDto
    });;
  }

  remove(id: number) {
    return this.prismaService.questions.delete({where: {id}});
  }
}
