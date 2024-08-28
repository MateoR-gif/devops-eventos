const request = require('supertest');
const express = require("express");
const userController = require("../controllers/userController");
const userDAO = require('../dao/userDao');

const app = express();
app.use(express.json());

//rutas de pruebas
app.get("/users", userController.getUsers);

//Mock del DAO
jest.mock("../dao/userDao");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users", async () => {
    const mockUsers = [
      { name: "John Doe", email: "john@example.com", password: "123456" },
      { name: "Jane Doe", email: "jane@example.com", password: "654321" },
    ];
    userDAO.getAll.mockResolvedValue(mockUsers);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});
