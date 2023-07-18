const express = require ('express');
const app = express();
const items = require('./fakeDb');

app.use(express.json());

//routes--------

//GET /items:

app.get('/items', function(req, res) {
  res.json(items);
});

//POST /items:

app.post('/items', function (req, res) {
  let newItem = { name:req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

//GET /items/:name:

app.get('/items/:name', function (req, res) {
  let foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new Error('Item not found');
  }
  res.json(foundItem);
})

//PATCH /items/:name:

app.patch('/items/:name', function (req, res) {
  let foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new Error('Item not found')
  }
    // Check if name and price are provided before updating
    if (req.body.name !== undefined) {
      foundItem.name = req.body.name;
    }
    if (req.body.price !== undefined) {
      foundItem.price = req.body.price;
    }
    res.json({ updated: foundItem });
})

//DELETE /items/:name:

app.delete('/items/:name', function (req, res) {
  let foundItemIndex = items.findIndex(item => item.name === req.params.name);
  if (foundItemIndex === -1) {
    throw new Error('Item not found');
  }
  items.splice(foundItemIndex, 1);
  res.json({ message: 'Deleted' });
  
});

//Error Handling
app.use(function (err,req, res, next) {
  res.status(500).json ({ error: err.message });
});

//----------

module.exports = app;
