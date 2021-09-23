const request = require('supertest');
const makeApp = require('../../src/app.js');

const add = jest.fn();
const app = makeApp({
  add,
})

beforeEach(() => {
  add.mockReset()
});

describe('when adding a task', () => {
  it('should add the task to the database', async () => {
    await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(add.mock.calls.length).toBe(1);
  })

  it('should respond with a json object containg acknowledged and id', async () => {
    add.mockResolvedValue({"acknowledged":true,"insertedId":"614ca2630bff41e340538bf6"})
    const response = await request(app).post("/task/add").send({title:"testMock", completed: false})
    console.log("response.body: "+JSON.stringify(response.body));
    expect(response.body.acknowledged).toEqual(true);
    expect(response.body.insertedId).toBeDefined();
  })

  it('should respond with a 200 status code', async () => {
    const response = await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(response.statusCode).toBe(200)
  })

})

afterEach(() => {
});