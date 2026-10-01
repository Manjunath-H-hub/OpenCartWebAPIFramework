import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage"


export class LoginPage extends BasePage
{

   // private locators
   private readonly emailid:Locator;
   private readonly password:Locator;
   private readonly loginbutton:Locator;
   private readonly forgottenPasswordLink:Locator;
   private readonly logo:Locator;
   private readonly loginErrorMessage:Locator

   //constrictor of the class to initialize the locators 
   constructor(page:Page)  
   {
       super(page)
       this.emailid=page.getByRole('textbox', { name: 'E-Mail Address' });
       this.password=page.getByRole('textbox', { name: 'Password' });
       this.loginbutton=page.getByRole('button', { name: 'Login' }).last();
       this.forgottenPasswordLink=page.getByRole('link', { name: 'Forgotten Password' }).first();
       this.logo=page.getByRole('img', { name: 'naveenopencart' });
       this.loginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
      
   } 

   //public page actions(methods)/behaviours

  async goToLoginPage():Promise<void>
  {
    await  this.page.goto('opencart/index.php?route=account/login');
  }
  
  async getLoginPageTitle():Promise<string>
  {
    return await this.page.title()
  }

  async isForgotPwdLinkExist():Promise<boolean>
  {
     return await this.forgottenPasswordLink.isVisible()
  }
  
  // public method (doLogin) is using 3 private locators is called encapsulation
  async doLogin(username:string, password:string):Promise<void>
  {
    console.log(`user creds : ${username} : ${password}`)
    await this.emailid.fill(username)
    await this.password.fill(password)
    await this.loginbutton.click()
  }
  
  async isInvalidLoginErrorDisplayed():Promise<boolean>
  {
    return await this.loginErrorMessage.isVisible()
  }

}