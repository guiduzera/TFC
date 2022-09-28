import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Testando a rota Login', () => {

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        id: 1,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Post Request feito com sucesso para a rota /login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user',
        });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('verificar que nao e possivel realizar a tarefa com o campo email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({
          email: '',
          password: 'secret_user',
        });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('verificar que nao e possivel realizar a tarefa com o campo password vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({
          email: 'user@user.com',
          password: '',
        });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled'});
  });
});

describe('Testando a rota Login com o email incorreto', () => {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(undefined);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('verificar que nao e possivel realizar a tarefa com o campo password incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({
          email: 'juquinha@juca.com',
          password: 'secret_user',
        });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password'});
  });
});

describe('Testando a rota Login com o password incorreto', () => {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        id: 1,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('verificar que nao e possivel realizar a tarefa com o campo email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
        .send({
          email: 'user@user.com',
          password: '123456',
        });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password'});
  });
});
