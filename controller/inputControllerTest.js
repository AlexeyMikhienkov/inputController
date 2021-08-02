document.addEventListener("keydown", createNewEventKeyDown);

function createNewEventKeyDown(e) {
    const event = new CustomEvent("input-controller:activate", {
        detail: {
            action: e.keyCode === 37 ? "left" : "right"
        }
    });
    document.dispatchEvent(event);
}

const element = document.querySelector(".element");

let position = 0;

function move(direction) {
    position += direction * 500;
    element.style.transform = `translate(${position}px)`;
}

document.addEventListener("input-controller:activate", ({detail:{action}}) => {
    move(Number(action === "right") * 2 - 1);
});
