
/*import {test, expect} from '@playwright/test';
import {ApiHelper} from '../../src/api/ApiHelper';


import {Ajv} from 'Ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`}  // here we are storing in the key value pair format to pass it in the get/post methods as headers

// set up the ajv
let ajv=new Ajv()

// define JSON schema for the response

let userSchema=
{
  
  "type": "object",
  "properties": {
    "userId": {
      "type": "number"
    },
    "id": {
      "type": "number"
    },
    "title": {
      "type": "string"
    },
    "completed": {
      "type": "boolean"
    }
  },
  "required": [
    "userId",
    "id",
    "title",
    "completed"
  ]
}

// here we define the schema for an array of users, which is useful for validating responses that return multiple user objects.
let userArraySchema=
{
  "type": "array",
  "items": userSchema
}

test('GET------get a user', async({apiHelper})=>
{
      let userData ={

       name:'schema validation API auto',
       email:`automation_${Date.now()}@open.com`,
       gender:'male',
       status:'active'
    }


    //POST create a user
    let createResponse = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER)
    let userId= createResponse.body.id

    //GET get a user
    let getUserResponse = await apiHelper.get('/public/v2/users',AUTH_HEADER)
    expect(getUserResponse.status).toBe(200)

    //schema validation code
   let validate = ajv.compile(userSchema)
   let isSchemaValid=validate(getUserResponse.body)

   if(!isSchemaValid)
   {
    console.log('Schema errors :',validate.errors)
   }
   
   expect(isSchemaValid).toBeTruthy()   

})

test('GET------get all users', async({apiHelper})=>
{
    
    //GET get all users
    let getUsersResponse = await apiHelper.get('/public/v2/users',AUTH_HEADER)
    expect(getUsersResponse.status).toBe(200)

    //schema validation code
   let validate = ajv.compile(userArraySchema)
   let isSchemaValid=validate(getUsersResponse.body)

   if(!isSchemaValid)
   {
    console.log('Schema errors :',validate.errors)
   }
   
   expect(isSchemaValid).toBeTruthy()   

})

*/