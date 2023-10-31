

export class GamePadDriver {

    public constructor(private gamePad: Gamepad){}
  
    public getGamePadState(): GamePadState {
      return {axes: this.gamePad.axes, buttons: this.gamePad.buttons}
    }
  
    public emitButtonPressed(buttonCode: number): void {
      console.log("buttonCode", buttonCode);
    }
  
    public emitAxesMoves(axesState: readonly number[]): void {
      console.log("axes :", axesState);
    }

    // public attachGameApi(gameApi: GameApi): void {
    //   attach game api to fire command via public method emit**
    //   I don't know which is the best way to do that, if need to
    //   having specific implementation of this driver for every gamepad
    //   type or introduce kind of interpreter between gameApi and driver.
    // }
  }
  

  export interface GamePadState {
    axes: readonly number[],
    buttons: readonly GamepadButton[]
  }


  