import express from 'express';
import dotenv from 'dotenv';
import routes from './routers';
dotenv.config();

export default function startServer(port: number) {
    dotenv.config();
    const app = express();

    app.use(routes);
    
    app.listen(port, () => console.log(`Running on port ${port}`));
};