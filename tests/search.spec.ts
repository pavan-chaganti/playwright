import {test,expect} from "../fixtures/baseFixture";
import {ResultsPage } from "../pages/ResultsPage";

//data provider for product searchand results count.
let searchData=[
    {searchKey:"macbook", resultsCount:3},
    {searchKey:"sansung", resultsCount:2},
    {searchKey:"imac", resultsCount:1},
    {searchKey:"canon", resultsCount:1},
    {searchKey:"Dummay", resultsCount:0},
];
for(let product of searchData){
test(`verify ${product.searchKey} product search `,{
    tag:['@search','@smoke','@sanaty'],
annotation:[
{type:"EPIC", description:""},
{type:"feature",description:""},
]
},async ({homePage})=>{
    // AAA arrange act assert.
let resultsPage:ResultsPage= await homePage.doSearch("macbook");
const resultsCount= await resultsPage.getSearchResultsCount();
await homePage.page.waitForTimeout(5000);
expect(resultsCount).toBe(3)
});
}
