const axiosRequest = require("./axios.config");
const { POST } = require("./method.constans");

describe("POST /users/signin", () => {
  const endpoint = "http://localhost:3000/users/signin";

  describe("given username and passowrd ", () => {
    const body = { username: "user2", password: "123456" };

    it("should response status code 200", async () => {
      const res = await axiosRequest(endpoint, POST, body);
      expect(res.status).toEqual(200);
    });

    it("should response object contain token", async () => {
      const res = await axiosRequest(endpoint, POST, body);
      expect(res.status).toEqual(200);
      expect(res.data).toHaveProperty("token");
    });
  });

  describe("when username or password is missing", () => {
    // should response status 400 when missing username or password
    it("should response status 400 when missing username or password", async () => {
      const res = await axiosRequest(endpoint, POST, {
        username: "",
        password: "",
      });
      expect(res.status).toEqual(400);
    });

    // should response object contain error message when missing username or password
    it("should response object contain error message when missing username or password", async () => {
      const res = await axiosRequest(endpoint, POST, {
        username: "",
        password: "",
      });
      expect(res.status).toEqual(400);
      expect(res.data).toMatchObject({
        statusCode: 400,
        errors: {
          message: "Username or password is required",
        },
      });
    });

    it("should response object contain error message when username or password is not match", async () => {
      const res = await axiosRequest(endpoint, POST, {
        username: "user2",
        password: "123321",
      });
      expect(res.status).toEqual(400);
      expect(res.data).toMatchObject({
        statusCode: 400,
        errors: {
          message: "Username or password is not matching",
        },
      });
    });
  });
});

describe("POST users/signup", () => {
  const endpoint = "http://localhost:3000/users/signup";
  const max = 1000;
  const min = 10;

  describe("when data field is invalid", () => {
    // should response status code 400 when data field is invalid
    it("should response status code 400 when data field is invalid", async () => {
      const res = await axiosRequest(endpoint, POST, {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "usergmail@.com",
        address: "12344444444",
        phoneNumber: "ss6789",
      });
      expect(res.status).toEqual(400);
    });

    it("should response status code 400 and error message when email is invalid", async () => {
      const res = await axiosRequest(endpoint, POST, {
        firstName: "Jonh",
        lastName: "Doe",
        username: `user${Math.random() * (max - min) + min}`,
        password: "123456",
        email: "usergmail.com",
        address: "Da Nang",
        phoneNumber: "0123456789",
      });
      expect(res.status).toEqual(400);
      expect(res.data).toMatchObject({
        statusCode: 400,
        errors: {
          email: "Email is invalid",
        },
      });
    });

    it("should response status code 400 and error message when username is exists", async () => {
      const res = await axiosRequest(endpoint, POST, {
        firstName: "Jonh",
        lastName: "Doe",
        username: "user1",
        password: "123456",
        email: "user@gmail.com",
        address: "Da Nang",
        phoneNumber: "0123456789",
      });
      expect(res.status).toEqual(400);
      expect(res.data).toMatchObject({
        statusCode: 400,
        errors: {
          username: "Username are already in use",
        },
      });
    });

    it("should response status code 400 and error message when format field is invalid", async () => {
      const res = await axiosRequest(endpoint, POST, {
        firstName: "Jonh1",
        lastName: "Doe1",
        username: `user${Math.random() * (max - min) + min}`,
        password: "123456",
        email: "user@gmail.com",
        address: "Da Nang",
        phoneNumber: "01aaaaaa6789",
      });
      expect(res.status).toEqual(400);
      expect(res.data).toMatchObject({
        statusCode: 400,
        errors: {
          firstName: "First name only contain letters",
          lastName: "Last name only contain letters",
          phoneNumber: "Phone number must be number",
        },
      });
    });
  });

  describe("when data field is valid", function () {
    const body = {
      firstName: "Jonh",
      lastName: "Doe",
      username: `user${Math.random() * (max - min) + min}`,
      password: "123456",
      email: "user@gmail.com",
      address: "Da Nang",
      phoneNumber: "0123456789",
    };

    it("should response status code 200 when data field is valid", async () => {
      const res = await axiosRequest(endpoint, POST, body);
      expect(res.status).toEqual(200);
    });
  });
});
