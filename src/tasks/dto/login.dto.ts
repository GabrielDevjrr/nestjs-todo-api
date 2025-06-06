
import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RegisterDto } from './register.dto'; 

export class LoginDto extends PickType(RegisterDto, ['email', 'password'] as const) {
  
}
