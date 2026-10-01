

import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper'
import { ExcelHelper } from '../src/utils/ExcelHelper'
import { JsonHelper } from '../src/utils/JsonHelper'


test.beforeEach(  async ({loginPage})=>
{
   await loginPage.goToLoginPage()

})

test('login page title test', async ({loginPage})=>
{
  
   let pageTitle=await loginPage.getPageTitle()
   console.log(pageTitle);
   expect(pageTitle).toBe('Account Login')

})

test('forgot password link exist test', async ({loginPage})=>
{
   expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy() 
   
})

test('User is able to login to app test', async ({loginPage,homePage})=>
{
   await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)
   expect.soft(await homePage.isLogoutExist()).toBeTruthy()
   expect.soft(await homePage.getPageTitle).toBe('My Account')
   // expect(await homePage.getHomePageTitle()).toBe('My Account')
   // expect(await homePage.isLogoutExist()).toBeTruthy();
})

//DD-1 with Fixtures 
// first of all it is running in a sequential mode not in paraller mode 
// And only 1 test is running with test data one by 1 using testData from fixtures
// In the report we are getting lenghty steps 
// So that's why we avoid maintaining the testData inside the fixture file 

test('Login to app with wrong credentials with data driven test', async ({loginPage,testData})=>
{
   for(let row of testData)
   {
      await loginPage.doLogin(row.username,row.password)
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
   }
})

//DD-2 without the fixtures, parallel mode, read csv data directly and loop the test method row wise
 let testData=CsvHelper.readCsv('src/data/loginData.csv');

 for (let row of testData)
 {
       test(`Invalid login test with  - ${row.username} -${row.password}`, async ({loginPage})=>
      {
         await loginPage.doLogin(row.username,row.password)
         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
      })

 }


 let loginTestData=ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx','Sheet1');

 for (let row of loginTestData)
 {
       test(`Invalid login test with Excel data  - ${row.username} -${row.password}`, async ({loginPage})=>
      {
         await loginPage.doLogin(row.username,row.password)
         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
      })

 }

 let loginJSONData=JsonHelper.readJson('src/data/logindata.json')

 for (let row of loginJSONData)
 {
       test(`Invalid login test with Json data  - ${row.username} -${row.password}`, async ({loginPage})=>
      {
         await loginPage.doLogin(row.username,row.password)
         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy()
      })

 }

 // common tests

test('Company logo exists on the product page', async({basePage})=>
{
   expect(await basePage.isCartButtonVisible()).toBeTruthy()
})

test('Footers exists on the product page', async({basePage})=>
{
   expect(await basePage.getPageFooterCount()).toBe(16)
})