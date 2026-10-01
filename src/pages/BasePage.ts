import { Page,Locator } from "@playwright/test"

export class BasePage
{
   
    protected readonly page:Page
    // common locators across all pages 
    protected readonly logo:Locator;
    protected readonly searchBox:Locator;
    protected readonly searchIcon:Locator;
    protected readonly footerLinks:Locator;
    protected readonly currency:Locator;
    protected readonly cartButton:Locator;

     constructor(page:Page)
     {
        this.page=page
        this.logo=page.getByAltText('naveenopencart')
        this.searchBox=page.getByRole('textbox', { name: 'Search' })
        this.searchIcon=page.locator('.fa.fa-search')
        this.footerLinks=page.locator('footer a')
        this.currency=page.getByText('Currency', { exact: true })
        this.cartButton=page.getByRole('button', { name: '0 item(s) - $0.00' })

     }

     async isLogoVisible():Promise<boolean>
     {
      return this.logo.isVisible()
     }
     
      async isSearchBoxVisible():Promise<boolean>
     {
      return this.searchBox.isVisible()
     }
     
      async isSearchIconVisible():Promise<boolean>
     {
      return this.searchIcon.isVisible()
     }
    
        async getPageFooterCount():Promise<number>
     {
      await this.footerLinks.first().waitFor({state:'visible'})
      return this.footerLinks.count()
     }

       async getPageFooters():Promise<string[]>
     {
          return this.footerLinks.allInnerTexts()
     }

     async isCurrencyVisible():Promise<boolean>
     {
      return this.currency.isVisible()
     }

      async isCartButtonVisible():Promise<boolean>
     {
      return this.cartButton.isVisible()
     }

     // Below are the page level generic methods 

     async getPageTitle():Promise<string>
     {
      return await this.page.title()
     }

     getCurrentTitle():string
     {
        return this.page.url()   // here no async and no await 
     }
    
     async waitForPageLoad():Promise<void>
     {
      await this.page.waitForLoadState('load')
     }
    
     // Why we used name: stirng here as a data type?
     async takeScreenshot(name:string)
     {
      await this.page.screenshot({fullPage: true,path:'scrrenshot.png'})
     }

}

// common locators/ functinaolities / actions 


