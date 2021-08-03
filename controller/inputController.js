class InputController {
    enabled = false; // активация контроллера
    focused = false;
    ACTION_ACTIVATED = 'input-controller:action-activated';
    ACTION_DEACTIVATED = 'input-controller:action-deactivated';
    actions;
    target;

    constructor(actionsToBind, target) {
        this.listenerKeyDown = document.addEventListener("keydown", this.handleKeyDown);
        this.listenerKeyUp = document.addEventListener("keyup", this.handleKeyUp);
        this.actions = actionsToBind;
        this.target = target;
    };

    bindActions(actionsToBind) {

    };

    enableAction(actionName) {

        //TODO: Обработать и протестировать enable action leftArrow
        // по нажатию на кнопку у "left" (actionName) поставить свойство enabled: true
        /*
        if (!this.isActionActive(actionName)) {
            const act = this.actions[actionName];
            act.enabledAction = true;
        }

        let event = new CustomEvent(this.ACTION_ACTIVATED, {
            action: actionName
        });
        document.dispatchEvent(event);

        if (this.isActionActive(actionName)) {

        }

        let event = new CustomEvent(this.ACTION_ACTIVATED, {
            action: actionName
        });
        document.dispatchEvent(event);*/
    };

    disableAction(actionName) {
        //TODO: Обработать и протестировать disable action leftArrow
        // по нажатию на кнопку у "left" (actionName) появляется свойство enabled: false

        /*
        if (this.isActionActive(actionName)) {
            const act = this.actions[actionName];
            act.enabledAction = false;
        }

        let event = new CustomEvent(this.ACTION_DEACTIVATED, {
            action: actionName
        });
        document.dispatchEvent(event);*/
    };

    attach(target, dontEnable) {
        // TODO: добавить таргет, если поле dontEnable != true и активировать контроллер
        if (!dontEnable) {
            controller.target = target;
        }
    };

   detach() {
        // TODO: удалить таргет у элемента и деактивировать контроллер
        controller.target = null;
    };


    isActionActive(action) {
        //TODO: если зажата кнопка, соответствующая активности action -> return true
        // иначе return false
        // ? как проверить, что кнопка зажата
        // у disabled активность = false
    };

    isKeyPressed(keyCode) {
        //TODO: проверить, нажата ли кнопка в контроллере ?
    };

    handleKeyDown(e) {
        console.log('down');
        console.log(e);

        const code = e.keyCode;

        //TODO: проверяем, доступна ли клавиша с данным keyCode
        // Если она доступна, то создаем событие activated и передаем в test
        // Если нет, ничего не делаем (для проверки можно вывести лог: клавиша недоступна)
        console.log("actions: ", controller.actions);
        Object.entries(controller.actions).forEach(([key, value]) => {
            console.log(key, value);
        });

        /*
        const event = new CustomEvent(this.ACTION_ACTIVATED, {});
        document.dispatchEvent(event);

        const code = e.keyCode;
        Object.entries(this.actions).forEach(([key, value]) => {
            if (value.keyCodes.includes(code)) {
                this.enableAction(key);
            }
        });
        */
    }

    handleKeyUp(e) {

        //TODO: создаем событие deactivated и передаем в тест, если контроллер доступен

        console.log('up');
        console.log(e);

        let event = new CustomEvent(this.ACTION_DEACTIVATED, {});
        document.dispatchEvent(event);
    }
}

window.InputController = InputController;