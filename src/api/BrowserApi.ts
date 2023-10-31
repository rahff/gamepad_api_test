import { GamePadDriver } from "../driver/GamePadDriver";


abstract class BrowserApi {

  protected gamePadDriver!: GamePadDriver;
  
  public constructor(protected window: WindowApi){}

  protected abstract getConnectedGamePad(): Gamepad;

  public onInit(): void {
    this.window.addGamePadConnectedListener(this.initGamePad.bind(this));
  }

  public getGamePadDriver(): GamePadDriver {
    //for testing purposes only, it will be removed
    //when introducting gameApi on this driver
    return this.gamePadDriver;
  }

  protected initGamePad(event: GamepadEvent): void {
    this.gamePadDriver = new GamePadDriver(event.gamepad);
    this.window.requestAnimationFrame(this.getGamePadEvents.bind(this));
  }

  protected getGamePadEvents(): void {
    const { axes, buttons } = this.gamePadDriver.getGamePadState();
    this.detectButtonPressedEvent(buttons);
    this.detectAxesMovesEvent(axes);
  }

  protected detectButtonPressedEvent(buttons: readonly GamepadButton[]): void {
    buttons.forEach((button: GamepadButton) => {
      if(button.pressed) this.gamePadDriver.emitButtonPressed(button.value);
    })
  }

  protected detectAxesMovesEvent(axes: readonly number[]): void {
    this.gamePadDriver.emitAxesMoves(axes)
  }
}

export interface WindowApi {
  addGamePadConnectedListener(callback: Function): void
  requestAnimationFrame(callback: Function): void 
}


export class ChromeBrowserApi extends BrowserApi {

  public constructor(browserWindow: WindowApi){super(browserWindow)}

  protected getConnectedGamePad(): Gamepad {
      const gamePad = navigator.getGamepads()[0];
      if(!gamePad) throw "gamePad not supported";
      return gamePad;
  }
}
  