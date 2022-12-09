require("dotenv").config();
const axios = require("axios");
const axiosRequest = require("./axios.config");
const { GET, POST, PATCH, DELETE } = require("./method.constans");

describe("[GET]", () => {
  const endpoint = `${process.env.END_POINT}/posts`;
  describe.skip("when get all posts", () => {
    it("should return status 200", async () => {
      const res = await axiosRequest(endpoint, GET);
      expect(res.status).toEqual(200);
    });

    it("should return status 200 and array list posts", async () => {
      const res = await axiosRequest(endpoint, GET);
      expect(res.status).toEqual(200);
      expect(res.data).toHaveProperty("posts");
    });
  });

  describe("when get detail post", () => {
    const id = 1;
    const url = `${endpoint}/${id}`;
    console.log(url);
    it("should return status 200", async () => {
      const res = await axiosRequest(url, GET);
      expect(res.status).toEqual(200);
    });

    it("should return status 200 and data when get detail post", async () => {
      const res = await axiosRequest(url, GET);
      expect(res.status).toEqual(200);
      expect(res.data).toMatchObject({
        post: {
          id: 1,
          title: "title 1",
          content: "content",
        },
      });
    });
  });
});
