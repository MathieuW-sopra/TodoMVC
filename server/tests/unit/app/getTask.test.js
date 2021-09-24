const request = require('supertest');
const makeApp = require('../../../src/app.js');

const get = jest.fn();
const app = makeApp({
  get,
})

beforeEach(() => {
  get.mockReset()
});

describe('when all getting tasks', () => {

  test('should get all tasks in the database', async () => {
    await request(app).get("/task/get").send()
    expect(get.mock.calls.length).toBe(1);
  })

  test('should respond all tasks in the database', async () => {
    const bodyData =[{id:1, title:"testmock1", completed:true},{id:2, title:"testmock2", completed:false}]
    get.mockResolvedValue(bodyData)
    const response = await request(app).get("/task/get").send()
    expect(response.body).toEqual(bodyData);
  })

  test('should respond with a 200 status code', async () => {
    const response = await request(app).get("/task/get").send()
    expect(response.statusCode).toBe(200)
  })

  test("should specify json in the content type header", async () => {
    const response = await request(app).get("/task/get").send()
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })

})