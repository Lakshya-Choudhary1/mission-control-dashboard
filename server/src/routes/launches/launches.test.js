import request from "supertest";
import app from '../../app.js'
import mongoose from "mongoose";
import  dotenv from 'dotenv'
dotenv.config()
describe('Launches API TEST',()=>{
     
describe('TEST GET /launches',()=>{
     beforeAll(async()=>{
          mongoose.connect(process.env.MONGO_URL)
     })
     afterAll(async () => {
          await mongoose.connection.close();
     });
     
     test('It should response with a 200 success',async ()=>{
          const response =await request(app)
               .get('/v1/launches')
               .expect('Content-Type',/json/)
               .expect(200);

          // expect(response.statusCode).toBe(200);
     })
})

describe('TEST POST /launches',()=>{
     beforeAll(async()=>{
          mongoose.connect(process.env.MONGO_URL)
     })
     afterAll(async () => {
          await mongoose.connection.close();
     });
     const completeLaunchData = {
                    mission: 'jest test27213',
                    rocket:'jest test',
                    launchDate: 'December 12,2015',
                    target:'Kepler-442 b'
          };
     
     const launchDataWithoutDate = {
          mission: 'jest test',
          rocket:'jest test',
          target:'Kepler-442 b'
     }
     test('It should response with a 201 success', async ()=>{
          const response = await request(app)
               .post('/v1/launches')
               .send(completeLaunchData)
               .expect('Content-Type',/text/)
               })

     test('It should response Missing require launch property',async()=>{
          const response = await request(app)
               .post('/v1/launches')
               .send(launchDataWithoutDate)
               .expect('Content-Type',/json/)
               .expect(400);
     })

     test('It should response Invalid launch date', async ()=>{
          const response = await request(app)
               .post('/v1/launches')
               .send({
                    mission: 'jest test',
                    rocket:'jest test',
                    launchDate: 'hii',
                    target:'jests test'
               })
               .expect("Content-Type",/json/)
               .expect(400)
          })
     })
})