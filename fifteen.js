PostionsOnBoard=[[0,0],[0,100],[0,200],[0,300],[100,0],[100,100],[100,200],[100,300],[200,0],[200,100],[200,200],[200,300],[300,0],[300,100],[300,200],[300,300]];
 /*stores  possbile postions a tile can on have a board*/

//               tile 1  tile 2  tile 3  tile 4  tile 5   tile 6    tile 7    tile 8   tile 9   tile 10   tile 11   tile 12  tile 13  tile 14   tile 15  Blank
tileXYPostion=[[0,0],[0,100],[0,200],[0,300],[100,0],[100,100],[100,200],[100,300],[200,0],[200,100],[200,200],[200,300],[300,0],[300,100],[300,300],[300,200]];
 /*stores xy postion of a tile, tile 1 is index 0 so if index 0==[200,200] tileXYPostion is checked  compared to PostionsOnBoard and would be in location 10 on the board */
 cached=[[0,0],[0,100],[0,200],[0,300],[100,0],[100,100],[100,200],[100,300],[200,0],[200,100],[200,200],[200,300],[300,0],[300,300],[300,100],[300,200]];




$(function(){
var puzzleArea = $("#puzzlearea");
var tiles = $("#puzzlearea").children();// each child div is saved as tiles
$('.puzzlepiece').css('background-image','url( https://www.google.com.jm/search?hl=en&tbm=isch&source=hp&biw=2560&bih=1336&ei=drXjW4aqHMWBzwKnyae4Bg&q=sonic&oq=sonic&gs_l=img.3..0l10.2160.2528.0.2829.5.5.0.0.0.0.154.509.4j1.5.0....0...1ac.1.64.img..0.5.508....0.0R14wttnVLQ#imgrc=Ljy7mgPXMbSmxM:');


boardUpdate(tiles,tileXYPostion);//sets up board to default



$('#shufflebutton').click(function(){//------------------------------------- not complete
  tileXYPostion=cached;
  boardUpdate(tiles,tileXYPostion);//sets up board to default
});


$(".puzzlepiece").mouseenter(function(){
  var selectedTile =$(this);

  xyPos   = $(this).css("top").replace("px","")+","+$(this).css("left").replace("px","");
  /* gets x(left css Postion) and y(Top css Postion) cord of tiles. the postions.the values are return as an int but are converted to string and the 'px' is
  replaced with a blankSpace*/

  blank=withIn(tileXYPostion[15].toString(),PostionsOnBoard);//finds the blank space on the board
  postion=withIn(xyPos,PostionsOnBoard);//finds postion  of the tile currently hovering over

  isMoveAble(blank,postion,selectedTile);

 if ($(this).hasClass( "movablepiece" )){
  $(this).click(function(){
    blank=withIn(tileXYPostion[15].toString(),tileXYPostion);//finds xy cords of the blankSpace
    postion=withIn(xyPos,tileXYPostion);//finds xy cords of the tile currently hovering over
    moveTile(postion,blank,tileXYPostion,tiles);
    });
}
});


});

function moveTile(postion,blank,array,tiles) {

var newBlank    = tileXYPostion[postion];
console.log("---------------------------1-----------------------");
console.log(newBlank);
tileXYPostion[postion]  = tileXYPostion[blank];
console.log("---------------------------2-----------------------");
console.log(tileXYPostion[postion]);
tileXYPostion[blank]    = newBlank;
console.log("---------------------------3-----------------------");
console.log(tileXYPostion[blank]);
console.log("---------------------------4-----------------------");


boardUpdate(tiles,tileXYPostion);

if (tileXYPostion.toString()==PostionsOnBoard.toString()){
  $("#puzzlearea").css("background-color","green");
  $("h1").text("YOU WIN!! :D");
}
}


function isMoveAble(int,blankSpace,$selectedTile){

$.each($selectedTile, function() {
  if (int - 4 ==  blankSpace){
  $(this).addClass("movablepiece");
  console.log('can move');
  return true;
}else if (int + 4 ==   blankSpace) {
  $(this).addClass("movablepiece");
  console.log('can move');
  return true;
}else if (int - 1 == blankSpace) {
  $(this).addClass("movablepiece");
  console.log('can move');
  return true;
}else if (int + 1 ==blankSpace){
  $(this).addClass("movablepiece");
  console.log('can move');
  return true;
  }

  });
}


function withIn(string,array){ // locates postion of tile on board
  for (var b  =0 ; b < array.length; b++){
  checker=array[b].toString();

    if (string == checker) {
      /*elements in the array were set to string so that i could swerve around the problem of not being able to compare arrays*/
      console.log(string);
      console.log(checker);
      console.log(b);
      return b;
    }
  }
}

function boardUpdate($tiles,array) { //updates board also places tiles in a gird on the board
  console.log(array);
  $.each($tiles, function( index, value ) {
    $(this).addClass("puzzlepiece");// each tile
    $(this).css("top",array[index][0]);
    $(this).css("left",array[index][1]);

  });
}
