import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    // @Get()
    // getAllBooks() : Book[] {
    //     return this.booksService.getAllBooks()
    // }  
    @Get()
    getTasks(@Query() filterDto: GetBooksFilterDto): Book[] {
        console.log(filterDto)
        if (Object.keys(filterDto).length) {
            return this.booksService.getBooksWithFilters(filterDto)
        } else {
            return this.booksService.getAllBooks()
        }
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
    //     @Body('genre') genre: BookGenre,
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

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateBook(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto
    ): Book {
        return this.booksService.updateBook(id, updateBookDto)
    }

    @Delete('/:id')
    deleteBook(
        @Param('id') id: string
    ): void {
        this.booksService.deleteBook(id)
    }

}
