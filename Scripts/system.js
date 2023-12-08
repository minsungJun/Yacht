
let turn = 0;
let reroll = 0;
let dice = [0,0,0,0,0];
let check = [0,0,0,0,0];

function roll(){
  console.log('roll');
  var temp = 0;
  for(var i=0; i<5; i++){
    if(check[i] == 0){
      tmp = Math.random()*6 + 1;
      console.log('D'+(i+1)+'= '+tmp);
      dice[i] = parseInt(tmp);
      if(dice[i]==7)roll();
    }
    else continue;
  }
}

function checklock(i){
  if(reroll==0)return;
  if(check[i-1]==0)check[i-1]=1;
  else check[i-1]=0;
  color();
}

function DiceRoll(){
    if(reroll == 3)return;
    roll();
    reroll++;
    refresh();
    gameover();
}

function NextTurn(){
  turn++;
  turn = turn % 2;
  reroll = 0;
  for(var i=0; i<5; i++){
    check[i]=0;
    dice[i] = 'D'+String(i+1);
  }
  color();
  refresh();
  gameover();
}

function color(){
  for(var i=0;i<5;i++){
    if(check[i] == 1)document.getElementById('d'+String(i+1)).style.background = 'rgb(255,100,100)';
    if(check[i] == 0)document.getElementById('d'+String(i+1)).style.background = 'rgb(255,255,255)';
  }
  for(var i=0;i<player2.play.length;i++){
    if(player1.play[i]==1) document.getElementById('p1'+String(i+1)).style.background = 'rgb(195,195,195)';
    if(player2.play[i]==1) document.getElementById('p2'+String(i+1)).style.background = 'rgb(195,195,195)';
  }
  if(turn == 0){
    player_1.style.background = 'rgb(181,230,29)';
    player_2.style.background = 'rgb(255,255,255)';
  }
  if(turn == 1){
    player_2.style.background = 'rgb(181,230,29)';
    player_1.style.background = 'rgb(255,255,255)';
  }
  if(reroll == 0)rollcnt.style.background = 'rgb(255,255,255)';
  if(reroll == 3)rollcnt.style.background = 'rgb(255,0,0)';
}

function color2(){
  if(reroll==0)return;
  for(var i=0;i<player2.play.length;i++){
    if(player1.mouse[i]==1&&player1.play[i]==0)document.getElementById('p1'+String(i+1)).style.background = 'rgb(155,155,155)';
    if(player1.mouse[i]==0&&player1.play[i]==0)document.getElementById('p1'+String(i+1)).style.background = 'rgb(255,255,255)';
    if(player2.mouse[i]==1&&player2.play[i]==0)document.getElementById('p2'+String(i+1)).style.background = 'rgb(155,155,155)';
    if(player2.mouse[i]==0&&player2.play[i]==0)document.getElementById('p2'+String(i+1)).style.background = 'rgb(255,255,255)';
  }
}

function refresh(){
  color();
  for(var i=0;i<5;i++){
    document.getElementById('d'+String(i+1)).innerHTML = dice[i];
  }
  document.getElementById('rollcnt').innerHTML='DiceRoll('+(reroll)+'/3)';
  player1.can_get_score();
  player2.can_get_score();
  for(var j=0;j<15;j++){
    let str = '<p id=p1>'
    let str2 = '<p id=p1>'
    if(turn === 0){
      if(player1.now_score[6] === 0 && reroll !== 0){
        str2 += '~' + player1.maybe[6] + '</p>';
        document.getElementById('p17').innerHTML=str2;
      }
      if(player1.play[j] === 0 && reroll !== 0){
        str += '( +' + player1.maybe[j] +' )' + '</p>';
        document.getElementById('p1'+String(j+1)).innerHTML=str;
      }
      else {
        document.getElementById('p1'+String(j+1)).innerHTML = player1.now_score[j];
      }
      document.getElementById('p2'+String(j+1)).innerHTML = player2.now_score[j];
    }
    if(turn === 1){
      if(player2.now_score[6] === 0 && reroll !== 0){
        str2 += '~' + player2.maybe[6] + '</p>';
        document.getElementById('p27').innerHTML=str2;
      }
      if(player2.play[j] === 0 && reroll !== 0){
        str += '( +' + player2.maybe[j] +' )' + '</p>';
        document.getElementById('p2'+String(j+1)).innerHTML=str;
      }
      else {
        document.getElementById('p2'+String(j+1)).innerHTML = player2.now_score[j];
      }
      document.getElementById('p1'+String(j+1)).innerHTML = player1.now_score[j];
    }

  }
}

function gameover(){
  if(!player1.play.includes(0) && !player2.play.includes(0)){
    alert('!!!Game Over!!!');
  }
}
