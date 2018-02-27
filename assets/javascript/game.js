window.onload = function() {

    $("#c1").click(click1);
    $("#c2").click(click2);
    $("#c3").click(click3);
    $("#c4").click(click4);
};

var fanfare = new Audio('assets/audio/Victory-Theme.mp3');
var requiem = new Audio('assets/audio/Game-Over-2.mp3');
var total;
var c1;
var c2;
var c3;
var c4;
var numToMatch;
var wins = 0;
var losses = 0;
var disabled;
var intervalId;
var count = 0;

function newGame() {
    disabled = false;
    clearInterval(intervalId);
    total = 0;
    c1 = Math.floor(Math.random() * 12 + 1);
    c2 = Math.floor(Math.random() * 12 + 1);
    c3 = Math.floor(Math.random() * 12 + 1);
    c4 = Math.floor(Math.random() * 12 + 1);
    numToMatch = Math.floor(Math.random() * 102 + 19); // random number 19 - 120
    $('#num-to-match').text(numToMatch);
    $('#h2-total')
        .text("RUNNING TOTAL = 0")
        .removeClass('red green');
}

function click1() {
    if (!disabled) {
        total += c1;
        checkWinLose();
    }
}

function click2() {
    if (!disabled) {
        total += c2;
        checkWinLose();
    }
}

function click3() {
    if (!disabled) {
        total += c3;
        checkWinLose();
    }
}

function click4() {
    if (!disabled) {
        total += c4;
        checkWinLose();
    }
}

function checkWinLose() {
    $('#h2-total').text("RUNNING TOTAL = " + total);

    if (total === numToMatch) {
        win();
    }
    else if (total > numToMatch) {
        lose();
    }
}

function win() {
    fanfare.play();
    wins++;
    $('#wins').text(wins);
    $('#h2-total').addClass('green');
    $('#num-to-match').text("thinking...");
    disabled = true;
    setTimeout(newGame, 4500);
    intervalId = setInterval(shuffle, 100);
}

function lose() {
    requiem.play();
    losses++;
    $('#losses').text(losses);
    $('#h2-total').addClass('red');
    disabled = true;
    setTimeout(newGame, 12500);
    intervalId = setInterval(fade, 380);
}

function shuffle() {
    count++;
    $('#img1').attr('src', 'assets/images/c' + (((count + 1) % 4) + 1) + '.png');
    $('#img2').attr('src', 'assets/images/c' + (((count + 2) % 4) + 1) + '.png');
    $('#img3').attr('src', 'assets/images/c' + (((count + 3) % 4) + 1) + '.png');
    $('#img4').attr('src', 'assets/images/c' + (((count + 4) % 4) + 1) + '.png');
    if (count == 4) {count = 0}
}

function fade() {
    count++;
    $('body').addClass('die' + count)
        .removeClass('die' + (count - 1));
    if (count == 25) {
        clearInterval(intervalId);
        count = 0;
        $('#num-to-match').text("thinking...");
        intervalId = setInterval(shuffle, 100);
    }
}

newGame();