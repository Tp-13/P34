//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, happyDogIMG;
database = firebase.database;

function preload()
{
  dogIMG = loadAnimation("images/Dog.png");
  happyDog = loadAnimation("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,40,40)
  dog.addAnimation("dog",dogIMG);
  dog.addAnimation("dogHappy",happyDog);
  dog.scale = 0.25;
}


function draw() {  
  background(46,139,87)

  textSize(12);
  fill("white");
  stroke(2);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeAnimation("dogHappy",happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.changeAnimation("dog",dogIMG);
  }

  text("Note: Press UP_ARROW Key To Feed Drago Milk!",120,480);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  console.log(foodS)
}

function writeStock(x){
  console.log("x"+ x)
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



