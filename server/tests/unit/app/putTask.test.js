const request = require('supertest');
const makeApp = require('../../../src/app.js');

const replace = jest.fn();
const app = makeApp({
  replace,
})

beforeEach(() => {
  replace.mockReset()
});

describe('when replacing one task', () => {

  test('should replace the task in the database', async () => {
    await request(app).put("/task/replace").send({title:"testMock", completed: false})
    expect(replace.mock.calls.length).toBe(1);
  })

  test('should respond with the new object', async () => {
    replace.mockResolvedValue({title:"testMock", completed: true})
    const response = await request(app).put("/task/replace").send({title:"testMock", completed: true})
    expect(response.body.title).toEqual("testMock");
    expect(response.body.completed).toEqual(true);
  })

  test('should respond with a 200 status code', async () => {
    const response = await request(app).put("/task/replace").send({title:"testMock", completed: false})
    expect(response.statusCode).toBe(200)
  })

  test("should specify json in the content type header", async () => {
    const response = await request(app).put("/task/replace").send({title:"testMock", completed: false})
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })

  describe("when the title and completed is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {completed: false},
        {title: "testMock"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).put("/task/replace").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})