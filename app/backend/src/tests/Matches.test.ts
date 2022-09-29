import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import { MatchesMock, MatchesMockTrue, MatchesMockFalse } from '../mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Testando a rota /matches', () => {
    before(async () => {
        sinon
          .stub(Match, "findAll")
          .resolves(MatchesMock as unknown as Match[]);
      });
    
      after(()=>{
        (Match.findAll as sinon.SinonStub).restore();
      })

    it('Get Request feito com sucesso para a rota /matches', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/matches');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(MatchesMock);
      });
});

describe('Testando a rota /matches?inProgress=true/false', () => {
    before(async () => {
        sinon
          .stub(Match, "findAll")
          .resolves(MatchesMock as unknown as Match[]);
      });
    
      after(()=>{
        (Match.findAll as sinon.SinonStub).restore();
      })

    it('Get Request feito com sucesso para a rota /matches?inProgress=true', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/matches?inProgress=true');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(MatchesMockTrue);
      });

      it('Get Request feito com sucesso para a rota /matches?inProgress=false', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/matches?inProgress=false');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(MatchesMockFalse);
      });
});