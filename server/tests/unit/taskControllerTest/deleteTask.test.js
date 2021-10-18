const makeTask = require("../../../src/models/Task")
const taskRepo = require("../../../src/controllers/taskController")

const findByIdAndRemove = jest.fn();
const Task = makeTask
Task.findByIdAndRemove = findByIdAndRemove;

let req = { body: {id: 1} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send};

beforeEach(() => {
  findByIdAndRemove.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: {id: 1} };
  res = { type: type, status: status,send: send};
});

describe("when deleting one task", () => {

  test("should remove the task in the database", async () => {
    await taskRepo(Task).remove(req, res)
    expect(findByIdAndRemove.mock.calls.length).toBe(1);
  })

  test("should respond the deleted object", async () => {
    const bodyData={title:"testTitle",completed:true};
    findByIdAndRemove.mockResolvedValue(bodyData)
    await taskRepo(Task).remove(req, res)
    expect(res.send).toBeCalledWith(bodyData);
  })

  test("should respond with a 200 status code", async () => {
    await taskRepo(Task).remove(req, res)
    expect(res.type).toBeCalledWith("application/json")
  })

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).remove(req, res)
    expect(res.type).toBeCalledWith("application/json")
  })

  describe("when the id is missing", () => {
    test("should respond with a status code of 400", async () => {
      req.body.id=undefined;
      await taskRepo(Task).remove(req, res)
      expect(res.status).toBeCalledWith(400)
    })
  })

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      findByIdAndRemove.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).remove(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })
})