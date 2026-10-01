
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage
{
    private readonly header:Locator
    private readonly productImages:Locator
    private readonly productMetaData:Locator
    private readonly productPricing:Locator
    private map:Map<string,string | number>  //  1st impo

   constructor(page:Page)
   {
    super(page)

    this.header=page.getByRole('heading', {  level: 1 }) // impo
    this.productImages=page.locator('div#content li img')
    this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li') // impo
    this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li')
    this.map=new Map<string,string | number>()  // 2nd impo
   }
  
   async getProductHeader():Promise<string>
   {
    return await this.header.innerText()
   }
   
   async getProductImagesCount():Promise<number>
   {
    
    //await this.page.waitForTimeout(4000)
    await this.productImages.first().waitFor({state:"visible"})
    return await this.productImages.count()
   }

   /**
    * 
    * @returns this method is returning actual product information/data: Header, images, metadata, pricing
    */
   async getProductinfo():Promise<Map<string,string|number>>
   {
      this.map.set('Product header', await this.getProductHeader())
      this.map.set('Product Images count', await this.getProductImagesCount())
      await this.getProductMetaData()
      await this.getProductPricingData()
      return this.map
   }

//    Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock

   private async getProductMetaData()
   {
    let metaData=await this.productMetaData.allInnerTexts()
    for (let data of metaData)
    {
           let meta=data.split(':')
           let metaKey=meta[0].trim()
           let metaVal=meta[1].trim()
           this.map.set(metaKey,metaVal)  // 3rd impo
    }      
   }

//    $2,000.00
// Ex Tax: $2,000.00

   private async getProductPricingData()
   {
      let priceData=await this.productPricing.allInnerTexts()
      let productPrice=priceData[0]
      let exTaxPrice=priceData[1].split(':')[1]
      this.map.set('Product Price',productPrice)
      this.map.set('EX Tax Price',exTaxPrice)

   }


}