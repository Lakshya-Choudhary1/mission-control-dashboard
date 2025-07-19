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
     test('It should response with a 200 success',async ()=>{
          const response =await request(app)
               .get('/launches')
               .expect('Content-Type',/json/)
               .expect(200);

          // expect(response.statusCode).toBe(200);
     })
})

describe('TEST POST /launches',()=>{
     const completeLaunchData = {
                    mission: 'jest test',
                    rocket:'jest test',
                    launchDate: 'December 12,2015',
                    target:'jests test'
          };
     
     const launchDataWithoutDate = {
          mission: 'jest test',
          rocket:'jest test',
          target:'jests test'
     }
     test('It should response with a 201 success', async ()=>{
          const response = await request(app)
               .post('/launches')
               .send(completeLaunchData)
               .expect('Content-Type',/json/)
               .expect(201)
          const requestDate = new Date(completeLaunchData.launchDate).valueOf();
          const responseDate = new Date(response.body.launchDate).valueOf();
          expect(responseDate).toBe(requestDate);
          expect(response.body).toMatchObject(launchDataWithoutDate);
     })

     test('It should response Missing require launch property',async()=>{
          const response = await request(app)
               .post('/launches')
               .send(launchDataWithoutDate)
               .expect('Content-Type',/json/)
               .expect(400);
     })

     test('It should response Invalid launch date', async ()=>{
          const response = await request(app)
               .post('/launches')
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