
import{test,expect} from'@playwright/test';

let accessToken:string;

let OAUTH_CONFIG=
{
    tokenURL:'https/test.api.amadeus.com/v1/security/oauth2/token',
    clientId:process.env.OAUTH_CLIENT_ID!,
    clientSecret:process.env.OAUTH_CLIENT_SECRET!,
    grantType:process.env.GRANT_TYPE!
}

test.beforeEach('POST -------Generate the access token', async({request})=>
{
    let response=await request.post(OAUTH_CONFIG.tokenURL,{
        form:{
            client_id:OAUTH_CONFIG.clientId,
            client_secret:OAUTH_CONFIG.clientSecret,
            grant_type:OAUTH_CONFIG.grantType
        }
    })

    expect(response.status()).toBe(200);
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    accessToken=jsonResponse.access_token

})

test('GET----------Get location data', async ({request})=>
{
      //https/test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
      let  baseURL='https/test.api.amadeus.com'
      let endPoint='v1/reference-data/locations'

      let queryParams={
        subType:'CITY',
        keyword:'MUC',
        countryCode:'DE'
      }

      let locationResponse=await request.get(`${baseURL}${endPoint}`,{
        headers:
        {
            Authorization:`Bearer ${accessToken}`
        },
        params:queryParams
})

expect(locationResponse.status()).toBe(200)
console.log(await locationResponse.json())

let locationJSON=await locationResponse.json()
console.log(locationJSON.meta.count)
let location1=locationJSON.data[0]
console.log(location1)

})

// Here we are getting the access token first then passing the access token to get the data using get and access the resource from the response
// Here we are storing client id, client secreat and grant type along with url in an object to acces that object and its parameters easily in the get/post methods
