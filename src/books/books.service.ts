import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookRepository)
        private bookRepository: BookRepository
    ) {}

    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
       return await this.bookRepository.getBooks(filterDto)
    }

    async getBookById(id: number): Promise<Book> {
        const found = await this.bookRepository.findOne(id)

        if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`)
        
        return found
    }


    createBook(createBookDto: CreateBookDto): Promise<Book> {
        return this.bookRepository.createBook(createBookDto)
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.getBookById(id)
        const {description, author, genre, stock} = updateBookDto

        if (description) book.description = description
        if (author) book.author = author
        if (genre) book.genre = genre
        if (stock) book.stock = stock

        await book.save()
        return book
    }

    async deleteBook(id: number): Promise<void> {
        const result = await this.bookRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }
}
