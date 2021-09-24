const request = require('supertest');
const makeApp = require('../../../src/app.js');

const add = jest.fn();
const app = makeApp({
  add,
})

beforeEach(() => {
  add.mockReset()
});

describe('when adding a task', () => {
  
  test('should add the task to the database', async () => {
    await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(add.mock.calls.length).toBe(1);
  })

  test('should respond with a json object containg acknowledged and id', async () => {
    add.mockResolvedValue({"acknowledged":true,"insertedId":"614ca2630bff41e340538bf6"})
    const response = await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(response.body.acknowledged).toEqual(true);
    expect(response.body.insertedId).toBeDefined();
  })

  test('should respond with a 200 status code', async () => {
    const response = await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(response.statusCode).toBe(200)
  })

  test("should specify json in the content type header", async () => {
    const response = await request(app).post("/task/add").send({title:"testMock", completed: false})
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })

  describe("when the title is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {completed: false},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/task/add").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})

afterEach(() => {
});