const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const { PORT = 3000 } = process.env;



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb ', {
  useNewUrlParser: true
});
app.use('/', routerUsers);

app.use((req, res, next) => {
    req.user = {
      _id: '6248741a5e2ca84661c0bdd5' 
    };
  
    next();
  });

  app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'))

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})