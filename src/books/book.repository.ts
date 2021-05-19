import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { GetBooksFilterDto } from "./dto/get-books-filter.dto";

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    private logger =  new Logger('BookRepository')

    async getBooks(
        filterDto: GetBooksFilterDto,
        ): Promise<Book[]> {
        const {title, author, genre, searchTerm} = filterDto
        const query = this.createQueryBuilder('book')

        if (title) {
            query.andWhere('book.title ILIKE :title', { title: `%${title}%` }) //LIKE does not apply on term which appear on the first position
        }
        if (author) {
            query.andWhere('book.author ILIKE :author', { author: `%${author}%` })
        }
        if (genre) {
            query.andWhere('book.genre = :genre', { genre })
        }

        if (searchTerm) {
            query.andWhere('(book.title ILIKE :searchTerm OR book.description ILIKE :searchTerm )', { searchTerm: `%${searchTerm}%`})
        }

        try {
            const books = await query.getMany()
            return books
        } catch (e) {
            this.logger.error(`Failed to get books. | Filters: ${ JSON.stringify(filterDto) } `, e.stack)
            throw new InternalServerErrorException()
        }
    }

    async createBook(
        createBookDto: CreateBookDto,
    ): Promise<Book> {
        const { title, description, author, genre, stock } = createBookDto
        const book = new Book()
        book.title = title
        book.description = description
        book.author = author
        book.genre = genre
        book.stock = stock

        try {
            await book.save()
        } catch (e) {
            this.logger.error(`Failed to create a Book. | Data: ${ JSON.stringify(createBookDto) } `, e.stack)
            throw new InternalServerErrorException()
        }

        return book
    }
}