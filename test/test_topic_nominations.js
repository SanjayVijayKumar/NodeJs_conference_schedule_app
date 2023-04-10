const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const syncModels = require('../models/model_relationship');
const sequelize = require('../utils/db');

chai.should();
chai.use(chaiHttp);

describe('Topic Nomination APIs', () => {
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

        sequelize.models.Speaker.create({
            "first_name": "speaker",
            "last_name": "lastName",
            "email": "test@test.com"
        });
    });

    describe('POST /api/topic_nominations', () => {
        const reqPayload = {
            "topicId": 1,
            "speakerId": 1
        }
        it('Should create topic nomination when all required data is sent', (done) => {
            chai.request(app)
            .post("/api/topic_nominations")
            .send(reqPayload)
            .end((err, res) => {
                res.should.have.status(201);
            done();    
            });
        });

        it('Should throw 400 error when required data is not sent', (done) => {
            const badReqPayload = {...reqPayload};
            delete badReqPayload.speakerId;
            chai.request(app)
            .post("/api/topic_nominations")
            .send(badReqPayload)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.errors).to.deep.equal([ { message: "must have required property 'speakerId'" } ]);
            done();    
            })
        })
    })
});