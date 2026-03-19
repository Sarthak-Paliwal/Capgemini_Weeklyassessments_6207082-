import {test} from "@playwright/test";
test.only("task3",async({page})=>{
    await page.goto("https://www.cricbuzz.com/");
    await page.locator("//a[@class='w-[300px] wb:w-[250px] bg-cbWhite flex flex-col p-3 gap-1']").first().click();
    await page.getByRole("link",{name:"Scorecard"}).click();
    const name=await page.locator("(//div[@class='grid scorecard-bat-grid p-2 border-b border-solid border-cbBorderGrey tb:scorecard-bat-grid-web wb:text-sm wb:scorecard-bat-grid-web'])[2]/descendant::a").first().textContent();
    const runs=await page.locator("(//div[@class='grid scorecard-bat-grid p-2 border-b border-solid border-cbBorderGrey tb:scorecard-bat-grid-web wb:text-sm wb:scorecard-bat-grid-web'])[2]/div[@class='flex justify-center items-center font-bold text-sm  wb:text-sm']").textContent();
    console.log(name + " " + runs);
    await page.screenshot({path: `7th march Assessment/screenshot/task3${Date.now()}.png`})

});