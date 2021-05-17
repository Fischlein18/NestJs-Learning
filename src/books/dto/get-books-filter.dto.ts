import { IsEnum, IsIn, isIn, IsNotEmpty, IsOptional } from 'class-validator';
import { BookGenre } from '../book-genre.enum';
export class GetBooksFilterDto {

    @IsOptional()
    title: string

    // @IsOptional()
    // description: string

    @IsOptional()
    author: String

    @IsOptional()
    @IsEnum(BookGenre, {
        message:
          `"$value" is an invalid genre. ` +
          `The allowed values are: ${Object.keys(BookGenre)}`,
      })
    genre: BookGenre

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string
}