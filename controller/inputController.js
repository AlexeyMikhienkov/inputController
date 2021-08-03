class inputController {
    enabled = false;
    focused = false;
    ACTION_ACTIVATED = 'input-controller:action-activated';
    ACTION_DEACTIVATED = 'input-controller:action-deactivated';
    actions;
    target;

    constructor(actionsToBind, target) {
        this.actions = actionsToBind;
        this.target = target;

        return this;
    };

    bindActions(actionsToBind) {

    };

    enableAction(actionName: string) {
        if (!this.isActionActive(actionName)) {
            const act = this.actions[actionName];
            act.enabledAction = true;
        }

        let event = new CustomEvent(this.ACTION_ACTIVATED, {
            action: actionName
        });
        document.dispatchEvent(event);
    };

    disableAction(actionName: string) {
        if (this.isActionActive(actionName)) {
            const act = this.actions[actionName];
            act.enabledAction = false;
        }

        let event = new CustomEvent(this.ACTION_DEACTIVATED, {
            action: actionName
        });
        document.dispatchEvent(event);
    };

    attach(target, dontEnable) {
        if (!dontEnable) {
            this.focused = true;
        }
    };

   detach() {
        this.focused = false;
    };

    //TODO: протестировать работу
    isActionActive(action: string) {
        const act = this.actions[action];
        return act.enabledAction;
    };

    isKeyPressed(keyCode: number) {
        for (let i = 0; i < this.actions.length; i++) {
            const action = this.actions[i];
            //TODO: проверить, нажата ли кнопка в контроллере
        }
    };

    getActions() {
        return this.actions;
    }


}
