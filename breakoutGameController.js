"use strict";

let view = new breakoutGameView(),
    model = new breakoutGameModel(),
    controller = null,
    game = document.getElementById("gameBoard"),
    ballX = game.width / 2 - 2.5, ballY = game.height / 2 - 2.5,
    speedX = 1.5, speedY = -2, life = 3, bricks = model.storeBricks(), score = 0,
    start, hitBricks = 0;

function breakoutGameController() {
    let pause = false, pauseSpeedX, pauseSpeedY;

    this.init = function () {
        view.openMenu();
        view.pOnePaddle(game.width / 2 - 35);

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (event) {
                if (event.gamma > 0) {
                    let right = Math.round(event.gamma);
                    view.pOnePaddle(model.paddleRight(right));
                } else {
                    let left = Math.round(event.gamma);
                    view.pOnePaddle(model.paddleLeft(left));
                }
            });
        }

        view.pauseGameCallback(function () {
            pause = true;
            pauseSpeedX = speedX;
            speedX = 0;
            pauseSpeedY = speedY;
            speedY = 0;
            view.pOnePaddle(model.getCurrentPos());
        });

        view.playGameCallback(function () {
            pause = false;
            speedX = pauseSpeedX;
            speedY = pauseSpeedY;
        });
    };
}

controller = new breakoutGameController();
window.addEventListener("load", controller.init);

function gameLoop() {
    if (start === 1 || start === 2) {
        view.clear();
        view.updateScore();

        if (model.hitBrick()) {
            alert("YOU WIN, CONGRATS!\n YOUR SCORE IS: " + score);
            document.location.reload();
        }

        if (start === 1) {
            view.pOneBricks();
        }else {
            view.pTwoBricks();
            view.pTwoPaddle();
            view.pTwoBall();
        }

        if ((ballX + speedX > game.width - 2.5) || (ballX + speedX < 2.5)) {
            speedX = -speedX;
        }

        if (ballY - speedY < 2.5) {
            speedY = -speedY;
        } else if ((ballY - speedY) > (game.height - 0.5)) {
            if (ballX < model.getCurrentPos() + 70 && ballX > model.getCurrentPos()) {
                let pos = model.getBallPos()-model.getCurrentPos();
                if (pos > 30 && pos < 40) {
                    speedX = 0;
                }else if (pos <= 30) {
                    speedX = -1.5;
                }else {
                    speedX = 1.5;
                }
                speedY = -speedY;
            } else {
                life = life - 1;
                if (score === 0) {
                    score = 0;
                } else {
                    score -= 30;
                }
                view.lifes(life);

                if (life === 0) {
                    alert("!GAME OVER!\n YOUR SCORE IS: " + score);
                    life = 3;
                    document.location.reload();
                } else {
                    view.pOneBall(game.width / 2 - 2.5, game.height / 2 - 2.5);
                    ballX = game.width / 2 - 2.5;
                    ballY = game.height / 2 - 2.5;
                    speedX = -1.5;
                    speedY = 1.5;
                }
            }
        }

        ballX = model.movingBallX(ballX, speedX);
        ballY = model.movingBallY(ballY, speedY);

        view.pOneBall(ballX, ballY);
    }
}

setInterval(gameLoop, 27);


