class InputController {
    enabled = false; // активация контроллера
    focused = true;// фокус на экране
    ACTION_ACTIVATED = 'input-controller:action-activated';
    ACTION_DEACTIVATED = 'input-controller:action-deactivated';
    actions = {};
    target;
    keydown;

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
        if (this.enabled && this.focused) {
            Object.entries(actionsToBind).forEach(([key, value]) => {
                if (!Object.keys(this.actions).includes(key)) {
                    value["enabled"] = true;
                    this.actions[key] = value;
                } else {
                    console.log("Эта активность уже существует");
                }
            });
        } else {
            console.log("Не подключен контроллер или нет фокуса");
        }
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
            console.log("Контроллер активирован");
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
            console.log("Контроллер активирован");
        } else {
            console.log("Контроллер не активирован");
        }

    };

    attach(target, dontEnable) {
        // TODO: добавить таргет, если поле dontEnable != true и активировать контроллер
        if (!dontEnable) {
            this.target = target;
            this.enabled = true;

            document.addEventListener("keyup", this.handleKeyUp);
            document.addEventListener("keydown", this.handleKeyDown);
        }
    };

    detach() {
        // TODO: удалить таргет у элемента и деактивировать контроллер
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);

        this.target = null;
        this.enabled = false;

        console.log("Откреплено от элемента");
    };

    isActionActive(action) {
        //TODO: если зажата кнопка, соответствующая активности action, и она доступна -> return true
        // иначе return false (делать через isKeyPressed
        // у disabled активность = false

        if (!this.enabled) {
            return false;
        }

        Object.entries(this.actions).forEach(([key, value]) => {
            if (key === action) {
                for (const keyCode of value.keyCodes) {
                    if (this.isKeyPressed(keyCode)) {
                        console.log("Нажата кнопка", key);
                        return true
                    }
                }
            }
            return false;
        })
    };

    isKeyPressed(keyCode) {
        //TODO: проверить, нажата ли кнопка в контроллере ?
        return this.keydown === keyCode;
    };

    handleKeyDown = (e) => {
        const code = e.keyCode;

        this.keydown = e.keyCode;
        //TODO: проверяем, доступна ли клавиша с данным keyCode
        // Если она доступна, то создаем событие activated и передаем в test
        // Если нет, ничего не делаем (для проверки можно вывести лог: клавиша недоступна)

        if (this.enabled && this.focused) {
            Object.entries(this.actions).forEach(([key, value]) => {
                if (value.keyCodes.includes(code)) {
                    if (value.enabled) {
                        const event = new CustomEvent(this.ACTION_ACTIVATED, {
                            detail: {
                                action: key,
                            }
                        });
                        document.dispatchEvent(event);
                    } else {
                        console.log("Клавиша недоступна");
                    }
                }
            });
        } else {
            console.log("Контроллер не активирован");
        }

    };

    handleKeyUp = (e) => {
        //TODO: создаем событие deactivated и передаем в тест, если контроллер доступен\

        this.keydown = null;
        if (this.enabled) {
            let event = new CustomEvent(this.ACTION_DEACTIVATED, {});
            document.dispatchEvent(event);
        }
    };
}

window.InputController = InputController;