// game logic
function startGame() {
  Button.order = 0;
  let input = document.getElementById("input").value;
  document.getElementById("input").value = "";
  document.getElementById("go").disabled = true;

  const game = new Game();
  game.createButtons(input);

  setTimeout(() => {
    game.scrambleButtons(input);
  }, input * 1000);
}

class Game {
  constructor() {
    this.buttons = [];
    this.clickCount = 0;
  }

  createButtons(input) {
    const container = document.getElementById("buttonContainer");

    if (input < 3 || input > 7) {
      alert(alertMsg.message);
      document.getElementById("go").disabled = false;
    } else {
      container.innerHTML = "";

      for (let i = 0; i < input; i++) {
        const button = new Button();

        container.appendChild(button.btn);
        this.buttons.push(button);

        button.btn.addEventListener("click", () => {
          if (button.disabled) return;
          this.handleClick(button);
        });
      }
    }
  }

  checkCompleted() {
    if (this.clickCount === this.buttons.length) {
      setTimeout(() => {
        alert(successMsg.message);
        location.reload();
      }, 0);
    }
  }

  revealNumbers() {
    for (let button of this.buttons) {
      button.btn.innerHTML = button.order;
    }
  }

  handleClick(button) {
    this.clickCount++;
    console.log("Button " + button.order + " clicked");
    if (this.clickCount === button.order) {
      button.disabled = true;
      button.btn.innerHTML = button.order;
      this.checkCompleted();
    } else {
      this.revealNumbers();
      setTimeout(() => {
        alert(errorMsg.message);
        location.reload();
      }, 0);
    }
  }

  scrambleButtons(times) {
    const occupiedAreas = [];

    const interval = setInterval(() => {
      occupiedAreas.length = 0;

      for (let button of this.buttons) {
        button.btn.style.position = "absolute";

        let randomX, randomY;
        let buttonWidth = button.btn.offsetWidth;
        let buttonHeight = button.btn.offsetHeight;
        let isOverlapping = false;

        do {
          randomX = Math.random() * (window.innerWidth - 2 * buttonWidth);
          randomY = Math.random() * (window.innerHeight - 2.5 * buttonHeight);

          isOverlapping = occupiedAreas.some((area) => {
            return !(
              randomX + buttonWidth < area.x ||
              randomX > area.x + area.width ||
              randomY + buttonHeight < area.y ||
              randomY > area.y + area.height
            );
          });
        } while (isOverlapping);

        occupiedAreas.push({
          x: randomX,
          y: randomY,
          width: buttonWidth,
          height: buttonHeight,
        });

        button.btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }

      times--;
      if (times === 0) {
        clearInterval(interval);
        setTimeout(() => {

          // hide numbers
          for (let button of this.buttons) {
            button.btn.innerHTML = "";
            button.disabled = false;
          }
          document.getElementById("go").disabled = false;
        }, 1000);
      }
    }, 2000);
  }
}

class Button {
  static order = 0;

  constructor() {
    this.btn = document.createElement("button");
    this.btn.className = "btn";
    this.btn.style.position = "static"; // initialized as static
    this.btn.style.backgroundColor = this.getRandomColor();

    this.order = ++Button.order;
    this.btn.innerHTML = this.order;
    this.disabled = true;
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
