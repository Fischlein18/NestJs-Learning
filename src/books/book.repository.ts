import { InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDto } from "./dto/create-book.dto";

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    private logger =  new Logger('TaskRepository')

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