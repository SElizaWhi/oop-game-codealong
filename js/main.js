class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; //will store instances of the class Obstacle
  }
  start() {
    this.player = new Player();
    this.attachEventListeners();

    //create obstacles
    setInterval(() => {
      const myObstacle = new Obstacle();
      this.obstaclesArr.push(myObstacle);
    }, 1000);

    //move obstacles + detect collision
    setInterval(() => {
      this.obstaclesArr.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        this.detectCollision(obstacleInstance); //detect collision
        this.removeObstacleIfOutside(obstacleInstance); //check if need to remove obstacle
      });
    }, 16);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }
  detectCollision(obstacleInstance) {
    if (
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width &&
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + obstacleInstance.height &&
      this.player.height + this.player.positionY > obstacleInstance.positionY
    ) {
      console.log("Game Over");
    }
  }
  removeObstacleIfOutside(obstacleInstance){
    if (obstacleInstance.positionY < 0){
        obstacleInstance.obstacleElm.remove(); //remove from the dom
        this.obstaclesArr.shift(); //remove from the array
    }
  }
}

class Player {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
    this.width = 20;
    this.height = 10;
    this.playerElm = document.getElementById("player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
  }
  moveLeft() {
    // this.positionX = this.positionX - 1;
    // this.positionX -= 1;
    this.positionX--;
    this.playerElm.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;
    this.playerElm.style.left = this.positionX + "vw";
  }
}

class Obstacle {
  constructor() {
    this.positionX = 40;
    this.positionY = 100;
    this.width = 20;
    this.height = 10;
    this.obstacleElm = null;

    this.createDomElement();
  }

  createDomElement() {
    //step 1 create
    this.obstacleElm = document.createElement("div");
    //step 2 add content + add/modify attributes
    this.obstacleElm.className = "obstacle";
    this.obstacleElm.style.width = this.width + "vw";
    this.obstacleElm.style.height = this.height + "vh";
    this.obstacleElm.style.left = this.positionX + "vw";
    // step 3 append to the dom
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.obstacleElm);
  }
  moveDown() {
    this.positionY--;
    this.obstacleElm.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
