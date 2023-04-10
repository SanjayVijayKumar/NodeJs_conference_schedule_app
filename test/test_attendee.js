const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const syncModels = require('../models/model_relationship');
const sequelize = require('../utils/db');

chai.should();
chai.use(chaiHttp);

describe('Attendee APIs', () => {
    let request;
    before('setup', async() => {
      
          // Sync the models with the database
          await sequelize.drop();
          await syncModels();
          sequelize.models.Attendee.create({
            "first_name": "attendee",
            "last_name": "lastName",
            "email": "test@test.com"
        });
    });

    describe('GET /api/attendee', () => {
        it('Should return all attendees', (done) => {
            chai.request(app)
            .get("/api/attendee")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body.length).to.equal(1);
                expect(res.body[0].first_name).to.equal('attendee');
            done();    
            })
        })
    });

    describe('POST /api/attendee', () => {
        const reqPayload = {
            "first_name": "attendee",
            "last_name": "lastName",
            "email": "test2@test.com"
        }
        it('Should create attendee when all required data is sent', (done) => {
            chai.request(app)
            .post("/api/attendee")
            .send(reqPayload)
            .end((err, res) => {
                res.should.have.status(201);
                expect(Object.keys(res.body)).to.deep.equal(Object.keys(reqPayload));
            done();    
            });
        });

        it('Should throw 400 error when required data is not sent', (done) => {
            const badReqPayload = {...reqPayload};
            delete badReqPayload.email
            chai.request(app)
            .post("/api/attendee")
            .send(badReqPayload)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.body.errors).to.deep.equal([ { message: "must have required property 'email'" } ]);
            done();    
            })
        })
    })
});