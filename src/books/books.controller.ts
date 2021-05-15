import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getAllBooks() : Book[] {
        return this.booksService.getAllBooks()
    }  

    @Get('/:id')
    getBookById(
        @Param('id') id: string
    ): Book {
        return this.booksService.getBookById(id)
    }

    // @Post()
    // createBook(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    //     @Body('author') author: string,
    //     @Body('genre') genre: string,
    //     @Body('stock') stock: number
    // ): Book {
    //     return this.booksService.createBook(title, description, author, genre, stock)
    // }
    @Post()
    @UsePipes(ValidationPipe)
    createBook(
        @Body() createBookDto: CreateBookDto
    ): Book {
        return this.booksService.createBook(createBookDto)
    }

    @Delete('/:id')
    deleteBook(
        @Param('id') id: string
    ): void {
        this.booksService.deleteBook(id)
    }

}
