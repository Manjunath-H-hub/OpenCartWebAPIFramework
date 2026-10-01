
import {test, expect} from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage'
import { HomePage } from '../src/pages/HomePage'

let loginPage:LoginPage
let homePage:HomePage

test.beforeEach(  async ({page})=>
{
   loginPage=new LoginPage(page)
   await loginPage.goToLoginPage()
   homePage=new HomePage(page)

})

test('login page title test', async ({page})=>
{
  
   let pageTitle=await loginPage.getPageTitle()
   console.log(pageTitle);
   expect(pageTitle).toBe('Account Login')

})

test('forgot password link exist test', async ({page})=>
{
   expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy() 
   
})

test('User is able to login to app test', async ({page})=>
{
   await loginPage.doLogin('jane.moore442@nal.com', 'VJ{jnLG*h#nI')
   expect.soft(await homePage.isLogoutExist()).toBeTruthy()
   expect.soft(await homePage.getPageTitle()).toBe('My Account')
})
