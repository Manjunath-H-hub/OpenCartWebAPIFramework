
import {test,expect} from '../src/fixtures/pagefixtures'


test.beforeEach(  async ({loginPage})=>
{
   
   await loginPage.goToLoginPage()
   await loginPage.doLogin('majnunath.sdet@gmail.com', 'manju@SDET1')
  
})

test('HomePage title validation', async ({homePage})=>
{
   let homeTitle=await homePage.getPageTitle()
   console.log(homeTitle);
   expect(homeTitle).toBe('My Account')
})

test('HomePage logout button exist test', async ({homePage})=>
{
   expect(await homePage.isLogoutExist()).toBeTruthy()
})

test('HomePage all header names present', async ({homePage})=>
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

// common tests

test('Company logo exists on the product page', async({basePage})=>
{
   expect(await basePage.isCartButtonVisible()).toBeTruthy()
})

test('Footers exists on the product page', async({basePage})=>
{
   expect(await basePage.getPageFooterCount()).toBe(16)
})

