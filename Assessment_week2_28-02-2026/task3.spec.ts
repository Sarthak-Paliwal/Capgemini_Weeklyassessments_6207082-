import {test} from "@playwright/test";
test("task3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator("//input[@name='name']").fill("Sarthak");
    await page.locator("//input[@name='email']").fill("sarthak@gmail.com");
    await page.locator("//input[@name='password']").fill("Sarthak@123");
    await page.locator("//button[@type='submit']").click();
    await page.locator("//input[@id='email']").fill("sarthak@gmail.com");
    await page.locator("//input[@id='password']").fill("Sarthak@123");
    await page.locator("//button[@type='submit']").click();
    await page.screenshot({path:"screenshot/task3"+Date.now()+".png"});


})