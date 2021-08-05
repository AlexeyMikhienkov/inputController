export default class InputController {
  enabled = false; // активация контроллера
  focused = true;// фокус на экране
  static ACTION_ACTIVATED = 'input-controller:action-activated';
  static ACTION_DEACTIVATED = 'input-controller:action-deactivated';
  actions = {};
  target;
  keydown;
  isAttached = false;

  constructor(actionsToBind, target) {
    this.listenerKeyDown = document.addEventListener("keydown", this.handleKeyDown);
    this.listenerKeyUp = document.addEventListener("keyup", this.handleKeyUp);
    this.documentIsFocused = document.addEventListener('visibilitychange', this.changeFocus);
    this.actions = actionsToBind;
    this.target = target;

    Object.entries(this.actions).forEach(([key, value]) => {
      if (value.enabled === undefined) {
        this.actions[key].enabled = true;
      }
      this.actions[key].active = false;

    });
  };

  changeFocus() {
    console.log(this);
    this.focused = !document.hidden;
  };

  bindActions(actionsToBind) {
    Object.entries(actionsToBind).forEach(([key, value]) => {
      if (!Object.keys(this.actions).includes(key)) {
        value["enabled"] = true;
        this.actions[key] = value;
      } else {
        //TODO: Возможность добавить кнопки к действию
      }
    });
  };

  enableAction(actionName) {
    Object.entries(this.actions).forEach(([key,]) => {
      if (key === actionName && !(this.actions[actionName].enabled)) {
        this.actions[actionName].enabled = true;
      }
    });
    console.log("Теперь действие 'Влево' доступно");
  };

  disableAction(actionName) {
    Object.entries(this.actions).forEach(([key,]) => {
      if (key === actionName && this.actions[actionName].enabled) {
        this.actions[actionName].enabled = false;
      }
    });
    console.log("Теперь действие 'Влево' НЕ доступно");
  };

  attach(target, dontEnable) {
    if (!this.isAttached) {
      if (!dontEnable) {
        this.target = target;
        this.enabled = true;
        this.isAttached = true;

        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener("keydown", this.handleKeyDown);
        console.log("Прикреплено к DOM-элементу");
      }
    } else {
      console.log("Уже было прикреплено")
    }
  };

  detach() {
    if (this.isAttached) {
      document.removeEventListener("keydown", this.handleKeyDown);
      document.removeEventListener("keyup", this.handleKeyUp);

      this.target = null;
      this.enabled = false;
      this.isAttached = false;

      console.log("Откреплено от DOM-элемента");
    } else {
      console.log("Уже было откреплено");
    }

  };

  isActionActive(action) {
    //TODO: при изменение свойства экшна на enabled:false активность экшна = false

    if (!this.enabled) {
      console.log("Контроллер отключен");
      return false;
    }

    const [, actionData] = Object.entries(this.actions).find(([key, value]) => (key === action)) || [];
    return actionData ? actionData.active : false;
  };

  isKeyPressed(keyCode) {
    let res = false;
    if (!this.enabled || !this.focused) {
      return false;
    }

    Object.entries(this.actions).forEach(([key, value]) => {
      if (value.keyCodes.includes(keyCode) && value.enabled) { //TODO: Добавить проверку на нажатие конкретного code из keyCodes
        res = true;
      }
    });
    return res; //TODO: Выбрать удобный метод из Some и Every

  };

  handleKeyDown = (e) => {
    const code = e.keyCode;

    if (this.enabled && this.focused) {
      Object.entries(this.actions).forEach(([key, value]) => {
        if (value.keyCodes.includes(code)) {
          if (value.enabled && !value.active) {
            this.actions[key].active = true;
            console.log("Событие ACTIVATED создано");
            const event = new CustomEvent(InputController.ACTION_ACTIVATED, {
              detail: {
                action: key,
                keyCode: code
              }
            });
            document.dispatchEvent(event);
          }
        }
      });
    } else {
      console.log("Контроллер не активирован");
    }

  };

  handleKeyUp = (e) => {
    //TODO: не деактивируется action во время недоступности контроллера
    const code = e.keyCode;

    if (!this.enabled || !this.focused) return;

    Object.entries(this.actions).forEach(([key, value]) => {
      if (value.keyCodes.includes(code) && value.enabled) {
        this.actions[key].active = false;
      }
    });

    console.log("Событие DEACTIVATED создано");
    const event = new CustomEvent(InputController.ACTION_DEACTIVATED.ACTION_DEACTIVATED, {}); //TODO: добавить в detail деактивацию конкретного экшена и активацию/деактивацию в отдельную функцию (detail одинаковый)
    document.dispatchEvent(event);

  };
}

window.InputController = InputController;

