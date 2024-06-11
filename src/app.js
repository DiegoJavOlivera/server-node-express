import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'

import handlebars from 'express-handlebars'
import __dirname from './utils.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/',viewsRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})



