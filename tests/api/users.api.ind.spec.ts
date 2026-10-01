import {test,expect} from '../../src/fixtures/apifixtures'
import { ApiHelper } from '../../src/api/ApiHelper'
const token=process.env.API_TOKEN
let AUTH_HEADERS={authorization:`Bearer ${token}`}


// helper -- generic function -- create a fresh user

async function createUser(apiHelper:any)
{
    let userData ={

       name:'manjunath API',
       email:`automation_${Date.now()}@open.com`,
       gender:'male',
       status:'active'
    }

    let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADERS)
    expect(response.status).toBe(201)
    return response.body

    }

    //test 1: create a user test+verify AAA
    //Post --> userId--->GET/userId--->Verify

    test('POST -- create a user', async ({apiHelper})=>
    {
         //create a user
       let userResponse=  await createUser(apiHelper)

       //get the user
       let response=await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADERS)
       expect(response.status).toBe(200)
       expect(response.body.name).toBe('manjunath API')
    })
    
    //test 2: update a user test+verify AAA
    //Post --> userId--->PUT--->GET/userId--->Verify

    test('PUT -- update a user', async ({apiHelper})=>
    {
       
         //create a user: POST
       let userResponse=  await createUser(apiHelper)
       let userUpdatedData ={
       name:'manjunath API auto updated',
       status:'inactive'
        }

       //update the user
       let response=await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData, AUTH_HEADERS)
       expect(response.status).toBe(200)
       expect(response.body.name).toBe(userUpdatedData.name)
       expect(response.body.status).toBe(userUpdatedData.status)

       //get the user
       let getResponse=await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADERS)
       expect(getResponse.status).toBe(200)
       expect(getResponse.body.name).toBe(userUpdatedData.name)
       expect(getResponse.body.status).toBe(userUpdatedData.status)

    })
    
     //test 3: Delete a user test+verify AAA
    //Post --> userId--->Delete(204)--->GET/userId--->Verify(404)

    test('Delete -- Delete a user', async ({apiHelper})=>
    {
       
         //create a user: POST
       let userResponse=  await createUser(apiHelper)
       
       //Delete the user
       let response=await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADERS)
       expect(response.status).toBe(204)
      
       //get the user
       let getResponse=await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADERS)
       expect(getResponse.status).toBe(404)
       expect(getResponse.body.message).toBe('Resource not found')
      
    })
    
    
