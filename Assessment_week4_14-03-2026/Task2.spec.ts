import { test } from '@playwright/test';
import path from "path"
import fs from "fs"

const Jsondata = fs.readFileSync(path.join(__dirname, "./testdata/Formdata.json"), 'utf8');
const data = JSON.parse(Jsondata);
test('Fill Form by Json data', async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form")
    const fname = page.locator("#firstName");
    const lname = page.locator("#lastName");
    const emailId = page.locator("#userEmail");

    const male = page.locator("#gender-radio-1");
    const female = page.locator("#gender-radio-2");
    const other = page.locator("#gender-radio-3");
    const mobileNo = page.locator("#userNumber");
    const dateOfbirth=page.locator("#dateOfBirthInput")
    const subject = page.locator("#subjectsInput");

    const sport = page.locator("#hobbies-checkbox-1");
    const reading = page.locator("#hobbies-checkbox-2");
    const music = page.locator("#hobbies-checkbox-3");

    const uploadPicture = page.locator("#uploadPicture");
    const Curraddress = page.locator("#currentAddress");

    const states=await page.locator("#react-select-3-input");
    const cities=await page.locator("#react-select-4-input")
    for (let i of data) {

    const firstname = i.firstName;
    const lastname = i.lastName;
    const email = i.email;
    const gender = i.gender;
    const mobile = i.mobile;
    const dob = i.dob;
    const subjects = i.subjects;
    const hobbies = i.hobbies;
    const picture = i.picture;
    const address = i.address;
    const state=i.state;
    const city=i.city;

    await fname.fill(firstname);
    await lname.fill(lastname);
    await emailId.fill(email);

  
    if (gender.toLowerCase() === "male") {
        await male.check();
    } 
    else if (gender.toLowerCase() === "female") {
        await female.check();
    } 
    else if (gender.toLowerCase() === "other") {
        await other.check();
    }

    await mobileNo.fill(mobile);
    await dateOfbirth.fill(dob);
    await dateOfbirth.press("Tab");
    for (const s of subjects) {
        await subject.fill(s);
        await subject.press("Enter");
    }


    for (const h of hobbies) {

        const value = h.toLowerCase();

        if (value === "sports") {
            await sport.check();
        }
        else if (value === "reading") {
            await reading.check();
        }
        else if (value === "music") {
            await music.check();
        }
    }

    await uploadPicture.setInputFiles(`D:/Playwright/tests/profileImages/${picture}`);

    await Curraddress.fill(address);

    await states.fill(state);
        await states.press("Tab")
        await cities.fill(city);
        await cities.press("Tab")
    await page.locator("#submit").click();
}

});
