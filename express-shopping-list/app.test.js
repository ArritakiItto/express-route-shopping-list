const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

let popsicle = { name: 'popsicle', price: 1.45 };

beforeEach(function() {
  items.push(popsicle);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */

describe('GET /items', function() {
  test('Gets a list of items', async function() {
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([popsicle]);
  });
});

/** POST /items - returns `{item: item}` */

describe('POST /items', function() {
  test('Creates a new item', async function() {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: 'cheerios',
        price: 3.4
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ added: { name: 'cheerios', price: 3.4 } });
  });
});

/** GET /items/:name - return `{item: item}` */

describe('GET /items/:name', function() {
  test('Gets a single item', async function() {
    const response = await request(app).get(`/items/${popsicle.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(popsicle);
  });
});

/** PATCH /items/:name - return `{item: item}` */

describe('PATCH /items/:name', function() {
  test('Updates a single item', async function() {
    const response = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({
        name: 'new popsicle',
        price: 2.45
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'new popsicle', price: 2.45 } });
  });
});

/** DELETE /items/:name - return `{message: "Item deleted"}` */

describe('DELETE /items/:name', function() {
  test('Deletes a single a item', async function() {
    const response = await request(app).delete(`/items/${popsicle.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });
});
