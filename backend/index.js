import express from 'express';
import connectDB from './DbConnection.js';
import bookRoute from "./routes/book.routes.js"
import cors from "cors"
import userRoute from "./routes/user.route.js"
const app = express();
const port = 8001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors())
// Routes
app.use('/books', bookRoute);
app.use('/user', userRoute)

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
