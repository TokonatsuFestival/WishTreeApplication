function preload () {
  loadedTags = loadJSON("https://<API-GATEWAY-ADDRESS>/<STAGE>/getTagsForWishTree");
  //console.log(loadedTags);
}

function getXYCoordsForArea(area){
  obj = {};
  switch (area) {
    case 0:
      obj["x"] = 1400;
      obj["y"] = 1550;
      break;
    case 1:
      obj["x"] = 3700;
      obj["y"] = 1550;
      break;
    case 2:
      obj["x"] = 1400;
      obj["y"] = 1920;
      break;
    case 3:
      obj["x"] = 3700;
      obj["y"] = 1920;
      break;
    case 4:
      obj["x"] = 1400;
      obj["y"] = 2280;
      break;
    case 5:
      obj["x"] = 3700;
      obj["y"] = 2280;
      break;
    case 6:
      obj["x"] = 1400;
      obj["y"] = 2640;
      break;
    case 7:
      obj["x"] = 3700;
      obj["y"] = 2640;
      break;
  }
  return obj;
}
  
  function setup() {
    bg = loadImage('../img/wishshrine.png');
    frameRate(15);
    let canvasDiv = document.getElementById('Shrine');
    let width     = canvasDiv.offsetWidth;
    var canvas    = createCanvas(width, 750);
    canvas.parent('Shrine');
    usedScale     = 0.2;
    tags          = [[], [], [], [], [], [], [], []];

    //document.getElementById('debug').innerHTML = "Number of Tags: " + loadedTags.body.length;
    //console.log("Number of tags: " + Object.keys(loadedTags).length);
    ori = [0,1]
    areas = [0,1,2,3,4,5,6,7];
    for (i = 0; i < Object.keys(loadedTags).length; i++) {
        let area      = random(areas);
        let tagCount  = tags[area].length;
        let coords    = getXYCoordsForArea(area);
        x             = coords["x"] + (40*tagCount);
        y             = coords["y"];
        tags[area][tagCount] = new tag (x, y, loadedTags[i].Description, random(ori), usedScale);
        //console.log("Tag:" + i  + " CX: " + tags[area][tagCount].cX + " CY: " + tags[area][tagCount].cY);
    }
    currentW = 60;
    movement = 1;
    minW = 40;
    maxW = 80;
    //console.log(tags);
  }
  
  function draw() {
    //background('rgba(1,1,1,0)');
    background(bg);
    scale(usedScale);
    bigTag = "";
    bigTagArea = "";
    if (movement == 1 && currentW < maxW) {
      currentW ++; 
    }
    if (movement == 0 && currentW > minW) {
      currentW --;
    }
    if (movement == 1 && currentW == maxW) {
      movement = 0;
    } 
    if (movement == 0 && currentW == minW) {
      movement = 1; 
    }
    for (areaCount = 0; areaCount < tags.length; areaCount++) {
      for (i = 0 ; i < tags[areaCount].length; i++) {
        stroke('black');
        if (tags[areaCount][i] !== undefined) {
          tags[areaCount][i].drawShapeSide(currentW);
        
          if (currentW > 60 && currentW < 81 ){
            translate(0, 0, i-2);
          } else {
            translate(0, 0, i+1);
          }

          if (tags[areaCount][i].drawBigTag === 1) { 
            bigTag = i;
            bigTagArea = areaCount;
          }
        }
      }
    }
    if (bigTag !== "") {
      //translate(0,0, 1000);
      tags[bigTagArea][bigTag].drawShapeFlat();
    }
  }

  function mousePressed ()  {
    if (bigTagArea !== '' && bigTag !== '') 
      tags[bigTagArea][bigTag].unselectTag();
    for (i = 0 ; i < tags.length; i++) {
      for (j = 0; j < tags[i].length; j++) {
        tags[i][j].tagSelected();
      }
    }
  }
  
 
  class tag {
    constructor(x, y, description, orientation, scaleModifier) {
      this.x = x;
      this.y = y;
      this.cX = (this.x + 60) * scaleModifier;
      this.cY = (this.y + 90) * scaleModifier;
      this.description = description;
      this.orientation = orientation;
      this.colour = color(255,0,0);

      // Big Tag Measurements
      this.drawBigTag = 0;
      this.bX = 60 / scaleModifier;
      this.bY = 60 / scaleModifier;
      this.height = 400 / scaleModifier;
      this.length = 700 / scaleModifier;
    }


    drawShapeFlat() {
      fill(this.colour);
      beginShape();
      vertex(this.bX,this.bY);
      vertex(this.bX + this.length, this.bY);
      vertex((this.bX + this.length) + this.length / 1.2, this.bY + (this.height /4 ) );
      vertex((this.bX + this.length) + this.length / 1.2, this.bY + this.height - (this.height /4) );
      vertex(this.bX + this.length, this.bY + this.height);
      vertex(this.bX, this.bY + this.height);
      endShape(CLOSE);
      fill(255);
      beginShape();
        vertex(this.bX + 50, this.bY + 50);
        vertex(this.bX + (this.length - 50), this.bY + 50);
        vertex(this.bX + (this.length - 50), this.bY + this.height - 50);
        vertex(this.bX + 50, this.bY + this.height - 50);
      endShape(CLOSE);

      textSize(132);
      fill(0);
      text(this.description, this.bX + 50 , this.bY + 180), this.bX + length - 100, this.bY + height - 80;
    }

    unselectTag() {
      this.drawBigTag = 0;
    }

    tagSelected() {
      var d = dist(mouseX, mouseY, this.cX, this.cY);
      if (d < 10){
        //this.colour = color(0,255,0);
        this.drawBigTag = 1;
      }
    }

    drawShapeSide(width) {
      fill(this.colour);
      //outside Shape
      beginShape();
        //vertex(0,0);
        vertex(this.x + width, this.y + 0);
        vertex(this.x + 40 + (width / 3), this.y -90);
        vertex(this.x + 80 - (width / 3), this.y -90);
        vertex(this.x + 120-width, this.y + 0);
        vertex(this.x + 120-width, this.y + 225);
        vertex(this.x + width, this.y + 225);
      endShape(CLOSE);
      

      // White part of the Tag
      let displayWidthFormula = (width/1.5);
      let displayWidthCalc = 20 + (width/1.5);
      if (displayWidthCalc < 60 && this.orientation == 0) {
        fill(255);
        beginShape();
        vertex(this.x + 20 + displayWidthFormula, this.y + 20);
        vertex(this.x + 100 - displayWidthFormula, this.y + 20);
        vertex(this.x + 100 - displayWidthFormula, this.y + 205);
        vertex(this.x + 20 + displayWidthFormula, this.y + 205);
        endShape(CLOSE);
      }
      
      if (displayWidthCalc > 60 && this.orientation == 1) {
        fill(255);
        beginShape();
        vertex(this.x + 20 + displayWidthFormula, this.y + 20);
        vertex(this.x + 100 - displayWidthFormula, this.y + 20);
        vertex(this.x + 100 - displayWidthFormula, this.y + 205);
        vertex(this.x + 20 + displayWidthFormula, this.y + 205);
        endShape(CLOSE);
      }

      
      stroke('white');

    }
  }