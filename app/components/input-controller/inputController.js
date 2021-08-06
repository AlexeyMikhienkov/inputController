export default class InputController {
  enabled = false; // активация контроллера
  focused = true;// фокус на экране
  static ACTION_ACTIVATED = 'input-controller:action-activated';
  static ACTION_DEACTIVATED = 'input-controller:action-deactivated';
  actions = {};
  target;
  keydown = [];
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

  changeFocus = () => {
    this.focused = !document.hidden;
  };

  bindActions(actionsToBind) {
    Object.entries(actionsToBind).forEach(([key, value]) => {
      if (!Object.keys(this.actions).includes(key)) {
        value["enabled"] = true;
        value["active"] = false;
        this.actions[key] = value;
      } else {
        let [, actionValue] =  Object.entries(this.actions).find(([k,]) => (k === key)) || [];
        actionValue.keyCodes = actionValue.keyCodes.concat(value.keyCodes);
        actionValue.keyCodes = actionValue.keyCodes.sort();
      }
    });
  };

  enableAction(actionName) {
    Object.entries(this.actions).forEach(([key,value]) => {
      if (key === actionName && !(value.enabled)) {
        value.enabled = true;
      }
    });
    console.log("Теперь действие 'Влево' доступно");
  };

  disableAction(actionName) {
    Object.entries(this.actions).forEach(([key, value]) => {
      if (key === actionName && value.enabled) {
        value.enabled = false;
        value.active = false;
      }
    });
    console.log("Теперь действие 'Влево' НЕ доступно");
  };

  attach(target, dontEnable) {
    if (!this.isAttached) {
      if (!dontEnable) {
        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener("keydown", this.handleKeyDown);
        this.target = target;
        this.enabled = true;
        this.isAttached = true;
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
    if (!this.enabled) {
      const [, actionValue] = Object.entries(this.actions).find(([key, value]) => (key === action)) || [];
      actionValue.active = false;
      console.log("Контроллер отключен");
      return false;
    }

    const [, actionData] = Object.entries(this.actions).find(([key, value]) => (key === action)) || [];
    console.log("isActionActive", actionData ? actionData.active : false);
    return actionData ? actionData.active : false;
  };

  isKeyPressed(keyCode) {
    return this.keydown.includes(keyCode);
  }

  handleKeyDown = (e) => {
    const code = e.keyCode;
    if (!this.keydown.includes(e.keyCode))
      this.keydown.push(e.keyCode);

    if (!this.enabled || !this.focused) {
      console.log("Не активирован контроллер или не сфокусировано окно");
      return;
    }

    Object.entries(this.actions).forEach(([key, value]) => {
      if (value.keyCodes.includes(code)) {
        if (value.enabled && !value.active) {
          value.active = true;
          console.log("Событие ACTIVATED создано для " + code);
          this.create(key, code, true);
        }
      }
    });

  };

  handleKeyUp = (e) => {
    const code = e.keyCode;
    const index = this.keydown.indexOf(e.keyCode);

    if (index > -1) {
      this.keydown.splice(index, 1);
    }

    if (!this.enabled || !this.focused) {
      Object.entries(this.actions).forEach(([key, value]) => {
        if (value.keyCodes.includes(code) && value.enabled) {
          value.active = false;
        }
      });

      console.log("Не активирован контроллер или не сфокусировано окно");
      return;
    }

    Object.entries(this.actions).forEach(([key, value]) => {
      if (value.keyCodes.includes(code) && value.enabled) {
        this.actions[key].active = false;
        console.log("Событие DEACTIVATED создано для " + code);
        this.create(key, code, false);
      }
    });
  };

  create(key, code, activated) {
    if (activated) {
      const event = new CustomEvent(InputController.ACTION_ACTIVATED, {
        detail: {
          action: key,
          keyCode: code
        }
      });
      document.dispatchEvent(event)
    } else {
      const event = new CustomEvent(InputController.ACTION_DEACTIVATED, {
        detail: {
          action: key,
          keyCode: code
        }
      });
      document.dispatchEvent(event)
    }
  }
}

window.InputController = InputController;
