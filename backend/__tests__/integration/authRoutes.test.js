const request = require('supertest');
const app = require('../../src/server'); // Caminho correto

describe('Auth Routes', () => {
  it('deve registrar um usuário com sucesso', async () => {
    const res = await request(app)  
      .post('/api/auth/register')
      .send({ name: "John", email: "john@email.com", password: "123456", role: "user" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuário registrado com sucesso");
  });

  it('deve retornar erro ao registrar um usuário com email duplicado', async () => {
    await request(app).post('/api/auth/register').send({
      name: "John", email: "john@email.com", password: "123456", role: "user"
    });

    const res = await request(app).post('/api/auth/register').send({
      name: "John", email: "john@email.com", password: "123456", role: "user"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Email já está em uso");
  });
});
