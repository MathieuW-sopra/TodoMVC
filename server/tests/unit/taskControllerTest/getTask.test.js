const makeTask = require("../../../src/models/Task");
const taskRepo = require("../../../src/controllers/taskController");

let req = { body: { title:"testTitle",completed:true } };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send };

const find = jest.fn();
const Task = makeTask;
Task.find = find;

beforeEach(() => {
  find.mockResolvedValue(req.body);
  type.mockReset();
  status.mockReset();
  send.mockReset();
  req = { body: {title:"testTitle",completed:true} };
  res = { type: type, status: status,send: send};
});

describe("when getting all tasks", () => {

  test("should get all tasks in the database", async () => {
    await taskRepo(Task).get(req, res);
    expect(Task.find.mock.calls.length).toBe(1);
  });

  test("should respond all tasks in the database", async () => {
    await taskRepo(Task).get(req, res);
    expect(res.send).toBeCalledWith(req.body);
  });

  test("should respond with a 200 status code", async () => {
    await taskRepo(Task).get(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).get(req, res);
    expect(res.type).toBeCalledWith("application/json");
  });

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      Task.find.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).get(req, res);
      expect(res.status).toBeCalledWith(500);
    });
  });

});