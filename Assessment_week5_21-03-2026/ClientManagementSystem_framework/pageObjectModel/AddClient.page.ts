import {Locator,Page,expect} from "@playwright/test"
import fs from "fs"
import path from "path"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/clientdata.json"),'utf-8');
const ClientData=JSON.parse(jsonData);
class Clients{
    page:Page
    data:any=ClientData
    addClient:Locator
    accountDropdown:Locator
    nameTf:Locator
    companyTf:Locator
    addressTf:Locator
    cityTf:Locator
    stateTf:Locator
    zipCodeTf:Locator
    workPhoneTf:Locator
    cellPhoneTf:Locator
    otherPhoneTf:Locator
    emailTf:Locator
    passwordTf:Locator
    webAddress:Locator
    notesTf:Locator
    submitbtn:Locator
    clientList:Locator
    dataRow:Locator
    

    constructor(page:Page){
        this.page=page
        this.addClient=page.locator('//a[@href="add-client.php"]')
        this.accountDropdown=page.locator('//select[@class="form-control select2"]')
        this.nameTf=page.getByPlaceholder("Contact Name")
        this.companyTf=page.getByPlaceholder("Company Name")
        this.addressTf=page.getByPlaceholder("Address").first()
        this.cityTf=page.getByPlaceholder("City")
        this.stateTf=page.getByPlaceholder("State")
        this.zipCodeTf=page.getByPlaceholder("Zip Code")
        this.workPhoneTf=page.getByPlaceholder("Work Phone Number").first()
        this.cellPhoneTf=page.getByPlaceholder("Cell Phone Number")
        this.otherPhoneTf=page.getByPlaceholder("Work Phone Number").last()
        this.emailTf=page.getByPlaceholder("Email address")
        this.passwordTf=page.getByPlaceholder("password")
        this.webAddress=page.getByPlaceholder("Website Address")
        this.notesTf=page.getByPlaceholder("Notes")
        this.submitbtn=page.locator("#submit");
        this.clientList=page.locator('//a[@href="manage-client.php"]')
        this.dataRow=page.locator('//tr[@class="active"]')
        

    }
    async addnewClient(){
        await this.addClient.click()
        await this.accountDropdown.selectOption(this.data.type)
        await this.nameTf.fill(this.data.name)
        await this.companyTf.fill(this.data.company)
        await this.addressTf.fill(this.data.address)
        await this.cityTf.fill(this.data.city)
        await this.stateTf.fill(this.data.state)
        await this.zipCodeTf.fill(this.data.zipCode)
        await this.workPhoneTf.fill(this.data.workPhone)
        await this.cellPhoneTf.fill(this.data.cellPhone)
        await this.otherPhoneTf.fill(this.data.otherPhone)
        await this.emailTf.fill(this.data.email)
        await this.passwordTf.fill(this.data.password)
        await this.webAddress.fill(this.data.webAddress)
        await this.notesTf.fill(this.data.notes);
        await this.page.screenshot({path:"screenshot/addClient.png"})
        await this.submitbtn.click();

    }
    async checkClient(){
        await this.clientList.click();
        const Rows=await this.dataRow.all()
        const len=await Rows.length
        const Name=await this.page.locator(`(//tr[@class="active"])[${len}]/td`).nth(2).textContent();
        await this.page.screenshot({path:"screenshot/clientList.png"})
        await expect(Name).toBe(this.data.name);
    }

    
}
export default Clients