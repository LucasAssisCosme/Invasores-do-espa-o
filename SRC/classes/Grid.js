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

   uptade(){
       if(chegouNaBordaDireita){
          this.direction = "left"
          this.moveDown = true
       }
       else if(chegouNaBordaEsquerda){
         this.direction = "right"
         this.moveDown = true
       }

      this.invaders.forEach((invader) => {

         if(this.moveDown){
            invader.moveDown()
         }

         if(this.direction === "right") invader.moveRight()
         if(this.direction === "left") invader.moveLeft()
      })

      this.moveDown = false
   }
}

export default Grid