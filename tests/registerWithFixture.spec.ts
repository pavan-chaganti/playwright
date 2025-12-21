import {test,expect} from "../fixtures/dataFixtures";

//radom email id
    function getRnadomEmail():string{
        let random =Math.random().toString(36).substring(2,9);
        return `Auto_${random}@gmail.com`
    }
 
    test.describe(async()=>{
        let data:any[];
    })

//method1:
 test(`Registrations user with csv2`, async({regData,page})=>{
     for(const user of regData){
          //sequential code executions
     }
    });

//method2:

  test.beforeAll(async ({regData,page})=>{
        //data=regData;
    });
    
    /*for(const user of data){
        test(`Registrations user ${user.firstName} with csv`, async({regData,page})=>{
            console.log("const: "+ user.lastName);
    });
}
   //Notes

// this is the limitation we with data fixtures only it wil support sequetial exections

//- In Playwright/Test runner, test.beforeAll runs after the test file is parsed.
//- Your for loop is outside of any test hook, so it executes immediately when the file is loaded.
//- At that point, data is undefined, so for (const user of data) throws.
*/