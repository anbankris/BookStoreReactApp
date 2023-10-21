import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            response.status(400).send({message: 'Send Required Fields'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//HTTP route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//HTTP route to get book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        const books = await Book.findById(id);

        return response.status(200).json(books);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//HTTP Route to Update Book
router.put('/:id', async (request, response) => {
    try{
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            response.status(400).send({message: 'Send Required Fields'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Book Not Found'});
        }

        return response.status(200).send({message: 'Book Updated Successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//HTTP Route to Delete Book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: 'Book not Found'});
        }

        return response.status(200).send({message: 'Book Deleted Successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;