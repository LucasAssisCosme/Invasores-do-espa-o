class Obstacle {
   constructor(position, witdh, height, color){
    this.position = position
    this.width = witdh
    this.height = height
    this.color = color
   }

   draw(ctx){
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
   }

   hit(Projectile){
           const ProjectilePositionY = Projectile.velocity < 0 ? Projectile.position.y  : Projectile.position.y + Projectile.height
           return (
            Projectile.position.x >= this.position.x   &&
            Projectile.position.x <= this.position.x  + this.width  &&
            ProjectilePositionY >= this.position.y  &&
            ProjectilePositionY <= this.position.y +  this.height
           )
       }

}
   

export default Obstacle;