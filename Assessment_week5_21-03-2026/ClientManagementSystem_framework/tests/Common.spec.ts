import { test, expect } from '@playwright/test';
import fs from "fs"
import path from "path"
import AuthenticatonPage from "../pageObjectModel/Authenticate.page.ts"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/webData.json"),'utf-8')
const data=JSON.parse(jsonData)
    test('View Invoice', async ({ page }) => {
        const registerPage=new AuthenticatonPage(page);
        await page.goto(data.url);
            await registerPage.AuthenticateAdminUser();
            await page.locator('//a[@href="invoices.php"]').click();
            await page.getByRole("link",{name:"View"}).last().click()
            await page.screenshot({path:"screenshot/saleInvoice.png"})
    });
    
