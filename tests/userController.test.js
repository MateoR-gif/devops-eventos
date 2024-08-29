const request = require("supertest");
const express = require("express");
const userController = require("../controllers/userController");
const userDAO = require("../dao/userDao");

const app = express();
app.use(express.json());

//rutas de pruebas
app.get("/users", userController.getUsers)
app.post("/users", userController.createUser)
app.put("/users/:id", userController.updateUser)
app.delete('/users/:id', userController.deleteUser);

//Mock del DAO
jest.mock("../dao/userDao");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const mockUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    };
    userDAO.create.mockResolvedValue(mockUser);

    const response = await request(app).post("/users").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
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

  it('should update a user by ID', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', password: '123456' };
    userDAO.update.mockResolvedValue(mockUser);

    const response = await request(app).put('/users/1').send({ name: 'John Updated' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should delete a user by ID', async () => {
    userDAO.delete.mockResolvedValue(true);

    const response = await request(app).delete('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Usuario eliminado' });
  });
});
