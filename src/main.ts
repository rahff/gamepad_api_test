import { ChromeBrowserApi } from "./api/BrowserApi";
import { BrowserWindow } from "./api/BrowserWindow";

function main(): void {
    const windowApi = new BrowserWindow()
    const browerApi = new ChromeBrowserApi(windowApi);
    browerApi.onInit();
    
}

main();