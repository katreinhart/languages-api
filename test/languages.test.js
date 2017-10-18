const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-http'))
const app = require('../app')

describe('Languages API', function() {
  describe('POST /languages', function() {
    it('should add a new language', function(done) {
      const language = {
        name: "Javascript",
        use: "Front-end and server-side",
        createdBy: "Brendan Eich",
        created: "1998",
        basedOn: "Java, Scheme",
        categories: ["functional", "object-oriented"],
        rank: 1
      }
      chai.request(app)
        .post('/languages')
        .send(language)
        .end((req, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.name).to.equal(language.name)
          expect(res.body.data.use).to.equal(language.use)
          expect(res.body.data.id).to.be.ok
          done()
        })
    })
    it('should not add a new language if data is missing', function(done) {
      const language = {
        name: "Java"
      }
      chai.request(app)
        .post('/languages')
        .send(language)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.ok
          expect(res.body.error.message).to.equal('There were errors')
          expect(res.body.error.errors.length).to.be.greaterThan(0)
          done()
        })
    })
  })

  describe('GET /languages', function() {
    it('should get all languages', function(done) {
      chai.request(app)
        .get('/languages')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  describe('GET /languages/:id', function() {
    it('should return the requested language', function(done) {
      chai.request(app)
        .get('/languages')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          const language = res.body.data[0]
          const id = language.id
          chai.request(app)
            .get(`/languages/${id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.name).to.equal(language.name)
              expect(res.body.data.use).to.equal(language.use)
              expect(res.body.data.createdBy).to.equal(language.createdBy)
              done()
            })
        })
    })
  })
})