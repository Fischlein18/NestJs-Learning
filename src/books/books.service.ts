import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { v1 as uuid} from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    private books: Book[] = []

    getAllBooks(): Book[] {
        return this.books
    }

    getBookById(id: string): Book {
        return this.books.find( book => book.id === id )
    }

    // createBook(
    //     title: string,
    //     description: string,
    //     author: string,
    //     genre: string,
    //     stock: number
    //     ) {
    //     const book:Book = {
    //         id: uuid(),
    //         title,
    //         description,
    //         author,
    //         genre,
    //         stock
    //     }

    //     this.books.push(book)
    //     return book
    // }
    createBook(createBookDto: CreateBookDto) {
        const {title, description, author, genre, stock} = createBookDto
        const book:Book = {
            id: uuid(),
            title,
            description,
            author,
            genre,
            stock
        }

        this.books.push(book)
        return book
    }

    updateBook(id: string, updateBookDto: UpdateBookDto): Book {
        const book = this.getBookById(id)
        const {description, author, genre, stock} = updateBookDto

        if (description) book.description = description
        if (author) book.author = author
        if (genre) book.genre = genre
        if (stock) book.stock = stock

        return book
    }

    deleteBook(id: string): void {
        this.books = this.books.filter( book => book.id !== id )
    }
}
