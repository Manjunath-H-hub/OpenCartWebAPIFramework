
import {test,expect} from '../../src/fixtures/apifixtures'

const token=process.env.API_TOKEN
let AUTH_HEADERS={authorization:`Bearer ${token}`}

let userId:number

// due to dependency (userid) we are running in the serial mode
test.describe.serial('Running e2e go rest apis', ()=>
{
//GET test
test('GET API ---- get all users', async({apiHelper})=>
{    
    let response=await apiHelper.get('/public/v2/users', AUTH_HEADERS)
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)

})


//post
test('POST API ---- create a user', async({apiHelper})=>
{    
     let userData ={

       name:'manjunath API auto',
       email:`automation_${Date.now()}@open.com`,
       gender:'male',
       status:'active'
    }

    let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADERS)
    expect(response.status).toBe(201)
    expect(response.body.name).toBe(userData.name)
    userId=response.body.id
    console.log('Created userId :',userId); //8644481
    
})

test('PUT API ---- update a user', async({apiHelper})=>
{    
     let userUpdatedData ={

       name:'manjunath API auto updated',
       email:`automation_${Date.now()}@open.com`,
       gender:'male',
       status:'inactive'
    }

    let response=await apiHelper.put(`/public/v2/users${userId}`,userUpdatedData,AUTH_HEADERS)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe(userUpdatedData.name)
    expect(response.body.status).toBe(userUpdatedData.status)
    
    
})

test('Delete API ---- Deleting a user', async({apiHelper})=>
{    
    let response=await apiHelper.delete(`/public/v2/users${userId}`, AUTH_HEADERS)
    expect(response.status).toBe(204)
    

})
})
