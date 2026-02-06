import Grid from "./classes/Grid.js";
import Invaders from "./classes/invader.js";
import Obstacle from "./classes/Obstacles.js";
import Praticles from "./classes/Particle.js";
import Player from "./classes/Player.js";
import SoundEffects from "./classes/SoundEffects.js";
import { gameState } from "./utils/constants.js";

const soundEffects = new SoundEffects()

const startScreen = document.querySelector(".start-screen");
const gameOverScreen = document.querySelector(".game-over");
const scoreUi = document.querySelector(".score-ui");
const scoreElement = scoreUi.querySelector(".score > span");
const levelElement = scoreUi.querySelector(".level > span");
const highElement = scoreUi.querySelector(".high > span");
const coinElement = scoreUi.querySelector(".coin > span");
const buttonPlay = document.querySelector(".button-play");
const buttonRestart = document.querySelector(".button-restart");

gameOverScreen.remove();

// Ele procura no HTML o primeiro elemento <canvas> que existir na página e guarda esse elemento na variável canvas.
const canvas = document.querySelector("canvas");
// Ele pega o contexto de desenho 2D do <canvas>.
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false;

let currentState =  gameState.START

const gameData  = {
  score: 0,
  level: 1,
  high: 0,
  coin: 0,
}

const showGameData = () => {
  scoreElement.textContent = gameData.score
  levelElement.textContent = gameData.level
  highElement.textContent = gameData.high
}

const player = new Player(canvas.width, canvas.height);
const grid = new Grid(3, 6);
const playerProjectile = [];
const InvadersProjectile = [];
const praticles = [];
const Obstacles = []

const initObstacles = () => {
  const x = canvas.width / 2 - 50
  const y = canvas.height - 250
  const offset = canvas.width * 0.15
  const color = "crimson"

  const obstacle1 = new Obstacle({x: x - offset, y}, 100, 20, color)
  const obstacle2 = new Obstacle({x: x + offset, y}, 100, 20, color)

  Obstacles.push(obstacle1)
  Obstacles.push(obstacle2)
}

initObstacles()

const keys = {
  left: false,
  right: false,
  shoot: {
    pressed: false,
    relesead: true,
  },
};

const incrementScore = (value) => {
   gameData.score += value

   if (gameData.score > gameData.high) {
      gameData.high = gameData.score
   }
}

const drawObstacles = () => {
  Obstacles.forEach((Obstacle) => Obstacle.draw(ctx));
}

const drawProjectiles = () => {
  const Projectiles = [...playerProjectile, ...InvadersProjectile];

  Projectiles.forEach((Projectile) => {
    Projectile.draw(ctx);
    Projectile.uptade();
  });
};

const drawParticles = () => {
  praticles.forEach((Praticle) => {
    Praticle.draw(ctx);
    Praticle.uptade();
  });
};

const clearProjectiles = () => {
  playerProjectile.forEach((Projectile, index) => {
    if (Projectile.position.y <= 0) {
      playerProjectile.splice(index, 1);
    }
  });
};

const clearParticles = () => {
  praticles.forEach((praticle, i) => {
    if (praticle.opacity <= 0) {
      praticles.splice(i, 1);
    }
  });
};

const createExplosion = (position, size, color) => {
  for (let i = 0; i < size; i += 1) {
    const Particle = new Praticles(
      {
        x: position.x,
        y: position.y,
      },
      {
        x: Math.random() - 0.5 * 1.5,
        y: Math.random() - 0.5 * 1.5,
      },
      2,
      color
    );

    praticles.push(Particle);
  }
};

const checkShootInvaders = () => {
  grid.invaders.forEach((invader, invaderIndex) => {
    playerProjectile.some((Projectile, ProjectileIndex) => {
      if (invader.hit(Projectile)) {
        soundEffects.playHitSound()
        createExplosion(
          {
            x: invader.position.x + invader.width / 2,
            y: invader.position.y + invader.height / 2,
          },
          10,
          "#941CFF"
        );
       
        incrementScore(10)

        grid.invaders.splice(invaderIndex, 1);
        playerProjectile.splice(ProjectileIndex, 1);
      }
    });
  });
};

const checkShootPlayer = () => {
  InvadersProjectile.some((Projectile, i) => {
    if (player.hit(Projectile)) {
      soundEffects.playExplosionSound()
      InvadersProjectile.splice(i, 1);
      gameOver()
       
    }
  });
};

const checkShootObstacles = () => {
 Obstacles.forEach((obstacle) => {
    playerProjectile.some((Projectile, i) => {
    if (obstacle.hit(Projectile)) {
      playerProjectile.splice(i, 1);
       
    }
  });

     InvadersProjectile.some((Projectile, i) => {
    if (obstacle.hit(Projectile)) {
      InvadersProjectile.splice(i, 1);
       
    }
  });
 })
}

const spawnGrid = () => { 
  if(grid.invaders.length === 0){
    soundEffects.playNextLevelSound()
    grid.rows = Math.round(Math.random() * 9 + 1)
    grid.cols = Math.round(Math.random() * 9 + 1)
    grid.restart()

    gameData.level += 1
    gameData.coin += 5
  }
}


const  gameOver = () => { 
        createExplosion(
        {
          x: player.position.x + player.width / 2,
          y: player.position.y + player.height / 2,
        },
        20,
        "#FF5C00"
      );
       createExplosion(
        {
          x: player.position.x + player.width / 2,
          y: player.position.y + player.height / 2,
        },
        20,
        "#FC1723"
      );
          createExplosion(
        {
          x: player.position.x + player.width / 2,
          y: player.position.y + player.height / 2,
        },
        20,
        "#ffff0d"
      );

      currentState = gameState.GAMEOVER
      Player.alive = false
      document.body.append(gameOverScreen)
}

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(currentState === gameState.PLAYING){
  showGameData()
  spawnGrid()

  drawProjectiles();
  drawParticles();
  drawObstacles()

  clearProjectiles();
  clearParticles();

  checkShootInvaders();
  checkShootPlayer()
  checkShootObstacles()


  grid.draw(ctx);
  grid.uptade(Player.alive);
  ctx.save();

  ctx.translate(
    player.position.x + player.width / 2,
    player.position.y + player.height / 2
  );

  if (keys.shoot.pressed && keys.shoot.relesead) {
    soundEffects.playShootSound()
    player.shoot(playerProjectile);
    keys.shoot.relesead = false;
  }

  if (keys.left && player.position.x >= 0) {
    player.moveLeft();
    ctx.rotate(-0.15);
  }
  if (keys.right && player.position.x <= canvas.width - player.width) {
    player.moveRight();
    ctx.rotate(+0.15);
  }

  ctx.translate(
    -player.position.x - player.width / 2,
    -player.position.y - player.height / 2
  );

  player.draw(ctx);

  ctx.restore();
  }

  if(currentState === gameState.GAMEOVER){ 
    checkShootObstacles()
    drawParticles()
    drawProjectiles()
    drawObstacles()

    clearProjectiles()
    clearParticles()

    grid.draw(ctx)
    grid.uptade(Player.alive);
  }

  requestAnimationFrame(gameLoop);

};

addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "a") keys.left = true;
  if (key === "d") keys.right = true;
  if (key === "enter") keys.shoot.pressed = true;
});

addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "a") keys.left = false;
  if (key === "d") keys.right = false;
  if (key === "enter") {
    keys.shoot.pressed = false;
    keys.shoot.relesead = true;
  }
});



buttonPlay.addEventListener("click", () => {
  startScreen.remove()
  scoreUi.style.display = "block"
  currentState = gameState.PLAYING


 setInterval(() => {
  const invader = grid.getRandomInvader();

  if (invader) {
    invader.shoot(InvadersProjectile);
  }
}, 1000);
 })
buttonRestart.addEventListener("click", () => {
   currentState = gameState.PLAYING
   player.alive = true

   grid.invaders.length = 0
   grid.invadersVelocity = 1

   InvadersProjectile,length = 0

   gameData.score = 0
   gameData.level = 0

   gameOverScreen.remove()
 })

gameLoop();
