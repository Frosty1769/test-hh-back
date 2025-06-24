import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export const app = express()
dotenv.config()
const port = 3000

console.log(process.env.HOST)

//Базовые настройки
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.HOST
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Автоматическое подключение рутов
readdirSync(join(__dirname, 'src/routes')).forEach(file => {
    if (!file.endsWith('.js')) return; 
    const routeName = file.replace('.js', '').toLowerCase();
    const routePath = join(__dirname, 'src/routes', file);
    const fileUrl = pathToFileURL(routePath).href;
    
    const module = import(fileUrl)
        .then(module => {
            app.use(`/api/${routeName}`, module.default || module);
        })
        .catch(err => {
            console.error(`Ошибка загрузки роута ${file}:`, err);
        });
});

//Лог ошибки
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
