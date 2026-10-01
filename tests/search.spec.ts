import {test,expect} from '../src/fixtures/pagefixtures'
import { SearchResultsPage } from '../src/pages/SearchResultsPage'
import { CsvHelper } from '../src/utils/CsvHelper'


test.beforeEach(  async ({loginPage})=>
{
   
   await loginPage.goToLoginPage()
   await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)
  
})

//Data provider
const productData=CsvHelper.readCsv('src/data/product.csv')

for(const row of productData)
{
    test(`Verify search results count -${row.searchkey}  -${row.productname}`, async ({homePage,searchResultsPage})=>
{
   await homePage.doSearch(row.searchkey)
   expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount))
   // Here we parsed assertion result into number from string

})

}

for (const row of productData)
{
  test(`Verify user is able to land on product page -${row.searchkey}  -${row.productname}`, async ({homePage,searchResultsPage,page})=>
{
   await homePage.doSearch(row.searchkey)
   await searchResultsPage.selectProduct(row.productname)
   expect(await page.title()).toBe(row.productname)
})

}

