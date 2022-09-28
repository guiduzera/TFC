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
});
