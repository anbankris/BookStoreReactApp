import express, { response } from "express";
import { PORT, mongoDbURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Book Store');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDbURL)
    .then(() => {
        console.log('Connected to Database');
        app.listen(PORT, () => {
            console.log("App running on port: " + PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
