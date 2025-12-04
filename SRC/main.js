import Player from "./classes/Player.js"
import Projectile from "./classes/Projectile.js"

// Ele procura no HTML o primeiro elemento <canvas> que existir na página e guarda esse elemento na variável canvas.
const canvas = document.querySelector("canvas")
// Ele pega o contexto de desenho 2D do <canvas>.
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

ctx.imageSmoothingEnabled = false

const player = new Player(canvas.width, canvas.height)
const playerProjectile = []


const keys = {
    left: false,
    right: false,
    shoot: {
      pressed: false,
      relesead: true
    },
}

const drawProjectiles = () => {
  playerProjectile .forEach(Projectile => {
    Projectile.draw(ctx)
  })
}

const gameLoop = () => {

   ctx.clearRect(0,0, canvas.width, canvas.height)

   drawProjectiles()

   ctx.save()

  ctx.translate(player.position.x + player.width/ 2, player.position.y + player.height / 2)

  if(keys.shoot.pressed && keys.shoot.relesead){
    player.shoot(playerProjectile)
    keys.shoot.relesead = false

  }

    if(keys.left && player.position.x >= 0){
      player.moveLeft()
      ctx.rotate(-0.15)
    }
    if(keys.right && player.position.x <= canvas.width - player.width){
        player.moveRight()
        ctx.rotate(+0.15)
    }

      ctx.translate(- player.position.x - player.width/ 2, - player.position.y - player.height / 2)

  player.draw(ctx)

  ctx.restore()


  requestAnimationFrame(gameLoop)
}



addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if(key === "a") keys.left = true
    if(key === "d") keys.right = true
    if(key === "enter") keys.shoot.pressed = true
})

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase()
    if(key === "a")  keys.left = false
    if(key === "d")  keys.right = false
    if(key === "enter"){
      keys.shoot.pressed = false
      keys.shoot.relesead = true
    }
})
 
gameLoop()

