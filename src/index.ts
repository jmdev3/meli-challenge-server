import express, { Application } from 'express';
import queryItems from './controllers';

// Boot express
const app: Application = express();
const port = 5000;

// Application routing
app.use('/api', queryItems);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));