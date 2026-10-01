
import {test,expect} from '@playwright/test'
import { HomePage } from '../src/pages/HomePage'
import { LoginPage } from '../src/pages/LoginPage'

let loginPage:LoginPage
let homePage:HomePage

test.beforeEach(  async ({page})=>
{
   loginPage=new LoginPage(page)
   await loginPage.goToLoginPage()
   await loginPage.doLogin('majnunath.sdet@gmail.com', 'manju@SDET1')
   homePage=new HomePage(page)
})

test('HomePage title validation', async ()=>
{
   let homeTitle=await homePage.getPageTitle()
   console.log(homeTitle);
   expect(homeTitle).toBe('My Account')
})

test('HomePage logout button exist test', async ()=>
{
   expect(await homePage.isLogoutExist()).toBeTruthy()
})

test('HomePage all header names present', async ()=>
{
   let allHeaders=await homePage.getHomePageHeaders()
   console.log(allHeaders);
   expect.soft(allHeaders).toHaveLength(4)
   expect.soft(allHeaders).toEqual(
    [ 'My Account',
      'My Orders',
      'My Affiliate Account',
      'Newsletter'
    ]
   )
})

