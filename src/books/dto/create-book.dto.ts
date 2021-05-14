import { IsOptional, IsNotEmpty } from 'class-validator'

export class CreateBookDto {
    @IsNotEmpty()
    title: string
    
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    author: string

    @IsOptional()
    genre: string

    @IsOptional()
    stock: number
}