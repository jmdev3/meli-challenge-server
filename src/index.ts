import express, { Application } from 'express';
import queryItems from './controllers';
import cors from "cors";

require('dotenv').config();

// Boot express
const app: Application = express();
const port = process.env.PORT;

app.use(cors());

// Application routing
app.use('/api', queryItems);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));