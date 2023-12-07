import express from 'express';
import motos from './routes/motos.routes.js'
import bicicles from './routes/bicicles.routes.js'
import locations from './routes/locations.routes.js'
import messages from './routes/messages.routes.js'
import orders from './routes/orders.routes.js'
import owners from './routes/owners.routes.js'
import prospects from './routes/prospects.route.js'

const app = express();

app.use(express.json())
app.use('/api', motos);
app.use('/api', bicicles);
app.use('/api', locations);
app.use('/api', messages);
app.use('/api', orders);
app.use('/api', owners);
app.use('/api', prospects);

const port = 3500;



app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
