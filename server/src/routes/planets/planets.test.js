import request from "supertest";
import app from '../../app.js'

describe('TEST GET /planests',()=>{
     test('resonse with 200 success', async() => {
          const response = await request(app)
               .get('/planets')
               .expect('Content-Type',/json/)
               .expect(200)
     })
})