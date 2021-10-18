const makeUser = require("../../../src/models/User")
const authRepo = require("../../../src/controllers/authController")
const crypto = require("crypto")
const config = require("../../../src/config/config")
const salt = config.authentication.cryptoSalt
const jwt = require("jsonwebtoken")

let req = { body: { email:"test@gmail.com", password:"test"} };
const type = jest.fn();
const status = jest.fn();
const send = jest.fn();
let res = { type: type, status: status, send: send };

const where = jest.fn();
const User = makeUser
User.where=where;

const findOne = jest.fn().mockResolvedValue(req.body)
let obj = {findOne: "findOne"}
obj.findOne=findOne;
const findOneResp = JSON.parse(JSON.stringify(req.body))
findOneResp.password = crypto.pbkdf2Sync(findOneResp.password, salt,  
  1000, 64, `sha512`).toString(`hex`);

beforeEach(() => {
  findOne.mockResolvedValue(findOneResp);
  where.mockReturnValue(obj);
  type.mockReset()
  status.mockReset()
  send.mockReset()
  req = { body: { email:"test@gmail.com",password:"test" } };
  res = { type: type, status: status,send: send};
});

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

describe("when logging", () => {

  test("should find the corresponding account", async () => {
    await authRepo(User).login(req, res)
    expect(findOne.mock.calls.length).toBe(1);
  })

  test("should respond the user with corresponding token", async () => {
    await authRepo(User).login(req, res)
    expect(res.send).toBeCalledWith({
      user: findOneResp,
      token: jwtSignUser(findOneResp)
    });
  })

  test("should respond with a 200 status code", async () => {
    await authRepo(User).login(req, res)
    expect(res.status).toBeCalledWith(200)
  })

  test("should specify json in the content type header", async () => {
    await authRepo(User).login(req, res)
    expect(res.type).toBeCalledWith("application/json")
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