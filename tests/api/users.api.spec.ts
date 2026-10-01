
import{test, expect} from '@playwright/test'
import { request } from 'node:http'

let AUTH_TOKEN={authorization:'Bearer d708e6f7d989043609266913f26dd0b32ce1fe260dfff7b404d79bae3d2a1615'}


test('Get user test', async ({request})=>
{
     let response=await request.get('https://gorest.co.in/public/v2/users/8643370',
        {
            headers:AUTH_TOKEN
        })
        //console.log(response)
        let responseBody =await response.json()
        console.log(responseBody)
        console.log(response.status()) //200
        console.log(response.statusText()) //0k
        expect(response.status()).toBe(200)


})

test('Create user test', async ({request})=>
{
    //JS object
    let userData ={

       name:'manjunath',
       email:`automation_${Date.now()}@open.com`,
       gender:'male',
       status:'active'
    }
    
    //JS object to JSON : Serialization playwright will autometically do 
     let response=await request.post('https://gorest.co.in/public/v2/users/',
        {
            headers:AUTH_TOKEN,
            data:userData
        })
        //console.log(response)
        let responseBody =await response.json()
        console.log(responseBody)
        console.log(response.status()) //201
        console.log(response.statusText()) //created

})

test('Update user test', async ({request})=>
{
    //JS object
    let userData ={

         name: "Rep. Lakshminath Pandey Chulbul",
         email: "pandey_rep_lakshminath@wehner-roberts.test",
         gender: "male",
         status: "active"
    }
    
    //JS object to JSON : Serialization playwright will autometically do 
     let response=await request.put('https://gorest.co.in/public/v2/users/8643372',
        {
            headers:AUTH_TOKEN,
            data:userData
        })
        //console.log(response)
        let responseBody =await response.json()
        console.log(responseBody)
        console.log(response.status()) //200
        console.log(response.statusText()) //ok

})

test('Delete user test', async ({request})=>
{
    
    //JS object to JSON : Serialization playwright will autometically do 
     let response=await request.delete('https://gorest.co.in/public/v2/users/8643372',
        {
            headers:AUTH_TOKEN,
            
        })
      
        console.log(response.status()) //204
        console.log(response.statusText()) //No content

})