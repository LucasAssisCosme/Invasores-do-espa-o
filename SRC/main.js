import Grid from "./classes/Grid.js"
import Invaders from "./classes/Invader.js"
import Praticles from "./classes/Particle.js"
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
const grid = new Grid(3, 6) 
const playerProjectile = []
const InvadersProjectile = []
const praticles = []




const keys = {
    left: false,
    right: false,
    shoot: {
      pressed: false,
      relesead: true
    },
}

const drawProjectiles = () => {
  const Projectiles = [...playerProjectile, ...InvadersProjectile]


  Projectiles.forEach(Projectile => {
    Projectile.draw(ctx)
    Projectile.uptade()
  })
  
}

const drawParticles= () => {
  praticles.forEach((Praticle) => {
    Praticle.draw(ctx)
    Praticle.uptade()
  })
}


const clearProjectiles = () => {
  playerProjectile.forEach((Projectile, index) => {
      if(Projectile.position.y <= 0){
        playerProjectile.splice(index, 1)
      }
  })

}

const createExplosion = () => {
  for (let i = 0; i < 10; i += 1) {
    const Particle = new Praticles({
      x: 100, 
      y: 500,
    },
    {
      x: Math.random() -0.5 * 1.5,
      y: Math.random()  -0.5 * 1.5
    },
    20,
    "crimson"
    
    
  )
    
  praticles.push(Particle)
  }
}


const checkShootInvaders = () => {
  grid.invaders.forEach((invader, invaderIndex) => {
    playerProjectile.some((Projectile, ProjectileIndex) => {
      if (invader.hit(Projectile)) {

         createExplosion()  

           grid.invaders.splice(invaderIndex, 1)
           playerProjectile.splice(ProjectileIndex, 1)
      }
    })
  })
}



const gameLoop = () => {

   ctx.clearRect(0,0, canvas.width, canvas.height)
    drawParticles()
   drawProjectiles()
   clearProjectiles()
   checkShootInvaders()

   grid.draw(ctx)
   grid.uptade()
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

setInterval(() => {
  const invader = grid.getRandomInvader()

  if(invader){
    invader.shoot(InvadersProjectile)
  }
}, 1000)
 
gameLoop()

