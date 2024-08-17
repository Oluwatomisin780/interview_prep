import express from 'express';
import dotenv from 'dotenv';
import { todoRouter } from './Src/Routes/Todo.Route';
import { userRouter } from './Src/Routes/User.Route';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', todoRouter);

app.use('/api', userRouter);
const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
