//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, happyDogIMG;
database = firebase.database;

function preload()
{
  dogIMG = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,40,40)
  dog.addImage("dog",dogIMG);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87)

  textSize(12);
  fill("white");
  stroke(2);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }

  text("Note: Press UP_ARROW Key To Feed Drago Milk!",120,480);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}



