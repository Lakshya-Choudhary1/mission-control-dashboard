import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from '../../app.js'

dotenv.config();


describe('TEST GET /planests',()=>{
     beforeAll(async()=>{
          mongoose.connect(process.env.MONGO_URL)
     })
     afterAll(async () => {
          await mongoose.connection.close();
     });
     test('resonse with 200 success', async() => {
          const response = await request(app)
               .get('/v1/planets')
               .expect('Content-Type',/json/)
               .expect(200)
     })
})