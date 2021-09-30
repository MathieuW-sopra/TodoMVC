const request = require('supertest');
const makeTask = require("../../../src/models/Task")
const taskRepo = require('../../../src/repos/taskRepo')

const find = jest.fn();
const Task = makeTask
Task.find=find;

let req = { body: {title:"testTitle",completed:true} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send};

beforeEach(() => {
  find.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: {title:"testTitle",completed:true} };
  res = { type: type, status: status,send: send};
});

describe('when all getting tasks', () => {

  test('should get all tasks in the database', async () => {
    await taskRepo(Task).get(req, res)
    expect(find.mock.calls.length).toBe(1);
  })

  test('should respond all tasks in the database', async () => {
    req.body =[{id:1, title:"testmock1", completed:true},{id:2, title:"testmock2", completed:false}]
    find.mockResolvedValue(req.body)
    await taskRepo(Task).get(req, res)
    expect(res.send).toBeCalledWith(req.body);
  })

  test('should respond with a 200 status code', async () => {
    await taskRepo(Task).get(req, res)
    expect(res.status).toBeCalledWith(200)
  })

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).get(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      find.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).get(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })

})