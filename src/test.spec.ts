import { ChromeBrowserApi } from "./api/BrowserApi";
import { FakeWindowApi, fakeGamepad, modifiedGamepad, newGamepadState } from "./utils/fakes.test";


describe("test", () => {

    let browserWindow: FakeWindowApi;
    let browerApi: ChromeBrowserApi;

    beforeEach(() => {
        browserWindow = new FakeWindowApi()
        browerApi = new ChromeBrowserApi(browserWindow);
        browerApi.onInit();
    })

    it("should get the gamepad initial\'s state", () => {
        const gamePadState = browerApi.getGamePadDriver().getGamePadState()
        expect(gamePadState).toEqual({axes: fakeGamepad.axes, buttons: fakeGamepad.buttons})
    })

    it("should received any change of gamepad\'s state", () => {
        browserWindow.changeGamePadState(modifiedGamepad);
        const gamePadState = browerApi.getGamePadDriver().getGamePadState();
        expect(gamePadState).toEqual(newGamepadState);
    })

})