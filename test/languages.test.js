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

  describe('PUT /languages/:id', function() {
    it('should update the given language if all data is present', function(done) {
      chai.request(app)
        .get('/languages')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          const language = res.body.data[0]
          const id = language.id
          const updatedData = {
            ...language,
            use: ["Scripting", "Web front end", "Back-end server"]
          }
          chai.request(app)
            .put(`/languages/${id}`)
            .send(updatedData)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.use).to.deep.equal(updatedData.use)
              done()
            })
        })
    })
    it('should return errors if data is missing', function(done) {
      chai.request(app)
      .get('/languages')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')
        const language = res.body.data[0]
        const id = language.id
        const updatedData = {
          name: "JavaScript"
        }
        chai.request(app)
          .put(`/languages/${id}`)
          .send(updatedData)
          .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.errors).to.be.an('array')
            expect(res.body.error.errors).to.include('Use is required')
            done()
          })
      })
    })
  })

  describe('DELETE /languages/:id', function() {
    it('should delete the given resource if a matching one is found', function(done) {
      chai.request(app)
        .get('/languages')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          const language = res.body.data[0]
          const numLanguages = res.body.data.length
          const id = language.id
          chai.request(app)
            .delete(`/languages/${id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.name).to.equal(language.name)
              expect(res.body.data.use).to.equal(language.use)
              chai.request(app)
                .get(`/languages`)
                .end((err, res) => {
                  expect(res.status).to.equal(200)
                  expect(res.body.data).to.be.an('array')
                  expect(res.body.data.length).to.equal(numLanguages - 1)
                  done()
                })
            })
          })
      })
      it('should return an error if there is no matching ID', function(done) {
        chai.request(app)
          .delete('/languages/999')
          .end((req, res) => {
            expect(res.status).to.equal(404)
            expect(res.error.message).to.be.ok
            done()
          })
      })
  })
})