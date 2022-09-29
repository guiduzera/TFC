import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Testando a rota /teams', () => {
    before(async () => {
        sinon
          .stub(Team, "findAll")
          .resolves([{
            id: 1,
            teamName: 'ABC serie B',
          }] as Team[]);
      });
    
      after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
      })

    it('Get Request feito com sucesso para a rota /teams', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/teams');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal([{
            id: 1,
            teamName: 'ABC serie B',
          }]);
      });
});

describe('Testando a rota /teams/:id', () => {
    before(async () => {
        sinon
          .stub(Team, "findByPk")
          .resolves({
            id: 1,
            teamName: 'ABC serie B',
          } as Team);
      });
    
      after(()=>{
        (Team.findByPk as sinon.SinonStub).restore();
      })

    it('Get Request feito com sucesso para a rota /teams/:id', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/teams/1');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal({
            id: 1,
            teamName: 'ABC serie B',
          });
      });
});