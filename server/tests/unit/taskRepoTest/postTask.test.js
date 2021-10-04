const makeTask = require("../../../src/models/Task")
const taskRepo = require('../../../src/repos/taskRepo')

const create = jest.fn();
const Task = makeTask
Task.create = create;

let req = { body: {title:"testTitle",completed:true} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send};

beforeEach(() => {
  create.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: {title:"testTitle",completed:true} };
  res = { type: type, status: status,send: send};
});

describe('when adding a task', () => {
  
  test('should add the task to the database', async () => {
    await taskRepo(Task).add(req, res)
    expect(create.mock.calls.length).toBe(1);
  })

  test('should respond with a json object containg acknowledged and id', async () => {
    const bodyData={"acknowledged":true,"insertedId":"614ca2630bff41e340538bf6"};
    create.mockResolvedValue(bodyData)
    await taskRepo(Task).add(req, res)
    expect(res.send).toBeCalledWith(bodyData);
  })

  test('should respond with a 200 status code', async () => {
    await taskRepo(Task).add(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).add(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  describe("when the title is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {completed: false},
        {}
      ]
      for (const body of bodyData) {
        req.body=body;
        await taskRepo(Task).add(req, res)
        expect(res.status).toBeCalledWith(400)
      }
    })
  })

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      create.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).add(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })
})

afterEach(() => {
});