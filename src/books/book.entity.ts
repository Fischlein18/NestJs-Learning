import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BookGenre } from "./book-genre.enum";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    author: string

    @Column()
    genre: BookGenre

    @Column()
    stock: number
}