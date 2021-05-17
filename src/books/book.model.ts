import { BookGenre } from "./book-genre.enum";

export interface Book {
    id: string
    title: string
    description: string
    author: string
    genre: BookGenre
    stock: number
    // price: number
    // currency: string
    // image: string
    // avgRating: number
}

