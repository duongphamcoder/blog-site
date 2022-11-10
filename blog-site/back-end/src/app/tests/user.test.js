const request = require("supertest");
const app = require("../../index");

describe("POST /users/signin", () => {
  describe("when the username or password missing", () => {
    test("Should status code 400 when missing password or username", async () => {
      const response = await request(app)
        .post("/users/signin")
        .send({ username: "", password: "" })
        .set("Accept", "application/json");
      expect(response.status).toEqual(400);
    });
  });
});
