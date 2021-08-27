"use strict";

function breakoutGameModel() {
    let game = document.getElementById("gameBoard"),
        movingPosX = game.width / 2 - 35, movingBallX, movingBallY;

    this.paddleRight = function (gamma) {
        let newPosX = movingPosX + (gamma / 2);

        if ((newPosX + 70) >= game.width) {
            newPosX = game.width - 70;
        }
        movingPosX = newPosX;

        return Math.round(movingPosX);
    };

    this.paddleLeft = function (gamma) {
        let newPosX = movingPosX + (gamma / 2);

        if (newPosX <= 0) {
            newPosX = 0;
        }
        movingPosX = newPosX;

        return Math.round(movingPosX);
    };

    this.movingBallX = function () {
        movingBallX = ballX + speedX;

        return movingBallX;
    };

    this.movingBallY = function () {
        movingBallY = ballY - speedY;

        return movingBallY;
    };

    this.getCurrentPos = function () {
        return movingPosX;
    };

    this.getBallPos = function () {
        return movingBallX;
    };

    this.storeBricks = function () {
        let bricks = [];
        for (var i = 0; i < 8; i++) {
            bricks[i] = [];
            for (var j = 0; j < 4; j++) {
                bricks[i][j] = {x: 0, y: 0, visibleBrick: 1};
            }
        }
        return bricks;
    };

    this.hitBrick = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                let hit = bricks[i][j];
                if (hit.visibleBrick === 1) {
                    if ((ballX > hit.x) && (ballX < hit.x + 35) && (ballY > hit.y) && (ballY < hit.y + 4)) {
                        speedY = -speedY;
                        bricks[i][j].visibleBrick = 0;
                        score += 20;
                        hitBricks ++;
                        if (hitBricks === 32) {
                            return true;
                        }
                    }
                }
            }
        }
    };
}