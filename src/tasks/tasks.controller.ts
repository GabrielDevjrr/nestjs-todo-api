import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@ApiTags('tasks')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async create(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.id, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas do usuário logado' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna uma tarefa específica pelo ID' })
  @ApiResponse({ status: 200, description: 'Tarefa retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma tarefa existente' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async update(@Param('id') id: string, @GetUser() user: User, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, user.id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta uma tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async remove(@Param('id') id: string, @GetUser() user: User) {
    await this.tasksService.remove(+id, user.id);
  }
}