const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const syncModels = require('../models/model_relationship');
const sequelize = require('../utils/db');

chai.should();
chai.use(chaiHttp);

describe('Conference APIs', () => {
    let request;
    before('setup', async() => {
      
          // Sync the models with the database
          await sequelize.drop();
          await syncModels();
          sequelize.models.Conference.create({
            "name": "AI conference",
            "start_date": "2023-01-21",
            "end_date": "2023-01-22",
            "location": "test location"
        })
    });

    describe('GET /api/conference', () => {
        it('Should return all conferences', (done) => {
            chai.request(app)
            .get("/api/conference")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(1);
                expect(res.body[0].name).to.equal('AI conference');
            done();    
            })
        })
    });

    describe('POST /api/conference', () => {
        const reqPayload = {
            "name": "Web development conference",
            "start_date": "2023-01-20",
            "end_date": "2023-01-23",
            "location": "test location"
        }
        it('Should create conference when all required data is sent', (done) => {
            chai.request(app)
            .post("/api/conference")
            .send(reqPayload)
            .end((err, res) => {
                res.should.have.status(201);
                expect(Object.keys(res.body)).to.deep.equal(Object.keys(reqPayload));
            done();    
            });
        });

        it('Should throw 400 error when required data is not sent', (done) => {
            const badReqPayload = {...reqPayload};
            delete badReqPayload.location
            chai.request(app)
            .post("/api/conference")
            .send(badReqPayload)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.errors).to.deep.equal([ { message: "must have required property 'location'" } ]);
            done();    
            })
        })
    })
});