import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetBooksFilterDto
    ): Promise<Book[]> {
        return this.booksService.getBooks(filterDto)
    }


    @Get('/:id')
    getBookById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Book> {
        return this.booksService.getBookById(id)
    }


    @Post()
    @UsePipes(ValidationPipe)
    createBook(
        @Body() createBookDto: CreateBookDto
    ): Promise<Book> {
        return this.booksService.createBook(createBookDto)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateBook(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto
    ): Promise<Book> {
        return this.booksService.updateBook(id, updateBookDto)
    }

    @Delete('/:id')
    deleteBook(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.booksService.deleteBook(id)
    }

}
