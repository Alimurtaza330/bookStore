
import Book from "../model/book.js";

export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
