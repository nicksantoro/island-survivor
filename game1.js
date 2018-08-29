// TODO: 
// 1. Search "pixel art island" to find images to use for the background
// 2. Investigate fruit drawing
// 3. Start working fishing and farming

const FRAMERATE = 60;
const TIME_BETWEEN_FRAMES = 1000 / FRAMERATE;

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

// let x = 800;
// let y = 450;
let dKeyDown = false;
let aKeyDown = false;
let wKeyDown = false;
let zKeyDown = false;
let xFruit = 100 // Math.random() * innerWidth;
let yFruit = 100 // Math.random() * innerHeight;

let banana = new Image();


let character = {

    x: 800,
    y: 450,
    speed: 2,
    name: "",
    health: 100,
    sprite: document.getElementById("characterSprite"),
    // Returns the speed that the character should move at on both axis (x and y) when moving diagonally
    diagonalSpeed: function( ){
        return Math.sqrt(this.speed * this.speed + this.speed * this.speed) / 2;
    },
    draw: function( ) {
        context.drawImage(this.sprite, this.x, this.y, 60, 120)
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

function startGame( ){

    character.name = prompt("Hey there! Before you embark on this adventure give your alien friend a name");

    alert("The year is 1982. " + character.name + " has crash landed on a tropical island and needs your help! Just like us humans, " + character.name + " needs to eat, sleep and survive the elements. Keep " + character.name + " alive until rescued. Good luck!");

    let mainMenu = document.getElementById('mainMenu');
    mainMenu.style.display = 'none';
    
    let mainGame = document.getElementById('mainGame');
    mainGame.style.display = "initial";

    let footer = document.getElementsByTagName('footer')[0];
    footer.style.display = "none";
    
    canvas.style.display = "block";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // AUDIO

    let ocean = new Audio();
    ocean.src="148283__rmutt__oceanwaves-5.wav";
    ocean.play();
    
    // context
    canvas.style.backgroundImage = "url('http://pixeljoint.com/files/icons/full/island.animated.gif')";

    let fruitSprite = document.getElementById("fruitSprite")
    context.drawImage(fruitSprite, xFruit, yFruit, 100, 100);

    
    banana.src="banana.svg";
    context.drawImage(banana, 100, 100, 100, 100)

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

