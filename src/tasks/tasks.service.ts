import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const data: any = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      userId: userId,
    };

    if (createTaskDto.dueDate !== undefined) {
      data.dueDate = new Date(createTaskDto.dueDate);
    }

    return this.prisma.task.create({
      data: data,
    });
  }

  async findAll(userId: number, status?: TaskStatus): Promise<Task[]> {
    const where: any = { userId: userId };
    if (status) {
      where.status = status;
    }
    return this.prisma.task.findMany({
      where,
    });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException('Você não tem permissão para acessar esta tarefa.');
    }

    return task;
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id, userId);

    const dataToUpdate: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate !== undefined) { 
      dataToUpdate.dueDate = new Date(updateTaskDto.dueDate);
    }

    return this.prisma.task.update({
      where: { id: id },
      data: dataToUpdate,
    });
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);

    await this.prisma.task.delete({
      where: { id: id },
    });
  }
}