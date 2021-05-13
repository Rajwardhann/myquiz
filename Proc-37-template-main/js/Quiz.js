class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill("blue")
    textSize(20);
   
    var title = createElement('h1')
    title.html("Result Of The Quiz");
    title.position(displayWidth/2 -375,displayHeight -770);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    
    if(allContestants !== undefined)
    {
      var display_Answers = 230;
      fill("blue");
      textSize(20);
      text("Note : the player name in green color gave correct answer",200,500);

      for(var plr in allContestants)
      {
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
          fill("green");
        else
          fill("red");

          display_Answers += 30
          textSize(20);
          text(allContestants[plr].name + ":"+ allContestants[plr].answer,200,display_Answers)
      }
    }

    
  }

}
