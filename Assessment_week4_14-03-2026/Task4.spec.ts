import { test, expect } from '@playwright/test';
import path from "path"
import fs from "fs"

const Jsondata = fs.readFileSync(path.join(__dirname, "./testdata/BookData.json"), 'utf8');
const data = JSON.parse(Jsondata);
test('End to End Test', async ({ page }) => {
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

    await page.locator("#gotoStore").click();
    await page.locator("#searchBox").fill(data.Books.bookname);
    await page.locator('(//td[@style="padding: 10px; border-bottom: 1px solid rgb(221, 221, 221);"])[2]/div/span/a').click()
    const bookTitle=await page.locator("//div[@id='title-wrapper']/div[@class='col-md-9 col-sm-12']/label").textContent();
    await page.getByRole("button",{name:"Add To Your Collection"}).click()
    await page.getByRole("button",{name:"Back To Book Store"}).click()
    const bookAdded=await page.locator('//td[@style="padding: 10px; border-bottom: 1px solid rgb(221, 221, 221);"]/div/span/a').textContent();
    await expect(bookTitle).toBe(bookAdded)
    





})

