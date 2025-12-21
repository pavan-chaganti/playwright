import {Locator, Page} from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";
import {LoginPage} from "../pages/LoginPage";
import {ResultsPage} from "../pages/ResultsPage"

export class HomePage{
    //1. page locators/Objects/OR
    readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly logOutlink:Locator;
    private readonly search:Locator;
    private readonly searchIcon:Locator;
    private readonly logInLink:Locator;


    //2.page class constructor..
constructor(page: Page){
    this.page=page;
    this.eleUtil= new ElementUtil(page);
    this.logOutlink=page.getByRole("link",{name:'Logout'});
    this.search=page.locator(`[name="search"]`);
    this.searchIcon=page.locator(`[class="fa fa-search"]`);
    this.logInLink=page.getByRole("link",{name:'Login'});

}
    //3. page actions / methods

    async isUserLoggedIn():Promise<boolean>{
        return await this.eleUtil.isVisible(this.logOutlink,0);
    }

    async logOut():Promise<LoginPage>{
        await this.eleUtil.click(this.logOutlink, {timeout: 5000},1);
        await this.eleUtil.click(this.logInLink,{timeout:5000},1)
        return new LoginPage(this.page)
    }
    async doSearch(searchKey:string){
        console.log(`search key : ${searchKey}`);
        await this.eleUtil.fill(this.search,searchKey);
        await this.eleUtil.click(this.searchIcon);
        return new ResultsPage(this.page);
    }
}