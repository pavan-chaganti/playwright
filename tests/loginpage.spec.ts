import {test, expect} from "../fixtures/baseFixture"
import {LoginPage} from '../pages/LoginPage'
import { HomePage } from "../pages/HomePage";

test("Verify Valid login @login @sanity",async ({homePage})=>{

    //AAA - arrange act assert
    expect(homePage.page).toHaveTitle("My Account");
    expect(await homePage.isUserLoggedIn()).toBeTruthy();

});
test("Verify InValid login message @login @sanity",{
    annotation:[
{type:"EPIC", description:""},
{type:"feature",description:""},
]
},
async ({page, baseURL})=>{

    //AAA - arrange act assert
    let loginPage= new LoginPage(page);
    await loginPage.gotoLogInPage(baseURL);
    await loginPage.doLogIn("test@12321.com","tess233");
    const warningMSG=await loginPage.getinvalidLogInMessage();
    expect(warningMSG).toBe(" Warning: No match for E-Mail Address and/or Password.");
});
