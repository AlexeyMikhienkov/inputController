const actions = {
    "left": {
        keyCodes: [37, 65],
     //   enabled: false
    },
    "right": {
        keyCodes: [39, 68],
     //   enabled: false
    },
    "up": {
        keyCodes: [38, 87],
      //  enabled: false
    },
    "down": {
        keyCodes: [40, 83],
     //   enabled: false
    }
};

const target = document.querySelector(".element");
const controller = new InputController(actions, target);

document.getElementById("attach").onclick = controller.attach(target);
document.getElementById("detach").onclick = controller.detach();
document.getElementById("enableAction").onclick = controller.enableAction("left");
document.getElementById("disableAction").onclick = controller.disableAction("left");

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