import { test, expect } from '@playwright/test';
import fs from "fs"
import path from "path"
import AuthenticatonPage from "../pageObjectModel/Authenticate.page.ts"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/webData.json"),'utf-8')
const data=JSON.parse(jsonData)
    test('Monthly Sale Reports', async ({ page }) => {
        const registerPage=new AuthenticatonPage(page);
        await page.goto(data.url);
            await registerPage.AuthenticateAdminUser();
            await page.locator('(//li[@id="menu-academico"])').last().hover()
            await page.locator('//a[@href="sales-reports.php"]').click()
            await page.locator('#fromdate').type("18-03-2026")
            await page.locator('#todate').type("20-03-2026")
            await page.locator('#submit').click();
            await page.screenshot({path:"screenshot/MonthlyReport.png"})
    });
    
