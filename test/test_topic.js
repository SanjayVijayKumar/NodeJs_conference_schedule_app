const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const syncModels = require('../models/model_relationship');
const sequelize = require('../utils/db');

chai.should();
chai.use(chaiHttp);

describe('Topic APIs', () => {
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
        });
          sequelize.models.Topic.create({
            "name": "topic",
            "description": "test topic",
            "conferenceId": 1
        });
    });

    describe('GET /api/topic', () => {
        it('Should return all topics', (done) => {
            chai.request(app)
            .get("/api/topic")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(1);
                expect(res.body[0].name).to.equal('topic');
            done();    
            })
        })
    });

    describe('POST /api/topic', () => {
        const reqPayload = {
            "name": "topic 2",
            "description": "test topic 2",
            "conferenceId": 1
        }
        it('Should create topic when all required data is sent', (done) => {
            chai.request(app)
            .post("/api/topic")
            .send(reqPayload)
            .end((err, res) => {
                res.should.have.status(201);
            done();    
            });
        });

        it('Should throw 400 error when required data is not sent', (done) => {
            const badReqPayload = {...reqPayload};
            delete badReqPayload.name;
            chai.request(app)
            .post("/api/topic")
            .send(badReqPayload)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.errors).to.deep.equal([ { message: "must have required property 'name'" } ]);
            done();    
            })
        })
    })
});