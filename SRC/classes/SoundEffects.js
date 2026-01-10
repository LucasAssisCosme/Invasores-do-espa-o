class SoundEffects {
  constructor() {
    this.shootSounds = [
        new Audio("SRC/assets/audios/shoot.mp3"),
        new Audio("SRC/assets/audios/shoot.mp3"),
        new Audio("SRC/assets/audios/shoot.mp3"),
        new Audio("SRC/assets/audios/shoot.mp3"),
        new Audio("SRC/assets/audios/shoot.mp3"),
    ]
    this.hitSounds = [
        new Audio("SRC/assets/audios/hit.mp3"),
        new Audio("SRC/assets/audios/hit.mp3"),
        new Audio("SRC/assets/audios/hit.mp3"),
        new Audio("SRC/assets/audios/hit.mp3"),
        new Audio("SRC/assets/audios/hit.mp3"),
    ]

    this.gameOverSound = new Audio("SRC/assets/audios/explosion.mp3")
    this.nextLevelSound = new Audio("SRC/assets/audios/next_level.mp3")

    this.currentShootSound = 0
    this.currentHitSound = 0

    this.adjusteVolume()
  }

    playShootSound(){ 
        this.shootSounds[this.currentShootSound].currentTime = 0
        this.shootSounds[this.currentShootSound].play()
        this.currentShootSound =  (this.currentShootSound + 1) % this.shootSounds.length
    }

    playHitSound(){ 
        this.hitSounds[this.currentHitSound].currentTime = 0
        this.hitSounds[this.currentHitSound].play()
        this.currentHitSound =  (this.currentHitSound + 1) % this.hitSounds.length
    }


  playExplosionSound(){
    this.gameOverSound.play()
  }
  playNextLevelSound(){
    this.nextLevelSound.play()
  }

  adjusteVolume(){
   this.hitSounds.forEach(sound => sound.volume = 0.2)
   this.shootSounds.forEach(sound => sound.volume = 0.5)

    this.gameOverSound.volume = 0.2
    this.nextLevelSound.volume = 0.4
  }

}


export default SoundEffects