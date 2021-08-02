class inputController {
    _enabled = false;
    _focused = false;
    _ACTION_ACTIVATED = 'input-controller:action-activated';
    _ACTION_DEACTIVATED = 'input-controller:action-deactivated';
    actions = {};

    constructor(actionsToBind, target) {
            this.actions = actionsToBind;
            this.target = target;
    };

    bindActions(actionsToBind) {

    };

    enableAction() {

    };

    disableAction() {

    };

    attach() {

    };

    detach() {

    };

    // action - название активности (искать среди текущих активностей объекта)
    isActionActive(action: string) {
        return this.actions.includes(action);
    };

    isKeyPressed(keyCode: number) {
        for (let i = 0; i < this.actions.length; i++) {
            const action = this.actions[i];
            //TODO: проверить, нажата ли кнопка в контроллере
        }
    };


}
