import {test,expect} from "../fixtures/baseFixture";
import {ResultsPage } from "../pages/ResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
let search =[
    {serachkey:"macbook", productname:"MacBook Pro", imagecount:4},
    {serachkey:"samsung", productname:"Samsung Galaxy Tab 10.1", imagecount:7},
    {serachkey:"macbook", productname:"MacBook Air", imagecount:4},
]

for(let product of search){
test(`verify product header ${product.productname}`,{
    tag:['@product','@smoke','@sanity','@Regression'], 
annotation:[
{type:"EPIC", description:""},
{type:"feature",description:""},
]}
,async ({homePage})=>{
    // AAA arrange act assert.

let resultsPage:ResultsPage= await homePage.doSearch(product.serachkey);
const productInfoPage:ProductInfoPage = await resultsPage.selectProduct(product.productname);
expect(await productInfoPage.getProductHeader()).toBe(product.productname)
});
}

for(let product of search){
test(`verify product imgs count for ${product.productname} is: ${product.imagecount}`,{tag:['@product','@smoke','@sanity','@Regression']},async ({homePage})=>{
    // AAA arrange act assert.

let resultsPage:ResultsPage= await homePage.doSearch(product.serachkey);
const productInfoPage:ProductInfoPage = await resultsPage.selectProduct(product.productname);
expect(productInfoPage.getProductimgCount).toBe(product.imagecount);
});
}

test(`veify product metda data `, {tag:['@product','@smoke','@sanity','@Regression']},async ({homePage})=>{

let resultsPage:ResultsPage= await homePage.doSearch("macbook");
const productInfoPage:ProductInfoPage = await resultsPage.selectProduct("MacBook pro");
let actualMetaData = await productInfoPage.getProductDetails();
expect.soft(actualMetaData.get("header")).toBe("MacBook Pro");
expect.soft(actualMetaData.get("Brand")).toBe("Apple");
expect.soft(actualMetaData.get("Product Code")).toBe("Product 18");
expect.soft(actualMetaData.get("Reward Points")).toBe("800");
expect.soft(actualMetaData.get("Availability")).toBe("Out Of Stock");

});

test(`veify product price data `,{tag:['@product','@smoke','@Regression']}, async ({homePage})=>{

let resultsPage:ResultsPage= await homePage.doSearch("macbook");
const productInfoPage:ProductInfoPage = await resultsPage.selectProduct("MacBook pro");
let actualMetaData = await productInfoPage.getProductDetails();
expect.soft(actualMetaData.get("header")).toBe("MacBook Pro");
expect.soft(actualMetaData.get("price")).toBe("$2,000.00");
expect.soft(actualMetaData.get("Ex Tax")).toBe("$2,000.00");
});

