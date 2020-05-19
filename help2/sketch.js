var database
var drawing = [];
var cp =[];
var isDraw = false
var canvas
var save;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.mousePressed(sp)
 canvas.mouseReleased(ep)
 canvas.parent("canvascontainer")
  
  saveButton = createButton("save");
  saveButton.mousePressed(saveDraw);
 
  database = firebase.database();
  var ref1 = database.ref('drawings')
  ref1.on('value',gotData,errData);
 
}
function sp(){
  isDraw = true
  cp = []
  drawing.push(cp);
}
function ep(){
  isDraw = false
}
function clearDrawing(){
  drawing = [];
}

function draw() {
  background(0);
  if(isDraw === true){
    var point = {
      x : mouseX,
      y : mouseY
    };
    cp.push(point);
  }

  
  stroke("teal");
  strokeWeight(4);
  noFill();
  
  for(i = 0;i < drawing.length; i++){
    var line = drawing[i];
    beginShape();
    for(j = 0;j < line.length;j++){

    
    vertex(line[j].x,line[j].y);
    
    endShape();
    }
  }
   
}

function saveDraw(){
  var ref = database.ref('drawings');
  var data = {
    name : "your Drawing",
    drawing : drawing
  }
  var result = ref.push(data,sent);
  console.log(result.key);
  function sent(err,status){
    console.log(status);
  }
}
function gotData(data){
   var drawings = data.val();
   var keys = [Object.keys(drawings)];
   for(var i;i < keys.length;i+=1){
     var key = keys[i];
     
    
   }
    var li = createElement("li",'');
     var ahref = createA("#",keys);
    
     ahref.parent(li);
     li.parent('drawingList')
     
   
}

function errData(err){
   console.log(err)
}



