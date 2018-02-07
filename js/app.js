//list of variables
 var cards=["diamond","bicycle","bomb","anchor","paper-plane-o","cube","leaf","bolt","diamond","bicycle","bomb","anchor","paper-plane-o","cube","leaf","bolt"];
 var cardsOpened=[];
 var currentTime;
 var seconds=0;
 var moves=0;
 var retinitalizemove=$(".moves");
 var matches;
 var starRatings=$(".fa-star");
 var timer=$(".timer");
 var _moves=$(".moves");
 var two_star_rating=16;
 var one_star_rating=24;
 var restartbutton= $(".fa-repeat");
 var totalcards=cards.length/2;
 var message=$(".message");
 var deck=$(".deck");
 var clicks=0;

//function to shuffle cards
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

//starting the game
function startGame(){
        shuffle(cards);
        moves=0;
        matches=0;
        message.empty();
        cardsOpened=[];
        retinitalizemove.text("0");
        starRatings.removeClass("fa-star-o").addClass("fa-star");
        deck.empty();
        for(var i=0;i<cards.length;i++){
                 deck.append($('<li class="card"><i class="fa fa-'+cards[i]+'"></i></li>"'));
            }
        cardSensor();
        stopTimer(currentTime);
        seconds=0;
        timer.text(`${seconds}`);
}

//staring the timer
function startTimer(time){
        currentTime = setInterval(function(){
        timer.text(`${seconds}`);
        seconds=seconds+1;
      },1000);
}

//restarting the game
restartbutton.on('click', function () {
        clicks=0;
        message.append("<h1> Are you sure ? </h1> <h1> Your progress will be lost. </h1>");
        openModal();
  });

//stopping the timer
function stopTimer(timer){
        if(timer){
             clearInterval(timer);
        }
}

//function to rate stars on the basis of moves
function setRating(moves){
        var stars;
        if(moves<two_star_rating){
          stars=3;
        }
        if(moves===two_star_rating){
                starRatings.eq(2).removeClass("fa-star").addClass("fa-star-o");
                stars=2;
        }
        if(moves>two_star_rating&&moves<one_star_rating){
          stars=2;
        }
        if(moves===one_star_rating){
                starRatings.eq(1).removeClass("fa-star").addClass("fa-star-o");
                stars=1;
         }
         if(moves>one_star_rating){
           stars=1;
         }
    return stars;
}

//card action taking place here
function cardSensor(){
         $(".card").addClass("close");
         $(".card").on('click',function(e){
           clicks+=1;
           if(clicks===1){
             startTimer();
           }
         if($(this).hasClass("match")===true||$(this).hasClass("show")===true){
                return true;
         }
         $(this).removeClass("close").addClass("open show");
         var card=$(this).html().toString();
         var cardnew;
         for(var i=0;i<cards.length;i++){
              if(card.indexOf(cards[i])!==-1){
                    cardnew=cards[i];
              }
         }
         cardsOpened.push(cardnew);
         if(cardsOpened.length>1){
              if(cardnew===cardsOpened[0]){
              deck.find(".open").removeClass("open show").addClass("match");
                     matches++;
         }
         else {
              deck.find(".open").addClass("notmatch");
              setTimeout(function(){
                    deck.find(".open").removeClass("open show notmatch").addClass("close");
              },600);
         }
         cardsOpened=[];
         _moves.empty();
         moves++;
         _moves.append(moves);
         var result=setRating(moves);
         }
    if(totalcards===matches){
         stopTimer(currentTime);
         setRating(moves);
         result=setRating(moves);
         setTimeout(function(){
         endGame(moves,result);
         },600);
    }
  });
}

//winning message displayed
function endGame(moves, score) {
     openModal();
     if(score===1)
     {
     message.append("<h1> Congratulations! You are the winner!</h1> <h4> You have won with "+moves+" moves and "+score+" star in "+(seconds-1)+" seconds.</h4> ");
     }
     else{
        message.append("<h1> Congratulations! </h1> <h4> You have won with "+moves+" moves and "+score+" stars in "+(seconds-1)+" seconds.</h4> ");
     }
}

//Get Modal element
var modal = document.getElementById("simpleModal");
//Get open modal button
var modalBtn= document.getElementById("modalBtn");
//Get close modal button
var closeBtn= document.getElementById("closeBtn");
//Get restartgame button
var restartBtn= document.getElementById("restartBtn");
//listen for click
modalBtn.addEventListener("click",openModal);
//listen for click for close
closeBtn.addEventListener("click",closeModal);
//listen for outside click
window.addEventListener("click",outsideClick);
//listen for restarting game
restartBtn.addEventListener("click",restartGame);
//Function to open modalBtn
function openModal(){
  modal.style.display = 'block';
}
//Function to open modalBtn
function closeModal(){
  modal.style.display = 'none';
  message.empty();
}
//Function for outside click
function outsideClick(e){
  if(e.target == modal){
        modal.style.display = 'none';
        message.empty();
  }
}
//function for restart button functionality
function restartGame(){
  startGame();
  modal.style.display= 'none';
  message.empty();
}

startGame();
