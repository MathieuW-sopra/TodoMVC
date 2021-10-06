const makeUser = require("../../../src/models/User")
const authRepo = require('../../../src/controllers/authController')

const findOne = jest.fn();
const User = makeUser
User.findOne=findOne;

let req = { body: { email:"test@gmail.com", password:"test"} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status,send: send };

beforeEach(() => {
  findOne.mockReset()
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: { email:"test@gmail.com",password:"test" } };
  res = { type: type, status: status,send: send};
});

describe.skip('when logging', () => {

  test('should find the corresponding account', async () => {
    await authRepo(User).login(req, res)
    expect(findOne.mock.calls.length).toBe(1);
  })

  test('should respond the user with corresponding token', async () => {
    findOne.mockResolvedValue(req.body);
    const userJson = req.body;
    await authRepo(User).login(req, res)
    expect(res.send).toBeCalledWith({
      user: userJson,
      token: authRepo(User).jwtSignUser(userJson)
    });
  })

  test('should respond with a 200 status code', async () => {
    await authRepo(User).login(req, res)
    expect(res.status).toBeCalledWith(200)
  })

  test("should specify json in the content type header", async () => {
    await authRepo(User).login(req, res)
    expect(res.type).toBeCalledWith('application/json')
  })

  describe("when an error occur", () => {
    test("should respond with a status code of 500", async () => {
      findOne.mockImplementation(() => {
        throw new Error();
      });
      await authRepo(User).login(req, res)
      expect(res.status).toBeCalledWith(500)
    })
  })

})