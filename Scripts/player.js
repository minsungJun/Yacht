
function player(ch){
  this.now_score = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0];
  this.maybe = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0];
  this.play = [0,0,0,0,0, 0,1,0,0,0, 0,0,0,0,1];
  this.mouse = [0,0,0,0,0, 0,1,0,0,0, 0,0,0,0,1];
  this.turn = ch;
  this.yachzee = 0;

  this.fraud = function(){
    if(this.yachzee != 0){
      var a = 0;
      for(var j=0; j<5; j++){
        if(dice[a] != dice[j])break;
        if(j==4)this.now_score[12] += 50;
      }
    }
  }
  this.endturn = function(i, total, input){
    this.fraud();
    this.now_score[i] = total;
    this.play[i]++;
    this.score();
    this.homework();
    NextTurn();
  }
  this.number = function(num, input){
    if(reroll === 0 || this.play[num]!==0)return;
    if(this.turn == turn){
      var total = 0;
      for(var i=0; i<5; i++){
        if(dice[i] == num+1) total += dice[i];
      }
      if(input == undefined)this.endturn(num , total);
      else this.maybe[num] = total;
    }
  }

  this.homework = function homework(){
    if(this.now_score[0]+this.now_score[1]+this.now_score[2]+this.now_score[3]+this.now_score[4]+this.now_score[5] >= 63){
      this.now_score[6] = 35;
      this.score();
    }
    else {
      this.maybe[6] = this.now_score[0] + this.now_score[1] + this.now_score[2] + this.now_score[3] + this.now_score[4] + this.now_score[5];
    }
  }

  this.triple = function triple(input){
    if(reroll == 0 || this.play[7] != 0)return;
    if(this.turn == turn){
      var total = 0;
      var temp = [...dice];
      temp.sort((a,b) => a-b);
      for(var i=1; i<4; i++){
        if(temp[i]===temp[i-1] && temp[i]===temp[i+1]){
          for(var j=0; j<5; j++){
            total += dice[j];
          }
          break;
        }
      }
      if(input == undefined)this.endturn(7, total);
      else this.maybe[7] = total;
    }
  }

  this.fourcard = function fourcard(input){
    if(reroll == 0 || this.play[8] != 0)return;
    if(this.turn == turn){
      var total = 0;
      var temp = [...dice];
      temp.sort((a,b) => a-b);

        if(temp[0]===temp[3] || temp[1]===temp[4]){
          for(var j=0; j<5; j++){
            total += dice[j];
          }
        }

      if(input == undefined)this.endturn(8, total);
      else this.maybe[8] = total;
    }
  }

  this.fullhouse = function fullhouse(input){
    if(reroll == 0 || this.play[9] != 0)return;
    if(this.turn == turn){
      var total = 0;
      var temp = [...dice];
      temp.sort((a,b) => a-b);

        if( ( (temp[0]===temp[1]&&temp[1]===temp[2]) && (temp[3]===temp[4]) ) || ( (temp[2]===temp[3]&&temp[3]===temp[4]) && (temp[0]===temp[1]) ) ) {
          for(var j=0; j<5; j++){
            total += dice[j];
          }
        }

      if(input == undefined)this.endturn(9, total);
      else this.maybe[9] = total;
    }
  }

  this.Sstraight = function Sstraight(input){
    if(reroll == 0 || this.play[10] != 0)return;
    if(this.turn == turn){
      var total = 0;
        if( (dice.includes(1)&&dice.includes(2)&&dice.includes(3)&&dice.includes(4)) ||
      (dice.includes(5)&&dice.includes(2)&&dice.includes(3)&&dice.includes(4)) ||
    (dice.includes(5)&&dice.includes(6)&&dice.includes(3)&&dice.includes(4)) ) {
            total = 15;
        }

      if(input == undefined)this.endturn(10, total);
      else this.maybe[10] = total;
    }
  }

  this.Lstraight = function Lstraight(input){
    if(reroll == 0 || this.play[11] != 0)return;
    if(this.turn == turn){
      var total = 0;
        if( (dice.includes(1)&&dice.includes(2)&&dice.includes(3)&&dice.includes(4)&&dice.includes(5)) ||
      (dice.includes(5)&&dice.includes(2)&&dice.includes(3)&&dice.includes(4)&&dice.includes(6))  ) {
            total = 30;
        }

      if(input == undefined)this.endturn(11, total);
      else this.maybe[11] = total;
    }
  }


    this.yachu = function yachu(input){
      if(reroll == 0 || this.play[12] != 0)return;
      if(this.turn == turn){
        var total = 0;
        var i = 0
        for(var j=0; j<5; j++){
          if(dice[i] != dice[j])break;
          if(j==4){
            total = 50;
            this.yachzee++;
          }
        }
        if(input == undefined)this.endturn(12, total);
        else this.maybe[12] = total;
      }
    }



  this.chance = function chance(input){
    if(reroll == 0 || this.play[13] != 0)return;
    if(this.turn == turn){
      var total = 0;
      for(var j=0; j<5; j++){
        total += dice[j];
      }

      if(input == undefined)this.endturn(13, total);
      else this.maybe[13] = total;
    }
  }

  this.can_get_score = function(){
    for(let i = 0; i<6; i++){
      this.number(i, true);
    }
    this.homework(true);
    this.triple(true);
    this.fourcard(true);
    this.fullhouse(true);
    this.Sstraight(true);
    this.Lstraight(true);
    this.yachu(true);
    this.chance(true);
  }

  this.score = function socre(){
    this.now_score[14] = 0;
    for(var i=0; i<(this.now_score.length)-1; i++){
      this.now_score[14]+=this.now_score[i];
    }
  }
}
