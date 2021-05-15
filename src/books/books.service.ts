import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { v1 as uuid} from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';

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

    deleteBook(id: string): void {
        this.books = this.books.filter( book => book.id !== id )
    }
}
