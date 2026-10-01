
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage"


export class HomePage extends BasePage
{

   // private locators
   
   private readonly logoutLink:Locator;
   private readonly headers:Locator;

 

   //constrictor of the class to initialize the locators 
   constructor(page:Page)  
   {
       super(page)
       this.logoutLink=page.getByRole('link', { name: 'Logout'});
       this.headers=page.getByRole('heading', { level: 2 });  
       // important becuase we are not mentioning any specific name of headers here capturing all with h2 tag
    
      
   } 

   //public page actions(methods)/behaviours

  async isLogoutExist():Promise<boolean>
  {
     return await this.logoutLink.isVisible()
  }
  
  async getHomePageHeaders():Promise<string[]>
  {
    return await this.headers.allInnerTexts()
  }
  
  async doSearch(searchkey:string):Promise<void>
  {
    console.log(`searchkey: ${searchkey}`);
    await this.searchBox.fill(searchkey)
    await this.searchIcon.click()

  }

}