const makeTask = require("../../../src/models/Task");
const taskRepo = require("../../../src/controllers/taskController");

let req = { body: { title:"testTitle",completed:true },query:{page:1} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send };

const find = jest.fn();
const Task = makeTask;
Task.find = find;
const paginate = jest.fn().mockResolvedValue(req.body);
Task.paginate=paginate;

beforeEach(() => {
  type.mockReset();
  status.mockReset();
  send.mockReset();
  req = { body: {title:"testTitle",completed:true},query:{page:1} };
  res = { type: type, status: status,send: send};
});

describe("when getting all tasks", () => {

  test("should get all tasks in the database", async () => {
    await taskRepo(Task).getPage(req, res);
    expect(Task.find.mock.calls.length).toBe(1);
  });

  test("should respond all tasks in the database", async () => {
    await taskRepo(Task).getPage(req, res);
    expect(res.send).toBeCalledWith(req.body);
  });

  test("should respond with a 200 status code", async () => {
    await taskRepo(Task).getPage(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).getPage(req, res);
    expect(res.type).toBeCalledWith("application/json");
  });

  describe("when the page number is not superior to 1", () => {
    test("should respond with a status code of 400", async () => {
      req.query.page=0;
      await taskRepo(Task).getPage(req, res);
      expect(res.status).toBeCalledWith(400);
    });
  });

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      Task.find.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).getPage(req, res);
      expect(res.status).toBeCalledWith(500);
    });
  });

});