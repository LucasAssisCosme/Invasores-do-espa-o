import Invaders from "./Invader.js"



class Grid {
   constructor(rows, cols){
      this.rows = rows
      this.cols = cols
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
}

export default Grid