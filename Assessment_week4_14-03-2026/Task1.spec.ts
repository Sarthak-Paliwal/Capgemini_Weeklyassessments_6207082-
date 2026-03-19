import { test, expect } from '@playwright/test';
import path from "path"
import fs from "fs"

const Jsondata = fs.readFileSync(path.join(__dirname, "./testdata/AmazonProduct.json"), 'utf8');
const data = JSON.parse(Jsondata);

test('Amazon Product Test', async ({ page }) => {

    await page.goto("https://www.amazon.in");

    const input = page.locator("#twotabsearchtextbox");
    const search = page.locator('#nav-search-submit-button');

    for (let i of data) {

        const productName = i.product;

        await input.fill('');
        await input.fill(productName);

        await search.click();

        const title = page.locator('//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]/span').first();

        console.log(await title.textContent());

        const [page2] = await Promise.all([
            page.waitForEvent("popup"),
            title.click()
        ]);

        await page2.waitForLoadState('domcontentloaded');

        const titleIn = await page2.locator("#productTitle").first().textContent();
        const price = await page2.locator('//span[@class="a-price-whole"]').first().textContent();
        const rating = await page2.locator('//span[@class="a-size-small a-color-base"]').first().textContent();

        console.log("Product:", titleIn);
        console.log("Price:", price);
        console.log("Rating:", rating);

        await page2.close();
    }
});