$('.red').click(function() {
    if(canTap) {  
        tap('red');
        player += 0;
        if(checkPlayer()) {
            $('#level-title').text('Level ' + ++level);
            highestLevel = Math.max(highestLevel, level);
            $('#highest-level').text('Highest Level ' + Math.max(level, highestLevel));
            setTimeout(function() {
                createSequence();
            }, 1000);
        }
    }
});

$('.green').click(function() {
    if(canTap) {
        tap('green');
        player += 1;
        if(checkPlayer()) {
            $('#level-title').text('Level ' + ++level);
            highestLevel = Math.max(highestLevel, level);
            $('#highest-level').text('Highest Level ' + Math.max(level, highestLevel));
            setTimeout(function() {
                createSequence();
            }, 1000);
        }
    }
});

$('.blue').click(function() {
    if(canTap) {  
        tap('blue');
        player += 2;
        if(checkPlayer()) {
            $('#level-title').text('Level ' + ++level);
            highestLevel = Math.max(highestLevel, level);
            $('#highest-level').text('Highest Level ' + Math.max(level, highestLevel));
            setTimeout(function() {
                createSequence();
            }, 1000);
        }
    }
});

$('.yellow').click(function() {
    if(canTap) {
        tap('yellow');
        player += 3;
        if(checkPlayer()) {
            $('#level-title').text('Level ' + ++level);
            highestLevel = Math.max(highestLevel, level);
            $('#highest-level').text('Highest Level ' + Math.max(level, highestLevel));
            setTimeout(function() {
                createSequence();
            }, 1000);
        }
    }
});

function checkPlayer() {
    let correct = player.charAt(playerIdx) == sequence.charAt(playerIdx);
    console.log(player);
    playerIdx++;
    if(!correct) {
        $('body').addClass('game-over');
        $('#level-title').text('Game Over. Press A to Restart');
        sequence = "";
        level = 0;
        canTap = false;
        return false; 
    }
    if(playerIdx != sequence.length) return false;
    return true;
}

function playSound(source) {
    var audio = new Audio(source);
    audio.play();
}

let button = ['red', 'green', 'blue', 'yellow'];

$(document).keypress(function(event) {
    if(sequence.length == 0 || sequence == undefined) {
        if(event.key == 'a') createSequence();
        $('body').removeClass('game-over');
        $('#level-title').text('Level ' + 0);
        $('#highest-level').text('Highest Level ' + highestLevel);
    }
});
var canTap = false;
var highestLevel = 0;
var level = 0;
var player = "";
var playerIdx = 0;
var sequence = "";
function createSequence() {
    canTap = false;
    player = "";
    playerIdx = 0;
    let n = sequence == undefined? 0: sequence.length;
    for(let i=0; i<n; i++) {
        let item = sequence.charAt(i)-'0';
        setTimeout(function() {
            tap(button[item]);
        }, 1000*i);
    }
    let time = n == 0? 100: 1000*n;
    setTimeout(function() {
        let item = Math.floor(Math.random()*4);
        tap(button[item]);
        sequence = sequence+item;
        console.log(sequence);
        canTap = true;
    }, time);
}

function tap(box) {
    $('.'+box).addClass('pressed');
    playSound('sounds/'+box+'.mp3');
    setTimeout(function() {
        $('.'+box).removeClass('pressed');
    }, 100);
}