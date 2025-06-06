import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class GetTasksFilterDto {
@ApiProperty({ enum: TaskStatus, required: false, description: 'Filtrar tarefas por status (pending ou completed)' })
@IsOptional()
@IsEnum(TaskStatus, { message: 'Status inválido. Use "pending" ou "completed".' })
status?: TaskStatus;
}