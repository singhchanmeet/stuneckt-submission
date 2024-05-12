import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server Running!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});