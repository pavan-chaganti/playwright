import {Locator, Page} from "@playwright/test";
import {ElementUtil} from "../utils/ElementUtil";
export class ProductInfoPage{

    //1.page /Object.OR
    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly header:Locator;
    private readonly imgCount:Locator;
    private readonly productMetaData:Locator;
    private readonly productPriceData:Locator;
    private readonly productMap= new Map<string, string | null|number>
    
    //2.page class constructor
    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.header=page.locator("h1");
        this.imgCount=page.locator(`[class="thumbnails"] li`);
        this.productMetaData=page.locator(`(//div[@id="content"]//ul[@class="list-unstyled"])[1]/li`);
        this.productPriceData=page.locator(`(//div[@id="content"]//ul[@class="list-unstyled"])[2]/li`);
    }

    //3. page actions / methods

    async getProductHeader(){
        const headerText= this.eleUtil.getInnerText(this.header);
        console.log(`Product header ${headerText}`); 
        return headerText;
    }
    async getProductimgCount(){
        await this.eleUtil.waitForElementVisible(this.imgCount);
        const count=await this.imgCount.count();
        console.log(`total no of imgs for ${await this.getProductHeader()} product : ${count}`);
        return count;
    }

    private async getProductMetaData(){
        const metaData:string[]=await this.productMetaData.allInnerTexts();
        for(let data of metaData){
            const info:string[]=data.split(":");
            const key= info[0].trim();
            const value= info[1].trim();
            this.productMap.set(key,value);
        }

    }
     private async getProductPriceData(){
        const pData:string[]=await this.productPriceData.allInnerTexts();
            const productPrice:string=pData[0].trim();
            const productPriceExTx:string[]= pData[1].split(":");
            this.productMap.set("price",productPrice);
            this.productMap.set(productPriceExTx[0].trim(),productPriceExTx[1].trim());
        
    }

    async getProductDetails():Promise<Map<string, string | null|number>>{
        this.productMap.set("header", await this.getProductHeader());
        this.productMap.set("imageCount", (await this.getProductimgCount()));
        await this.getProductMetaData();
        await this.getProductPriceData();
        console.log(`Full prodcut details: ${this.productMap}`);
        this.printProductInfo();
        return this.productMap;
    }

    private printProductInfo(){
        for(let [key, value] of this.productMap){
            console.log(key, value);
        }
    }
}
