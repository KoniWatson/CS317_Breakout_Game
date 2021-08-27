"use strict";

function breakoutGameView() {
    let game = document.getElementById("gameBoard"),
        boardElements = game.getContext("2d"),
        paddle = document.getElementById("paddleBoard"),
        paddleElements = paddle.getContext("2d");

    this.pOnePaddle = function (startPaddleX) {
        paddleElements.clearRect(0, 0, paddle.width, paddle.height);

        paddleElements.fillStyle = "#242582";
        paddleElements.fillRect(startPaddleX, 0, 70, 40);
    };

    this.pOneBall = function (startBallX, startBallY) {
        boardElements.beginPath();
        boardElements.arc(startBallX, startBallY, 2.5, 0, Math.PI * 2);
        boardElements.fillStyle = "#F64C72";
        boardElements.fill();
        boardElements.closePath();
    };

    this.pTwoPaddle = function () {
        boardElements.fillStyle = "#242582";
        boardElements.fillRect(game.width/2-35, 0, 70, 2);
    };

    this.pTwoBall = function () {
        boardElements.beginPath();
        boardElements.arc(game.width/2-2.5, 20, 2.5, 0, Math.PI * 2);
        boardElements.fillStyle = "#F64C72";
        boardElements.fill();
        boardElements.closePath();
    };

    this.pOneBricks = function () {
        let brickWidth = 35, brickHeight = 4,
            brickPosX, brickPosY, colour1 = "#5c00f6";

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                if (bricks[i][j].visibleBrick === 1) {
                    boardElements.fillStyle = colour1;
                    brickPosX = ((i * (brickWidth + 2)) + 2);
                    brickPosY = ((j * (brickHeight + 2)) + 2);

                    bricks[i][j].x = brickPosX;
                    bricks[i][j].y = brickPosY;

                    boardElements.fillRect(brickPosX, brickPosY, brickWidth, brickHeight);
                }
            }
        }
    };

    this.pTwoBricks = function () {
        let brickWidth = 35, brickHeight = 4,
            brickPosX, brickPosY, colour1 = "#5c00f6";

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                if (bricks[i][j].visibleBrick === 1) {
                    boardElements.fillStyle = colour1;
                    brickPosX = ((i * (brickWidth + 2)) + 2);
                    brickPosY = ((j * (brickHeight + 2)) + 2) + game.height/3;

                    bricks[i][j].x = brickPosX;
                    bricks[i][j].y = brickPosY;

                    boardElements.fillRect(brickPosX, brickPosY, brickWidth, brickHeight);
                }
            }
        }
    };

    this.clear = function () {
        boardElements.clearRect(0, 0, game.width, game.height);
    };

    this.pauseGameCallback = function (callback) {
        document.getElementById("pause").addEventListener("click", callback);
    };

    this.playGameCallback = function (callback) {
        document.getElementById("play").addEventListener("click", callback);
    };

    this.lifes = function () {
        document.getElementById("life").innerText = "LIFE'S LEFT: " + life;
    };

    this.updateScore = function () {
        document.getElementById("score").innerText = "SCORE: " + score;
    };

    this.openMenu = function () {
        document.getElementById("startMenu").style.width = "100%";
    };

    this.closeMenu = function (num) {
        document.getElementById("startMenu").style.width = "0%";
        if (num === 1) {
            start = 1;
        }else {
            start = 2;
        }
    };
}