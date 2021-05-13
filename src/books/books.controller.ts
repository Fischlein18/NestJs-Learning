import { Body, Controller, Get, Post } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getAllBooks() : Book[] {
        return this.booksService.getAllBooks()
    }  

    @Post()
    createBook(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('author') author: string,
        @Body('genre') genre: string,
        @Body('stock') stock: number
    ): Book {
        return this.booksService.createBook(title, description, author, genre, stock)
    }

}
