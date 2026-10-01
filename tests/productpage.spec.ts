import {test,expect} from '../src/fixtures/pagefixtures'

test.beforeEach(  async ({loginPage})=>
{
   
   await loginPage.goToLoginPage()
   await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)
  
})

test('Company logo exists on the product page', async({basePage})=>
{
   expect(await basePage.isCartButtonVisible()).toBeTruthy()
})

test('Footers exists on the product page', async({basePage})=>
{
   expect(await basePage.getPageFooterCount()).toBe(16)
})


test('Verify the product images count', async ({homePage,searchResultsPage,productInfoPage})=>
{
   await homePage.doSearch('macbook')
   await searchResultsPage.selectProduct('MacBook Pro')
   let imageCount=await productInfoPage.getProductImagesCount()
   console.log("Total images count", imageCount);
   expect(imageCount).toBe(4)

})

test('Verify the product information/data', async ({homePage,searchResultsPage,productInfoPage})=>
{
   await homePage.doSearch('macbook')
   await searchResultsPage.selectProduct('MacBook Pro')
   let actualProductInfoMap=await productInfoPage.getProductinfo()
   console.log("Actaul Product details ", actualProductInfoMap);
   expect.soft(actualProductInfoMap.get('Product header')).toBe('MacBook Pro')
   expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple')
   expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18')
   expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800')
   expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock')
   expect.soft(actualProductInfoMap.get('Product Price')).toBe('$2,000.00')
   expect.soft(actualProductInfoMap.get('EX Tax Price')).toBe(' $2,000.00')

})
