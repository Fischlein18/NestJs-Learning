import { Transform, Type } from 'class-transformer'
import { IsOptional, IsNotEmpty, IsInt, Matches } from 'class-validator'

export class CreateBookDto {
    @IsNotEmpty()
    @Matches(/^(?!\s+$).+/, {
        message:
          'Title of the book is mandatory',
      })
    title: string
    
    @IsNotEmpty()
    @Matches(/^(?!\s+$).+/, {
        message:
          'Description of the book is mandatory',
      })
    description: string

    @IsNotEmpty()
    @Matches(/^(?!\s+$).+/, {
        message:
          'Author of the book is mandatory',
      })
    author: string

    @IsOptional()
    genre: string

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