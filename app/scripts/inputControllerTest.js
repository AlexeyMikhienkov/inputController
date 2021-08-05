const actions = {
  "left": {
      keyCodes: [37, 65],
      enabled: false
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

const jump = {
  "space": {
      keyCodes: [32]
  }
};

let posX = 0;
let posY = 0;
const step = 50;
const colors = ["red", "green", "blue"];
let index = 0;

const target = document.getElementById("element");
const controller = new InputController(actions, target);

const attach = document.getElementById("attach");
attach.addEventListener('click', controller.attach);

const detach = document.getElementById("detach");
detach.addEventListener('click', controller.detach);

const enableAction = document.getElementById("enableAction");
enableAction.addEventListener('click', controller.enableAction);

const disableAction = document.getElementById("disableAction");
disableAction.addEventListener('click', controller.disableAction);

const bindJump = document.getElementById("bindJump");
bindJump.addEventListener('click', controller.bindActions);

//TODO: Что делать со слушателями с аргументами?
document.addEventListener("input-controller:action-activated", activated);
document.addEventListener("input-controller:action-deactivated", deactivated);

function activated(e) {
  const action = e.detail.action;
  const code = e.detail.keyCode;
  let timer;
  console.log("details:", action, code);

  console.log(controller.isActionActive(action), controller.isKeyPressed(code));

    timer = setInterval(() => {
      if (controller.isKeyPressed(code) && controller.isActionActive(action)) {
        console.log("Клавиша " + code + " нажата");
        // Вызов метода move
      } else {
        console.log("Клавиша " + code + " НЕ нажата");
        clearInterval(timer); //TODO: вызов clearInterval даже при быстром нажатии и отжатии клавиши
      }
    }, 1000);

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

function deactivated() {
}

