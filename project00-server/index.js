const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

const users = [
  {
    "id": 1,
    "name": "Abu",
    "email": "abu@gmail.com"
  },
  {
    "id": 2,
    "name": "Hurayra",
    "email": "hurayra@gmail.com"
  }
]

app.get('/users', (req, res) => {
  res.send(users);
})

app.post('/users', (req, res) => {
  console.log('user post');
  console.log(req.body);
  
  const newUser = req.body;
  newUser.id = users.length + 1;
  res.send(newUser);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


