import { Transform, Type } from 'class-transformer'
import { IsOptional, IsNotEmpty, IsInt, Matches, IsEnum } from 'class-validator'
import { BookGenre } from '../book-genre.enum'

export class UpdateBookDto {
    
    @IsOptional()
    @Matches(/^(?!\s+$).+/, {
        message:
          'Description of the book can not be empty',
      })
    description: string

    @IsOptional()
    @Matches(/^(?!\s+$).+/, {
        message:
          'Author of the book can not be empty',
      })
    author: string

    @IsOptional()
    @IsEnum(BookGenre, {
        message:
          `"$value" is an invalid genre. ` +
          `The allowed values are: ${Object.keys(BookGenre)}`,
      })
    genre: BookGenre

    @IsOptional()
    @Type(() => Number)  //by default string, must explicitly cast the Number type
    @IsInt()
    stock: number

}

/**** string does not contain only spaces
^         # start of the line / string
(?!\s+$)  # neg. lookahead, making sure there are not only whitespaces
.+        # at least one character, possibly more
****/