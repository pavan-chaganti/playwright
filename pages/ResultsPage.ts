import {Locator, Page} from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";
import {ProductInfoPage} from "../pages/ProductInfoPage";
export class ResultsPage{
    //1. page Locators/objects/OR
private readonly page:Page;
private readonly eleUtil:ElementUtil;
private readonly results:Locator;

//2. page class constructor
constructor(page:Page){
    this.page=page;
    this.eleUtil=new ElementUtil(page);
    this.results= page.locator(`[class="product-thumb"]`);
}

// 3. page actions.methods

async getSearchResultsCount():Promise<number>{
    return await this.results.count();
}
async selectProduct(prductname:string){
await this.eleUtil.click(this.page.getByRole("link",{name:`${prductname}`}));
return new ProductInfoPage(this.page);
}
} 