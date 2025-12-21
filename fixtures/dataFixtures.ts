import {test as base,expect} from "@playwright/test";
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
type csvFixture={
    regData:RegData[]
}

export const test =base.extend<csvFixture>({
    regData:async({},use)=>{
        let fileContent=fs.readFileSync('./data/register.csv','utf-8')
    let registerData:RegData[]=parse(fileContent,{
        columns: true,
        skip_empty_lines:true
    });
    await use(registerData)
    }
});
export {expect};