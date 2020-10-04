const { assert, expect } = require('chai')
const request = require('supertest')
const app = require('../app')

describe('create-plan without fails', () => {
  it('responds with json', done => {
    let data = {
      name: "Joseph Ramirez",
      email: "jarm06@gmail.com",
      totalIngress: 4000,
      sector: 1,
      workYears: 99,
      amount: 1260,
      frecuency: 2
    }
  
    request(app)
      .post('/api/create-plan')
      .type('json')
      .send(data)
      .expect(201)
      .then(resp => {
        expect(resp.body).to.have.property('amount').equal(1260)
        expect(resp.body).to.have.property('frecuency').eq('biweekly')
        done()
      })
      .catch(err => done(err))
  })
})

describe('pay-plan without fails', () => {
  it('responds with ', done => {
    let data = {
      planId: "6bfb6b52-78", // plan amount is 0
      amount: 1700
    }

    request(app)
      .post('/api/pay-plan')
      .type('json')
      .send(data)
      .expect(200)
      .then(resp => {
        expect(resp.body).to.have.property('msg').eq('Plan cancelled')
        assert(resp.body.frecuency)
        done()
      })
      .catch(err => done(err))
  })
})

// TODO Errors

describe('Errors to generate a new plan', () => {
  it('validate field amount, because is required -> CREATE PLAN', done => {
    let data = {
      name: "Joseph Ramirez",
      email: "jarm06@gmail.com",
      totalIngress: 4000,
      sector: 1,
      workYears: 99,
      // amount: 1260,
      frecuency: 2
    }

    request(app)
      .post('/api/create-plan')
      .type('json')
      .send(data)
      .expect(400)
      .then(resp => {
        expect(resp.body.errors).to.have.be.a('array')
        done()
      })
      .catch(err => done(err))
  })
})

describe('Errors to generate when plan will be payed', () => {
  it('validate field amount, because is required -> PAY PLAN', done => {
    let data = {
      // amount: 1260,
      planId: '6bfb6b52-78'
    }

    request(app)
      .post('/api/pay-plan')
      .type('json')
      .send(data)
      .expect(400)
      .then(resp => {
        expect(resp.body.errors).to.have.be.a('array')
        done()
      })
      .catch(err => done(err))
  })
})

