var mySong;
var myImage=[], state = true;
var myData, people = [];

function preload() {
  mySong = loadSound('/assets/lyq17739.mp3');
  //myImage[0] = loadImage("./assets/1.png");
  //myImage[1] = loadImage("./assets/2.png");
  myImage[2] = loadImage("./assets/3.png");
    var localUrl = './assets/peopleinspace.json'
    myData = loadJSON(localUrl);
}
function setup() {
    createCanvas(windowWidth,windowHeight); 
    
    mySong.play();
  analyser = new p5.Amplitude();
  analyser.setInput(mySong);

    for(var i=0; i < myData.people.length; i++) {
        var thisAstronaut = new Astronaut(myData.people[i].launchdate, myData.people[i].name, myData.people[i].title)
        people.push(thisAstronaut);
    }  
}
function draw() {
    background(23,21,34);
    for(var i=0; i < people.length; i++) {
        people[i].display();
        people[i].move();  
    }
}
function Astronaut(launchDate, name, title) {
    this.launchDate = Date.parse(launchDate);
    this.radius = floor( ((Date.now()-this.launchDate)/(1000*60*60*24))/2 );
    this.name = name;
    this.title = title;
    this.x = random(this.radius+1,width+1-this.radius);
    this.y = random(this.radius+1,height+1-this.radius); 
    this.display = function() {
      noStroke();
        if(this.title == 'Commander') {
            fill(161,161,226,100);
        } else {
            fill(161,161,226,100);
        }
        if(mouseX > this.x-this.radius && mouseX < this.x+this.radius && mouseY > this.y-this.radius && mouseY < this.y+this.radius) {
        fill(255,173,44);
        }
        ellipse(ellipse(this.x,this.y,this.radius*2));
        fill(100,100,220);
        if((mouseIsPressed === true)&&(mouseX > this.x-this.radius && mouseX < this.x+this.radius && mouseY > this.y-this.radius && mouseY < this.y+this.radius)) {
            push();
            textSize(this.radius/3);
            textAlign(CENTER);
            text(this.name,this.x,this.y);
            pop();
          }else{
            image(myImage[2],this.x,this.y,myImage[2].width/4,myImage[2].height/4);
          }
    }   
    this.increment = [1,1]  
    this.move = function() {
        this.x += this.increment[0];
        this.y += this.increment[1];
        
        if(this.x >= width - this.radius || this.x <= this.radius ) {
            this.increment[0] *= -1;
        }
        if(this.y >= height - this.radius || this.y <= this.radius ) {
            this.increment[1] *= -1;
        }
    }   
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
