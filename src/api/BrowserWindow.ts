import { WindowApi } from "./BrowserApi";

export class BrowserWindow implements WindowApi {

    public addGamePadConnectedListener(callback: Function): void {
        window.addEventListener("gamepadconnected", callback.bind(window));
    }

    public requestAnimationFrame(callback: Function): void {
        window.requestAnimationFrame(callback.bind(window));
    }

}