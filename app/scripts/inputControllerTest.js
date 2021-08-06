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
attach.addEventListener('click', function() {
  controller.attach();
});

const detach = document.getElementById("detach");
detach.addEventListener('click', function() {
  controller.detach();
});

const enableAction = document.getElementById("enableAction");
enableAction.addEventListener('click', function() {
  controller.enableAction("left")
});

const disableAction = document.getElementById("disableAction");
disableAction.addEventListener('click', function() {
  controller.disableAction("left")
});

const bindJump = document.getElementById("bindJump");
bindJump.addEventListener('click', function() {
  controller.bindActions(jump)
});

document.addEventListener("input-controller:action-activated", activated);
document.addEventListener("input-controller:action-deactivated", deactivated);

function activated(e) {
  //console.log("Метод activated", e);
  //console.log(e.detail.keyCode, e.detail.action);
  const timer = setInterval(() => {
    console.log(e.detail.keyCode, e.detail.action);
    if (controller.isKeyPressed(e.detail.keyCode) && controller.isActionActive(e.detail.action)) {
        move(e.detail.action);
    } else {
      //console.log("Клавиша " + action + " НЕ нажата");
      console.log(timer);
      clearInterval(timer);
    }
  }, 1000);

  //debugger
}

function move(key) {
  console.log("move:", key);

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

function deactivated(e) {
}

