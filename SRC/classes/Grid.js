import Invaders from "./Invader.js"



class Grid {
   constructor(rows, cols){
      this.rows = rows
      this.cols = cols

     this.direction = "right"
     this.moveDown = false

      this.invadersVelocity = 1
      this.invaders = this.Init()
   }

   Init(){
      const array = []

      for (let row = 0; row < this.rows; row += 1) {

         for (let col = 0; col < this.cols; col += 1) {
           const invader = new Invaders({
            x: col * 50 + 20,
            y: row * 37 + 20,
           },
           this.invadersVelocity
         )
             array.push(invader)
         }

        
      }
      return array
      
   }

   draw(ctx){
      this.invaders.forEach(Invader => Invader.draw(ctx))
   }

   uptade(playerStatus){
       if(this.arrivedOnTheRightBorder()){
          this.direction = "left"
          this.moveDown = true
       }
       else if(this.arrivedOnTheLeftBorder()){
         this.direction = "right"
         this.moveDown = true
       }

       if(playerStatus === false) this.moveDown = false

      this.invaders.forEach((invader) => {

         if(this.moveDown){
            invader.moveDown()
            invader.icrementeVelocity(0.1)
            this.invadersVelocity = invader.velocity
         }

         if(this.direction === "right") invader.moveRight()
         if(this.direction === "left") invader.moveLeft()
      })

      this.moveDown = false
    }

    arrivedOnTheRightBorder() {
      return this.invaders.some(
         (invader) => 
             invader.position.x + invader.width >= innerWidth
         
      )
    }

    arrivedOnTheLeftBorder() {
    return this.invaders.some(
         (invader) => 
             invader.position.x <= 0
         
      )
    }

    getRandomInvader(){
      const index = Math.floor(Math.random() * this.invaders.length)
      return this.invaders[index]
    }

    restart(){
      this.invaders = this.Init()
      this.direction = "right"

    }
}

export default Grid