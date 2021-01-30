import express, { Application } from 'express';
import queryItems from './controllers';

require('dotenv').config();

// Boot express
const app: Application = express();
const port = process.env.PORT;

// Application routing
app.use('/api', queryItems);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));