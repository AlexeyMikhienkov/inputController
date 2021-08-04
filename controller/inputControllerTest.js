const actions = {
    "left": {
        keyCodes: [37, 65],
       // enabled: false
    },
    "right": {
        keyCodes: [39, 68]
     //   enabled: false
    },
    "up": {
        keyCodes: [38, 87],
      //  enabled: false
    },
    "down": {
        keyCodes: [40, 83]
     //   enabled: false
    }
};

const jump = {
    "space": {
        keyCodes: [32]
    }
};

let posX = 0;
let posY = 0;
const step = 20;
const colors = ["red", "green", "blue"];
let index = 0;

const target = document.getElementById("element");
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

const bindJump = document.getElementById("bindJump");
bindJump.onclick = function() {
    controller.bindActions(jump);
};

document.addEventListener("input-controller:action-activated", ({detail:{action}}) => {
    move(action);
});

document.addEventListener("input-controller:action-deactivated", deactivate);

function deactivate() {
}

function move(key) {
    if (key === "left") {
        posX -= step;
    } else if (key === "right") {
        posX += step;
    } else if (key === "up") {
        posY -= step;
    } else if (key === "down") {
        posY += step;
    } else if (key === "space") {

        index = colors.indexOf(target.style.backgroundColor);
        target.style.backgroundColor = colors[(index + 1) % colors.length];
    }

    target.style.transform = `translate(${posX}px, ${posY}px)`;
}

//TODO: Пофиксить параметр focused в зависимости от фокуса экрана
// Пофиксить курсор на кнопке bind action после нажатия
// как работает isActionActive - итеративный опрос
// Плагин ?
