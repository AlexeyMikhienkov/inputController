let actions = {
    "left": {
        keyCodes: [37, 65],
        enabledAction: false
    },
    "right": {
        keyCodes: [39, 68],
        enabledAction: false
    },
    "up": {
        keyCodes: [38, 87],
        enabledAction: false
    },
    "down": {
        keyCodes: [40, 83],
        enabledAction: false
    }
};

const target = document.querySelector(".element");
const controller = inputController(actions, target);

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
    if (!controller.enabled) {
        alert("Контроллер отключен. Для обработки нажатия сначала включите контроллер");
    } else {
        const code = e.keyCode;
        for (const action of controller.actions) {
            const keyCodes = action.keyCodes;
            if (keyCodes.includes(code)) {
                controller.enableAction(action);
            } else {
                alert("Нет действия для данной клавиши");
            }
        }
    }
}

document.addEventListener("keyup", handleKeyUp);

function handleKeyUp(e) {
    if (!controller.enabled) {
        alert("Контроллер отключен. Для обработки нажатия сначала включите контроллер");
    } else {
        const code = e.keyCode;
        for (const action of controller.actions) {
            const keyCodes = action.keyCodes;
            if (keyCodes.includes(code)) {
                controller.disableAction(action);
            } else {
                alert("Нет действия для данной клавиши");
            }
        }
    }


}

document.addEventListener("input-controller:activate", move);

function move(e) {
    const action = e.action;
    const x = Number(action === "right") * 2 - 1;
    const y = Number(action === "up") * 2 - 1;

}


/*
let position = 0;

function move(direction) {
    position += direction * 500;
    element.style.transform = `translate(${position}px)`;
}

document.addEventListener("input-controller:activate", ({detail:{action}}) => {
    move(Number(action === "right") * 2 - 1);

function createNewEventKeyDown(e) {
    const eventActivate = new CustomEvent("input-controller:activate", {
        detail: {
            keyCode: e.keyCode
        }
    });
    document.dispatchEvent(eventActivate);
}



document.addEventListener("keydown", createNewEventKeyUp);

function createNewEventKeyUp() {
    const eventDeactivate = new CustomEvent("input-controller:deactivate", {
        detail: {
        }
    });
    document.dispatchEvent(eventDeactivate);
}

function deactivateController() {

}

document.addEventListener("input-controller:deactivate", deactivateController);

/*
document.addEventListener("keydown", createNewEventKeyDown);

function createNewEventKeyDown(e) {
    const event = new CustomEvent("input-controller:activate", {
        detail: {
            action: e.keyCode === 37 ? "left" : "right"
        }
    });
    document.dispatchEvent(event);
}

let position = 0;

function move(direction) {
    position += direction * 500;
    element.style.transform = `translate(${position}px)`;
}

document.addEventListener("input-controller:activate", ({detail:{action}}) => {
    move(Number(action === "right") * 2 - 1);
});
*/