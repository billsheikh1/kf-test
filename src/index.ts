import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send();
});

app.listen(port, () => console.log(`Running on port ${port}`));