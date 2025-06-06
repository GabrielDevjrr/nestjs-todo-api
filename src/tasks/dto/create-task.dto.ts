
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client'; 

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa', example: 'Comprar pão' })
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @ApiProperty({ description: 'Descrição detalhada da tarefa', example: 'Pão francês na padaria da esquina', required: false })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Status da tarefa', example: TaskStatus.PENDING, enum: TaskStatus })
  @IsEnum(TaskStatus, { message: 'O status deve ser "PENDING" ou "COMPLETED".' })
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  status: TaskStatus;

  @ApiProperty({ description: 'Data de vencimento da tarefa (formato ISO 8601)', example: '2025-06-05T23:59:59Z', required: false })
  @IsDateString({}, { message: 'A data de vencimento deve ser uma data válida no formato ISO 8601.' })
  @IsOptional()
  dueDate?: Date; 
}