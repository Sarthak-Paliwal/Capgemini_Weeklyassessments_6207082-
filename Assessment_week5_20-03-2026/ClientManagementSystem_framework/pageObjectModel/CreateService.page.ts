import {Locator,Page,expect} from "@playwright/test"
import fs from "fs"
import path from "path"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/serviceData.json"),'utf-8');
const serviceData=JSON.parse(jsonData);

import Clients from "./AddClient.page.ts"

class Service{
    service:Locator
    addService:Locator
    page:Page
    data:any=serviceData
    serviceName:Locator
    servicePrice:Locator
    saveBtn:Locator
    addClientPage:any
    constructor(page:Page){
        this.page=page
        this.service=page.locator('(//li[@id="menu-academico"])').first();
        this.addService=page.locator('//a[@href="add-services.php"]')
        this.serviceName=page.getByPlaceholder("Service Name");
        this.servicePrice=page.getByPlaceholder("Price of Service");
        this.saveBtn=page.locator("#submit")
        this.addClientPage=new Clients(this.page);

    }
    async createService(){
        await this.service.hover();
        await this.addService.click();
        await this.serviceName.fill(this.data.serviceName);
        await this.servicePrice.fill(this.data.servicePrice);
        await this.page.screenshot({path:"screenshot/createService.png"})
        await this.saveBtn.click();


    }
    async assignService(){
        await this.addClientPage.clientList.click();
        await this.page.getByRole("link",{name:"Assign Services"}).last().click()
        await this.page.locator('//input[@name="sids[]"]').last().check();
        await this.page.screenshot({path:"screenshot/assignService.png"})
        await this.page.locator('//button[@name="submit"]').click();
    }
    
}
export default Service