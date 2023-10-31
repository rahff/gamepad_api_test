import { WindowApi } from "../api/BrowserApi";
import { GamePadState } from "../driver/GamePadDriver";

export class FakeGamePad implements Gamepad {
    public axes: number[] = [0, 0, 0];
    public buttons: GamepadButton[] = [{pressed: false, touched: false, value: 1}, {pressed: false, touched: false, value: 2}];
    public connected: boolean = true;
    public hapticActuators: GamepadHapticActuator[] = [];
    public id = "1";
    public index = 1;
    public mapping: GamepadMappingType = "standard";
    public timestamp = Date.now();
    public vibrationActuator = null;

    changeState(axes: readonly number[], buttons: readonly GamepadButton[]): void {
      this.axes = [...axes];
      this.buttons = [...buttons];
    }

}
export const fakeGamepad: Gamepad = {
    axes: [0, 0, 0],
    buttons: [{pressed: false, touched: false, value: 1}, {pressed: false, touched: false, value: 2}],
    connected: true,
    hapticActuators: [],
    id: "1",
    index: 1,
    mapping: "standard",
    timestamp: Date.now(),
    vibrationActuator: null
    
  }
  
  export class FakeWindowApi implements WindowApi {
  
    private gamePad!: FakeGamePad
    private callback!: Function
    
    public addGamePadConnectedListener(callback: Function): void {
      this.gamePad = new FakeGamePad()
        callback(new FakeGamepadEvent(this.gamePad));
    }

    public requestAnimationFrame(callback: Function): void {
      this.callback = callback;
      this.callback();
    }
    
    public changeGamePadState(gamepad: Gamepad): void {
      this.gamePad.changeState(gamepad.axes, gamepad.buttons)
      this.callback();
    }
  }

  export const newGamepadState: GamePadState = { 
    axes: [1, 1, 1], 
    buttons: [
      {pressed: true, touched: false, value: 1}, 
      {pressed: true, touched: true, value: 2}
    ]
  }
  export const modifiedGamepad: Gamepad = {
    ...fakeGamepad, 
    axes: [1, 1, 1], 
    buttons: [
      {pressed: true, touched: false, value: 1}, 
      {pressed: true, touched: true, value: 2}
    ]
  }


  export class FakeGamepadEvent implements GamepadEvent {

    public constructor(public gamepad: Gamepad){}
    bubbles!: boolean;
    cancelBubble!: boolean;
    cancelable!: boolean;
    composed!: boolean;
    currentTarget!: EventTarget | null;
    defaultPrevented!: boolean;
    eventPhase!: number;
    isTrusted!: boolean;
    returnValue!: boolean;
    srcElement!: EventTarget | null;
    target!: EventTarget | null;
    timeStamp!: number;
    type!: string;

    composedPath(): EventTarget[] {
      throw new Error("Method not implemented.");
    }
    initEvent(type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
      throw new Error("Method not implemented.");
    }
    preventDefault(): void {
      throw new Error("Method not implemented.");
    }
    stopImmediatePropagation(): void {
      throw new Error("Method not implemented.");
    }
    stopPropagation(): void {
      throw new Error("Method not implemented.");
    }
    NONE!: 0;
    CAPTURING_PHASE!: 1;
    AT_TARGET!: 2;
    BUBBLING_PHASE!: 3;
  
  }