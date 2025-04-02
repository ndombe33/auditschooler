const { register } = require('../../src/controllers/authController');
const User = require('../src/models/user'); // Ajustado para minúsculas

jest.mock('../../src/models/user'); // Simula a model User

describe('Auth Controller - Register', () => {
  it('deve criar um novo usuário', async () => {
    const req = { body: { name: "Test", email: "test@email.com", password: "123456", role: "user" }};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: 1, ...req.body });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: "Usuário registrado com sucesso",
      user: expect.any(Object),
    }));
  });

  it('deve retornar erro se o email já estiver cadastrado', async () => {
    const req = { body: { email: "test@email.com" }};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findOne.mockResolvedValue({ email: "test@email.com" });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email já está em uso" });
  });
});
