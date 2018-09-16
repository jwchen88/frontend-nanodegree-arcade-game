let rows = [83 - 20, 83 * 2 - 20, 83 * 3 - 20];
let cols=[0,101,101*2,101*3,101*4]

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * - 500;
    this.y = rows[Math.floor(Math.random() * rows.length)];
    this.speed = Math.random() * 400 + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x + 101 * 0.8 >= player.x && this.x <= player.x && this.y + 83 * 0.2 >= player.y && this.y - 83 * 0.2 <= player.y) {
      player.lose();
    }

    this.x += this.speed * dt;

    if (this.x > 505) {
      this.x = Math.random() * - 400;
      this.y = rows[Math.floor(Math.random() * rows.length)];
    }
  };

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}

const bug1= new Enemy();
const bug2= new Enemy();
const bug3= new Enemy();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(){
    this.x=101*2;
    this.y=83*5-20;
    this.sprite='images/char-boy.png';
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  update(){
    for(let enemy of allEnemies){
      if(this.y===enemy.y && (enemy.x + 101 > this.x && enemy.x < this.x +101/2)){
        player.lose();
      }
    }
  }

  lose(){
    this.x=cols[2];
    this.y=83*5-20;
  }

  //player controller
  handleInput(input){
    switch(input){
      case 'up':this.y -= 83;
      break;
      case 'down':this.y += 83;
      break;
      case 'left':this.x -= 101;
      break;
      case 'right':this.x += 101;
      break;
    }

    //player can't be out of the game board
    if(this.y<=20){
      this.y=-20;
      alert('WIN');
    }
    if(this.y>395){
      this.y=395;
    }
    if(this.x<0){
      this.x=0;
    }
    if(this.x>404){
      this.x=404;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player= new Player();
const allEnemies=[];
allEnemies.push(bug1, bug2, bug3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
