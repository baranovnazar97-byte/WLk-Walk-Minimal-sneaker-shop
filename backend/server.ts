import cors from 'cors';

import e from 'express';
import { shoesRouter } from './routes/shoesRoute';

const app = e();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(e.json());

app.use('/api/shoes', shoesRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
