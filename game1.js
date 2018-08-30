// TODO: 
// 1. Search "pixel art island" to find images to use for the background
// 2. Investigate fruit drawing
// 3. Start working fishing and farming



//////// !!!!!!!!!!!!!   collision: pythagorean theorem calc   !!!!!!!!!!!!!!!!  //////////

// Resources:
// Formula for translating a point:
// https://math.stackexchange.com/questions/143932/calculate-point-given-x-y-angle-and-distance

// TODO (long-term):
// 1. Change the sprite drawing order depending on some variable

/* ----------- FRAMERATE ----------- */

const FRAMERATE = 60;
const TIME_BETWEEN_FRAMES = 1000 / FRAMERATE;

/* ----------- CANVAS ----------- */

// Assign variable to canvas  
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');


/* ----------- COORDINATES ----------- */

// let x = 800;
// let y = 450;
let dKeyDown = false;
let aKeyDown = false;
let wKeyDown = false;
let zKeyDown = false;
let xFruit = Math.random() * innerWidth;
let yFruit = Math.random() * innerHeight;
let xCrab = Math.random() * innerWidth;
let yCrab = Math.random() * innerHeight;

/* ----------- OBJECT ----------- */

const character = {
    
    x: 800, // START POINT X
    y: 450, // START POINT Y
    speed: 2,
    name: "",
    health: 100,
    sprite: document.getElementById("characterSprite"), 
    // Returns the speed that the character should move at on both axis (x and y) when moving diagonally
    diagonalSpeed: function( ){
        return Math.sqrt(this.speed * this.speed + this.speed * this.speed) / 2;
    },
    draw: function( ) {
        context.drawImage(this.sprite, this.x, this.y, 80, 120)
    },
    doSomething: function( ){
        // Inside the definition of any method, you have a "this" variable defined for you
        // It is a reference to the object that owns this method
        this.x;
        this.y;
        this.speed;
        this.name;
        this.health;
    }
}

/* ------------------- FUNCTIONS ------------------- */

// Return the new, translated point in the specified direction to the specified distance
function translatePoint( x, y, direction, distance ) {

    let newPoint = {
        x: x,
        y: y
    };

    newPoint.x = x + Math.sin(direction) * distance;
    newPoint.y = y + Math.cos(direction) * distance;

    return newPoint;
}

/* ----------- START GAME FUNCTION ----------- */

function startGame( ){

    /* ----------- GAME INTRO ----------- */

    character.name = prompt("Hey there! Before you embark on this adventure give this alien a name.");

    if(character.name !== "") {
        alert("The year is 1982. " + character.name + " has crash landed on a tropical island and needs your help! Keep " + character.name + " alive until rescued. Good luck!");
    } else {
        alert("The year is 1982. Our alien friend has crash landed on a tropical island and needs your help. This alien needs to eat, sleep and survive the elements until rescued. Good luck!");
    }

    let mainMenu = document.getElementById('mainMenu');
    mainMenu.style.display = 'none';
    
    let mainGame = document.getElementById('mainGame');
    mainGame.style.display = "initial";

    let footer = document.getElementsByTagName('footer')[0];
    footer.style.display = "none";
    
    canvas.style.display = "block";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

   /* ----------- AUDIO ----------- */

    // let ocean = new Audio();
    // ocean.src="148283__rmutt__oceanwaves-5.wav";
    // ocean.play();
    
    // CONTEXT

    /* ----------- BACKGROUND IMAGE ----------- */

    canvas.style.backgroundImage = "url('http://pixeljoint.com/files/icons/full/island.animated.gif')";

    /* ----------- KEYS / MOVEMENT ----------- */

    document.addEventListener( "keydown", function( event ){
        // console.log(event);
        if(event.keyCode === 68 || event.keyCode === 39) dKeyDown = true; 
        if(event.keyCode === 65 || event.keyCode === 37) aKeyDown = true;
        if(event.keyCode === 87 || event.keyCode === 38) wKeyDown = true;
        if(event.keyCode === 90 || event.keyCode === 40) zKeyDown = true;
    });

    document.addEventListener( "keyup", function ( event ) {
        if(event.keyCode === 68 || event.keyCode === 39) dKeyDown = false;
        if(event.keyCode === 65 || event.keyCode === 37) aKeyDown = false;
        if(event.keyCode === 87 || event.keyCode === 38) wKeyDown = false;
        if(event.keyCode === 90 || event.keyCode === 40) zKeyDown = false;
    })

    setInterval( function( ){

        // If the 'D' key is currently down
        if(dKeyDown === true) character.x += character.speed;   
        // If the 'A' key is currently down
        if(aKeyDown === true) character.x -= character.speed;   
        // If the 'W' key is currently down
        if(wKeyDown === true) character.y -= character.speed;  
        // If the 'Z' key is currently down
        if(zKeyDown === true) character.y += character.speed;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // let fruitSprite = document.getElementById("fruitSprite");
        // for(let i = 0; i < 5; i++) {
        //     let xFruit = Math.random() * innerWidth;
        //     let yFruit = Math.random() * innerHeight;
        //     context.drawImage(fruitSprite, xFruit, yFruit, 100, 100);
        // }

        // for(let i = 0; i < 5; i++) {
        //     let fruitSprite = document.createElement("img")
        //         fruitSprite.setAttribute("src", "banana.svg")
        //         console.log("fruitSprite");
                
        //     let x = Math.random() * innerWidth;
        //     let y = Math.random() * innerHeight;
        //     context.drawImage(fruitSprite, xFruit, yFruit, 100, 100);
        //     let insertionPoint = document.getElementById("mainGame")
        //     insertionPoint
        // }
        
        let destination = translatePoint(xCrab, yCrab, .3, 5);

        xCrab = destination.x;
        yCrab = destination.y;

        //radians

        let crabSprite = document.getElementById("crabSprite");
        context.drawImage(crabSprite, xCrab, yCrab, 100, 100);

        let heartA = document.getElementById("heartA");
        context.drawImage(heartA, 60, 35, 50, 50);

        let heartB = document.getElementById("heartB");
        context.drawImage(heartB, 120, 35, 50, 50);

        let heartC = document.getElementById("heartC");
        context.drawImage(heartC, 180, 35, 50, 50);

        let fruitSprite = document.createElement("img");
        fruitSprite.className = "banana";
        context.drawImage(fruitSprite, xFruit, yFruit, 100, 100);

        character.draw( );

    }, TIME_BETWEEN_FRAMES );

   
}

/*

function doSomethingWithCharacter( characterX, characterY, characterSpeed, characterName, characterHealth ) {
    // ...
}

doSomethingWithCharacter( characterX, characterY, characterSpeed, characterName, characterHealth );
*/

// The above can be accomplished with this...



character.doSomething( );



// HEALTH BAR - HEARTS

// FACTORS: FRUIT, ENEMY, SLEEP


// START WITH 3 FIXED HEARTS
// A LIST OF HEART 1, HEART 2, & HEART 3
// IF CHARACTER TOUCHES ENEMY AND ARRAY LENGTH IS 3, POP HEART 3
 // IF CHARACTER TOUCHES ENEMY, AND THERE ARE 2 HEARTS, POP HEART 2
   // IF CHARACTER TOUCHES ENEMY, AND THERE IS 1 HEART, END GAME

// let health = [heartA, heartB, heartC];

// if(character x and y === enemy x and y && health.length === 3) {
//     health.pop(heartC);
// }

// if(character x and y === enemy x and y && health.length === 2) {
//     health.pop(heartB)
// }

// if(character x and y === enemy x and y && health.length === 1) {
//     alert game over, restart option back to main game
// }

// SCATTERED FRUIT
// IF CHARACTER TOUCHES FRUIT, AND THERE ARE 3 HEARTS, NOTHING HAPPENS
// IF CHARACTER TOCHERS FRUIT, AND THERE ARE 2 HEARTS, PUSH HEART 3
  // IF CHARACTER TOUCHES FRUIT, AND THERE IS 1 HEART, PUSH HEART 2

// IF YOU TOUCH CHERRY
// RESET TO FULL HEALTH


// if(character x and y === fruit x and y && health.length === 3) {
//     nothing happens;
// }

// if(character x and y === fruit x and y && health.length === 2) {
//     health.push(heartC)
// }

// if(character x and y === fruit x and y && health.length === 1) {
//     health.push(heartB)
// }

// TIMER
// SET A TIMER - 24 HOUR CLOCK.
// IF CHARACTER DOESN'T EAT A FRUIT EVERY 3 HOURS, POP HEARTS
// START CONDITION ONCE 3RD HOUR STARTS
// FIRST 6TH HOUR, IF NO FRUIT HAS BEEN TOUCHED, POP HEART 3;
// EVRERY THIRD HOUR, IF NO FRUIT HAS BEEN TOUCHED, POP 
