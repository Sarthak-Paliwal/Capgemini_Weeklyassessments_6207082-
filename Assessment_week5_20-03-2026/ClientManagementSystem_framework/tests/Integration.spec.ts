import { test, expect } from '@playwright/test';
import fs from "fs"
import path from "path"
import AuthenticatonPage from "../pageObjectModel/Authenticate.page.ts"
import Clients from "../pageObjectModel/AddClient.page.ts"
import Service from "../pageObjectModel/CreateService.page.ts"

const jsonData=fs.readFileSync(path.join(__dirname,"../utility/webData.json"),'utf-8')
const data=JSON.parse(jsonData)
test('Register', async ({ page }) => {
    const registerPage=new AuthenticatonPage(page);
    const addClientPage=new Clients(page);
    const servicePage=new Service(page);
    await page.goto(data.url)
    await registerPage.AuthenticateAdminUser();
    await addClientPage.addnewClient();

    await addClientPage.checkClient();
    
    await servicePage.createService();
    await servicePage.assignService();
    await registerPage.LogoutUser();

    

    
});
