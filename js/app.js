/*
 * Create a list that holds all of your cards
 */
 var cards=["diamond","bicycle","bomb","anchor","paper-plane-o","cube","leaf","bolt","diamond","bicycle","bomb","anchor","paper-plane-o","cube","leaf","bolt"];
 var cardsOpened=[];
 var currentTime;
 var seconds=0;
 var moves=0;
 var retinitalizemove=$(".moves");
 var matches;
 var starRatings=$(".fa-star");
 var timer=$(".timer");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function startGame(){
shuffle(cards);
moves=0;
matches=0;
retinitalizemove.text("0");
starRatings.addClass(".fa-star").removeClass(".fa-star-o");
$('.deck').empty();
for(var i=0;i<cards.length;i++){
  $('.deck').append($('<li class="card"><i class="fa fa-'+cards[i]+'"></i></li>"'));
}
startTimer();

$(".card").addClass("close");
$(".card").on('click',function(){
  $(this).toggleClass("close").toggleClass("open show");
  $(".moves").empty();
  moves++;
  $(".moves").append(moves);
  var card=$(this).html().toString();
  var cardnew;
  for(var i=0;i<cards.length;i++){
    if(card.indexOf(cards[i])!==-1){
      cardnew=cards[i];
    }
  }
  cardsOpened.push(cardnew);
  if(cardsOpened.length>1){
       if(cardnew==cardsOpened[0]){
         $(this).toggleClass("open show").toggleClass("match");
       }
       else {
         $(this).toggleClass("match").toggleClass("notmatch");
       }
  }
});
}
function startTimer(){
 currentTime = setInterval(function(){
   timer.text(`${seconds}`);
   seconds=seconds+1;
 },1000);
}
$("header").on("click",function(){
  clearInterval(currentTime);
});

startGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
