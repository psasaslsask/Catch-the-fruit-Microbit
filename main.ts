let currentPlayer = 1;
let characterX = 2;
let scoreP1 = 0;
let scoreP2 = 0;
let fruitSpeed = 1000; 

input.onButtonPressed(Button.A, function () {
    if (currentPlayer === 1 && characterX > 0) {
        characterX -= 1;
    }
})

input.onButtonPressed(Button.B, function () {
    if (currentPlayer === 2 && characterX < 4) {
        characterX += 1;
    }
})

function playCatchSound() {
    music.playTone(600, music.beat(BeatFraction.Half));
}

function playMissSound() {
    music.playTone(200, music.beat(BeatFraction.Whole));
}

basic.forever(function () {
    basic.clearScreen();
    led.plot(characterX, 4);

    let fruitX = Math.randomRange(0, 4);
    let fruitY = 0;

    led.plot(fruitX, fruitY);
    basic.pause(fruitSpeed);
    led.unplot(fruitX, fruitY);
    fruitY += 1;

    if (fruitX == characterX && fruitY == 4) {
        if (currentPlayer === 1) {
            scoreP1 += 2;
        } else {
            scoreP2 += 2;
        }

        playCatchSound();
        basic.showIcon(IconNames.Yes);
        basic.pause(1000);
    } else {
        playMissSound();
        basic.showIcon(IconNames.No);
        basic.pause(1000);
    }
})

input.onGesture(Gesture.LogoUp, function () {
    basic.showString("P" + currentPlayer + ": " + (currentPlayer === 1 ? scoreP1 : scoreP2));
    basic.pause(1000);
    basic.clearScreen();
    switchPlayers();
})

function switchPlayers() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    basic.showString("P" + currentPlayer);
    basic.pause(1000);
}
