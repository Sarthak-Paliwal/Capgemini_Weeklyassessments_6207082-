import {test} from '@playwright/test';
test('task1', async ({ page }) => {
    test.slow();
    await page.goto('https://www.icc-cricket.com/rankings/batting/womens/odi');
    const info = page.locator(
        '//tbody/descendant::span[@class=" font-h4 pr-4 font-extrabold uppercase text-primary "] | //tbody/descendant::span[@class="font-h4-upper font-extrabold leading-140 uppercase text-primary tracking-wide"] | (//tbody/descendant::span[@class="text-xs leading-140 font-medium capitalize text-primary"])[1] | //tbody/descendant::span[@class="text-sm lg:text-2xl leading-140 uppercase font-extrabold text-primary tracking-wide"] | //tbody/descendant::span[@class="font-h4 leading-140 font-extrabold uppercase text-blue-950"]'             
    );
    const allTexts = await info.allInnerTexts();
    console.log(allTexts);
    
    await page.screenshot({path: `7th march Assessment/screenshot/task1${Date.now()}.png`})
})