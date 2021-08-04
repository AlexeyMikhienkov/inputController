const actions = {
    "left": {
        keyCodes: [37, 65],
        enabled: false
    },
    "right": {
        keyCodes: [39, 68]
     //   enabled: false
    },
    "up": {
        keyCodes: [38, 87],
        enabled: false
    },
    "down": {
        keyCodes: [40, 83]
     //   enabled: false
    }
};

let posX = 0;
let posY = 0;
const target = document.querySelector(".element");
const controller = new InputController(actions, target);

const attach = document.getElementById("attach");
attach.onclick = function () {
    controller.attach(target, false);
};

const detach = document.getElementById("detach");
detach.onclick = function () {
    controller.detach();
};

const enableAction = document.getElementById("enableAction");
enableAction.onclick = function () {
    controller.enableAction("left");
};

const disableAction = document.getElementById("disableAction");
disableAction.onclick = function() {
    controller.disableAction("left");
};

document.addEventListener("input-controller:activate", ({details: {action, keyCode}}) => {
    move(action, Number(action === "right") * 2 - 1, Number(action === "up") * 2 - 1)
});

function move(key, directionX, directionY) {
    posX += directionX * 100;
    posY = directionY * 100;
    target.style.transform = `translateX(${posX}px)`;
    target.style.transform = `translateY(${posY}px)`;
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

document.addEventListener("input-controller:deactivate", deactivateController);

let position = 0;

function move(direction) {
    position += direction * 500;
    element.style.transform = `translate(${position}px)`;
}

document.addEventListener("input-controller:activate", ({detail:{action}}) => {
    move(Number(action === "right") * 2 - 1);
});
*/