import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil'
import {HomePage} from "../pages/HomePage";
import {RegisterPage} from "../pages/RegisterPage"
export class LoginPage{
    //1. page locators/Objects/OR:
    private readonly page:Page;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly logBtn:Locator;
    private readonly warningMSG:Locator;
    private readonly eletUtil:ElementUtil;
    private readonly registrationLink:Locator;
    


    //2. page class constructor...

    constructor(page:Page){
        
this.page=page;
this.eletUtil=new ElementUtil(page);
this.emailId=page.locator("#input-email");
this.password=page.locator("#input-password");
this.logBtn=page.locator('[value="Login"]');
this.warningMSG=page.locator('[class="alert alert-danger alert-dismissible"]');
this.registrationLink=page.getByText('Register',{exact: true});    
}

 //3. page actions/methods
/**
 * 
 */
 async gotoLogInPage(baseURL:string| undefined){
    await this.page.goto(baseURL+"?route=account/login");
 }
/**
 * 
 * @param emailId 
 * @param pw 
 * @returns 
 */
async doLogIn(emailId:string,pw:string):Promise<HomePage>{
await this.eletUtil.fill(this.emailId,emailId)
await this.eletUtil.fill(this.password,pw);
await this.eletUtil.click(this.logBtn,{force:true,timeout:5000})
return new HomePage(this.page);
}
/**
 * 
 * @returns 
 */
async getinvalidLogInMessage():Promise<String | null>{
   const errorMesg= await this.eletUtil.getText(this.warningMSG);
   console.log(`Invalid warning meassage ${errorMesg}`);
   return errorMesg;
}

async navtiateToRegistrationsPage(){
   await this.eletUtil.click(this.registrationLink, {force:true}, 1);
   return new RegisterPage(this.page);
}
}