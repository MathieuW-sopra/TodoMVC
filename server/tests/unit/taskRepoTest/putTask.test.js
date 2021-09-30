const makeTask = require("../../../src/models/Task")
const taskRepo = require('../../../src/repos/taskRepo')

const findByIdAndUpdate = jest.fn();
const Task = makeTask
Task.findByIdAndUpdate = findByIdAndUpdate;

let req = { body: {title:"testTitle",completed:true} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send};


beforeEach(() => {
  findByIdAndUpdate.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: {title:"testTitle",completed:true} };
  res = { type: type, status: status,send: send};
});

describe('when replacing one task', () => {

  test('should replace the task in the database', async () => {
    await taskRepo(Task).replace(req, res)
    expect(findByIdAndUpdate.mock.calls.length).toBe(1);
  })

  test('should respond with the new object', async () => {
    const bodyData={"acknowledged":true,"insertedId":"614ca2630bff41e340538bf6"};
    findByIdAndUpdate.mockResolvedValue(bodyData)
    await taskRepo(Task).replace(req, res)
    expect(res.send).toBeCalledWith(bodyData);
  })

  test('should respond with a 200 status code', async () => {
    await taskRepo(Task).replace(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  test("should specify json in the content type header", async () => {
    await taskRepo(Task).replace(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  describe("when the title and completed is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {completed: false},
        {title: "testMock"},
        {}
      ]
      for (const body of bodyData) {
        req.body=body;
        await taskRepo(Task).replace(req, res)
        expect(res.status).toBeCalledWith(400)
      }
    })
  })

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      findByIdAndUpdate.mockImplementation(() => {
        throw new Error();
      });
      await taskRepo(Task).replace(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })
})