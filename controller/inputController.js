class InputController {
    enabled = false; // активация контроллера
    focused = false; // фокус на экране
    ACTION_ACTIVATED = 'input-controller:action-activated';
    ACTION_DEACTIVATED = 'input-controller:action-deactivated';
    actions = {};
    target;

    constructor(actionsToBind, target) {
        this.listenerKeyDown = document.addEventListener("keydown", this.handleKeyDown);
        this.listenerKeyUp = document.addEventListener("keyup", this.handleKeyUp);
        this.actions = actionsToBind;
        this.target = target;

        Object.entries(this.actions).forEach(([key, value]) => {
            if (value.enabled === undefined) {
                this.actions[key].enabled = true;
            }
        });
    };

    bindActions(actionsToBind) {

    };

    enableAction(actionName) {
        //TODO: Обработать и протестировать enable action leftArrow
        // по нажатию на кнопку у "left" (actionName) поставить свойство enabled: true

        if (this.enabled && this.focused) {
            Object.entries(this.actions).forEach(([key, value]) => {
                if (key === actionName && !(this.actions[actionName].enabled)) {
                    this.actions[actionName].enabled = true;
                }
            });
        } else {
            console.log("Контроллер не активирован");
        }
    };

    disableAction(actionName) {
        //TODO: Обработать и протестировать disable action leftArrow
        // по нажатию на кнопку у "left" (actionName) появляется свойство enabled: false

        if (this.enabled && this.focused) {
            Object.entries(this.actions).forEach(([key, value]) => {
                if (key === actionName && this.actions[actionName].enabled) {
                    this.actions[actionName].enabled = false;
                }
            });
        } else {
            console.log("Контроллер не активирован");
        }

    };

    attach(target, dontEnable) {
        // TODO: добавить таргет, если поле dontEnable != true и активировать контроллер
        if (!dontEnable) {
            this.target = target;
            this.enabled = true;
        }

        console.log("target: ", this.target);
        console.log("enabled: ", this.enabled);
    };

    detach() {
        // TODO: удалить таргет у элемента и деактивировать контроллер
        this.target = null;
        this.enabled = false;

        console.log("target: ", this.target);
        console.log("enabled: ", this.enabled);
    };


    isActionActive(action) {
        //TODO: если зажата кнопка, соответствующая активности action -> return true
        // иначе return false (делать через isKeyPressed
        // у disabled активность = false
    };

    isKeyPressed(keyCode) {
        //TODO: проверить, нажата ли кнопка в контроллере ?
    };

    handleKeyDown(e) {
        const code = e.keyCode;

        //TODO: проверяем, доступна ли клавиша с данным keyCode
        // Если она доступна, то создаем событие activated и передаем в test
        // Если нет, ничего не делаем (для проверки можно вывести лог: клавиша недоступна)
       // console.log("actions: ", controller.actions);
      //  Object.entries(controller.actions).forEach(([key, value]) => {
       //     console.log(key, value);
       // });

        Object.entries(this.actions).forEach(([key, value]) => {
            if (value.keyCodes.includes(code)) {
                if (value.enabled) {
                    const event = new CustomEvent(this.ACTION_ACTIVATED, {
                        details: {
                            action: key,
                            keyCode: code
                        }
                    });
                    document.dispatchEvent(event);
                } else {
              //      console.log("Клавиша недоступна");
                }
            } else {
             //   console.log("Нет действия для данной клавиши");
            }
        });
    }

    handleKeyUp(e) {
        //TODO: создаем событие deactivated и передаем в тест, если контроллер доступен

        if (this.enabled) {
            let event = new CustomEvent(this.ACTION_DEACTIVATED, {});
            document.dispatchEvent(event);
        }
    }
}

window.InputController = InputController;