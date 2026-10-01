import {test as baseTest} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { CsvHelper } from '../utils/CsvHelper'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductInfoPage } from '../pages/ProductInfoPage'
import { BasePage } from '../pages/BasePage'

//define types for page fixtures 
// playwright "test" has only 3-4 in built fixtures to create our own fixtures we are using as baseTest
type pageFixtures=
{   
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage,
    testData:Record<string,string>[],
    searchResultsPage:SearchResultsPage
    productInfoPage:ProductInfoPage
}

//extend playwright base test

export let test=baseTest.extend<pageFixtures>({

    basePage: async ({page}, use) =>
    {
       let basePage=new BasePage(page);
       await use(basePage);
    },

    loginPage: async ({page}, use) =>
    {
       let loginPage=new LoginPage(page);
       await use(loginPage);
    },

     homePage: async ({page}, use) =>
    {
       let homePage=new HomePage(page);
       await use(homePage);
    },
    
     searchResultsPage: async ({page}, use) =>
    {
       let searchResultsPage=new SearchResultsPage(page);
       await use(searchResultsPage);
    },
    
     productInfoPage: async ({page}, use) =>
    {
       let productInfoPage=new ProductInfoPage(page);
       await use(productInfoPage);
    },
    
      testData: async ({}, use) =>
    {
       let testData=CsvHelper.readCsv('src/data/loginData.csv');
       await use(testData);
    }

})

export {expect} from '@playwright/test'
//here we are exporting because in the test file we can import "test" and "expect" from this fixtures file itself avoiding from playwright/test module to avoid confusion 

