import { test, expect } from '@playwright/test';
import path from "path"
import fs from "fs"

const Jsondata = fs.readFileSync(path.join(__dirname, "./testdata/BookData.json"), 'utf8');
const data = JSON.parse(Jsondata);
test('End to End Test 1', async ({ page }) => {
    await page.goto("https://demoqa.com/books");
    page.on("dialog",async d=>{
        await d.accept();
    })
    await page.locator("#login").click();
    await page.locator("#newUser").click();
    await page.locator("#firstname").fill(data.Register.Fname);
    await page.locator("#lastname").fill(data.Register.Lname);
    await page.locator("#userName").fill(data.Register.username);
    await page.locator("#password").fill(data.Register.password);
    await page.locator("#register").click();

    //Login
    await page.locator("#gotologin").click();
    await page.locator("#userName").fill(data.Login.username);
    await page.locator("#password").fill(data.Login.password);
    await page.locator("#login").click();

})