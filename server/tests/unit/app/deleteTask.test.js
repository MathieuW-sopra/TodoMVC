const request = require('supertest');
const makeApp = require('../../../src/app.js');

const remove = jest.fn();
const app = makeApp({
  remove,
})

beforeEach(() => {
  remove.mockReset()
});

describe('when deleting one task', () => {

  test('should remove the task in the database', async () => {
    await request(app).delete("/task/remove").send({id:1})
    expect(remove.mock.calls.length).toBe(1);
  })

  test('should respond the new object', async () => {
    remove.mockResolvedValue(true)
    const response = await request(app).delete("/task/remove").send({id:1})
    expect(response.body).toEqual(true);
  })

  test('should respond with a 200 status code', async () => {
    const response = await request(app).delete("/task/remove").send({id:1})
    expect(response.statusCode).toBe(200)
  })

  test("should specify json in the content type header", async () => {
    const response = await request(app).delete("/task/remove").send({id:1})
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })

  describe("when the id is missing", () => {
    test("should respond with a status code of 400", async () => {
    const response = await request(app).delete("/task/remove").send({})
    expect(response.statusCode).toBe(400)
    })
  })
})