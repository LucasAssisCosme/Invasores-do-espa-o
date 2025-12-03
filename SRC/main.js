import Player from "./classes/Player.js"

// Ele procura no HTML o primeiro elemento <canvas> que existir na página e guarda esse elemento na variável canvas.
const canvas = document.querySelector("canvas")
// Ele pega o contexto de desenho 2D do <canvas>.
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player(canvas.width, canvas.height)

player.position.x = canvas.width / 2 - player.width / 2 
player.position.y = canvas.height - player.height - 30


const keys = {
    left: false,
    right: false
}

const gameLoop = () => {

   ctx.clearRect(0,0, canvas.width, canvas.height)


    if(keys.left && player.position.x >= 0){
      player.moveLeft()
    }
    if(keys.right && player.position.x <= canvas.width - player.width){
        player.moveRight()
    }

  player.draw(ctx)


  requestAnimationFrame(gameLoop)
}



addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if(key === "a") keys.left = true
    if(key === "d") keys.right = true
})

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase()
    if(key === "a")  keys.left = false
    if(key === "d")  keys.right = false
})
 
gameLoop()

