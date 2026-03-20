import {Locator,Page} from "@playwright/test"
import fs from "fs"
import path from "path"
const jsonData=fs.readFileSync(path.join(__dirname,"../utility/Authdata.json"),'utf-8');
const AuthData=JSON.parse(jsonData);

class Auth{
    page:Page;
    data:any=AuthData;
    userNameTf:Locator
    passwordTf:Locator
    loginBtn:Locator
    logoutBtn:Locator
    constructor(page:Page){
        this.page=page;
        
        this.userNameTf=page.locator('//input[@value="User Name"]')
        this.passwordTf=page.locator('//input[@value="Password"]')
        this.loginBtn=page.locator('//div[@class="submit"]')
        this.logoutBtn=page.locator('//i[@class="lnr lnr-power-switch"]')
        
    }
    async AuthenticateAdminUser(){
       await this.userNameTf.fill(this.data.username)
       await this.passwordTf.fill(this.data.password)
       await this.loginBtn.click();
       await this.page.screenshot({path:"screenshot/loggedinDashboard.png"})
    }
    
    async LogoutUser(){
        await this.logoutBtn.click()
    }



}
export default Auth;