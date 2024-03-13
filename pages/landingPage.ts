import type { Page } from 'playwright';


export class LandingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async open(url: string) {
        await this.page.goto(url); 
    }
    async changeTheme() {
        await this.page.locator("//button[contains(@title,'Switch between')]").click();
    }

}