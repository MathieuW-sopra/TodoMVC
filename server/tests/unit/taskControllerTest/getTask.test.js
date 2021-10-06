const request = require('supertest');
const makeTask = require("../../../src/models/Task")
const taskRepo = require('../../../src/controllers/taskController')

// Task = {
//   find: jest.fn().mockReturnThis(),
//   limit: jest.fn().mockReturnThis()
// }

let req = { body: { title:"testTitle",completed:true } };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send };

const Task = makeTask;
const limit = jest.fn().mockResolvedValue(req.body)
let obj = {test:"test", limit: "limit" }
obj.limit=limit;
const find = jest.fn().mockResolvedValue(obj);
Task.find = find;

beforeEach(() => {
  // Task.find.mockReset()
  // Task.limit.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: {title:"testTitle",completed:true} };
  res = { type: type, status: status,send: send};
});

describe('when getting all tasks', () => {

  test.skip('should get all tasks in the database', async () => {
    await taskRepo(Task).get(req, res)
    expect(Task.find.mock.calls.length).toBe(1);
  })

  test('should respond all tasks in the database', async () => {
    // find.mockResolvedValue(req.body);
    await taskRepo(Task).get(req, res)
    expect(res.send).toBeCalledWith(req.body);
  })

  test.skip('should respond with a 200 status code', async () => {
    await taskRepo(Task).get(req, res)
    expect(res.status).toBeCalledWith(200)
  })

  test.skip("should specify json in the content type header", async () => {
    await taskRepo(Task).get(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  describe.skip("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      Task.find.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).get(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })

})