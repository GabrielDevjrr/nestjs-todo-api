
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class LoginDto {
  @ApiProperty({ description: 'Email do usuário', example: 'usuario@example.com' })
  @IsEmail({}, { message: 'O email deve ser um email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'minhasenha123' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}