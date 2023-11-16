import express from 'express';
import morgan from 'morgan';
import path from 'path';
import employees from './employees.json' assert { type: 'json' };

const dirname = path.resolve();
const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(dirname, '/public')));

app.get('/employees', (req, res) => res.status(200).json(employees));

app.delete('/employee/:id', (req, res) => {
  employees.value = employees.value.filter((el) => el.id != id);
  res.status(200).send('Deleted');
});

app.listen(3000, () => console.log('server running on port 3000'));
