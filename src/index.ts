import express, { Application } from 'express';
import queryItems from './controllers';
import cors from "cors";
import logger from "morgan";

require('dotenv').config();

// Boot express
const app: Application = express();
const port = process.env.PORT;

app.use(cors());
app.use(logger('dev'));

// Application routing
app.use('/api', queryItems);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));