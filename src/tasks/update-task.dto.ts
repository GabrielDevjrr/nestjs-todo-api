import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto  {
  @ApiProperty({ description: 'Novo título da tarefa (opcional)', example: 'Comprar leite', required: false })
  @IsOptional() 
  @IsString({ message: 'O título deve ser uma string.' })
  title?: string; 

  @ApiProperty({ description: 'Nova descrição da tarefa (opcional)', example: 'Leite integral no supermercado', required: false })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @ApiProperty({ description: 'Novo status da tarefa (ex: "pending", "completed") (opcional)', example: 'completed', required: false })
  @IsOptional()
  @IsString({ message: 'O status deve ser uma string.' })
  status?: string;

  @ApiProperty({ description: 'Nova data de vencimento (formato YYYY-MM-DD) (opcional)', example: '2025-06-06', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'A data de vencimento deve ser uma data válida no formato YYYY-MM-DD.' })
  dueDate?: string;
}