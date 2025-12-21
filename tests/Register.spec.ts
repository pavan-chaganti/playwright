import {test,expect} from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import fs from "fs";
import {parse} from "csv-parse/sync"

//csv file reading
 type RegData={
        firstName:string,
        lastName:string,
        telephone:string,
        password:string,
        subscribeNewsletter:string
    }
    let fileContent=fs.readFileSync('./data/register.csv','utf-8')
    let registerData:RegData[]=parse(fileContent,{
        columns: true,
        skip_empty_lines:true
    });
//radom email id
    function getRnadomEmail():string{
        let random =Math.random().toString(36).substring(2,9);
        return `Auto_${random}@gmail.com`
    }
    
    for(let user of registerData){
test(`@register @sanity Verify user able to register ${user.firstName} user`,
    {
        annotation:[
{type:"EPIC", description:""},
{type:"feature",description:""},
]
    },
    async({page,baseURL})=>{
    const loginPage= new LoginPage(page);
    await loginPage.gotoLogInPage(baseURL);
    const registerPage= await loginPage.navtiateToRegistrationsPage();
    const isregistered:boolean=await registerPage.registerUser(
        user.firstName,user.lastName,getRnadomEmail(),user.telephone,user.password,user.subscribeNewsletter);
    expect(isregistered).toBeTruthy();
});}
