import {test as base, expect } from "@playwright/test";
import {HomePage} from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage";

type myFixtures={
    homePage:HomePage;
}
export const test =base.extend<myFixtures>({
    homePage:async({page, baseURL},use, testInfo)=>{
        const logInPage= new LoginPage(page);
        await logInPage.gotoLogInPage(baseURL);
        const un=testInfo.project.metadata.username;
        const pw=testInfo.project.metadata.username;
        console.log(`user name: ${un} and password ${pw}`);
        const homePage:HomePage=await logInPage.doLogIn(un,pw);
        expect(( homePage).isUserLoggedIn()).toBeTruthy();
        await use( homePage);
    }
})
export {expect};