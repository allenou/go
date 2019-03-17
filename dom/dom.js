
"use strict";
var game = (function () {
    var config = {
        size: 15,
        winer: '',
        record: [],
        player: 'black'
    }
    function drawCheckerboard() {
        var fragment = document.createDocumentFragment();
        var checkerboard = document.createElement('div')
        var ul = document.createElement('ul')
        checkerboard.className = 'checkerboard'
        for (var r = 0; r < config.size; r++) {
            config.record[r] = []
            for (var c = 0; c < config.size; c++) {
                var li = document.createElement('li')
                li.dataset.location = r + '-' + c
                if (r == 0) {
                    li.className += ' top';
                }
                if (r == 14) {
                    li.className += ' bottom';
                }
                if (c == 0) {
                    li.className += ' left';
                }
                if (c == 14) {
                    li.className += ' right';
                }
                ul.appendChild(li)
            }


        }
        checkerboard.appendChild(ul)
        fragment.appendChild(checkerboard)
        document.body.appendChild(fragment)
    }
    function checkWin(count) {
        if (count === 5) {
            config.winer = config.player
            console.log('winer:' + config.winer)
        }
    }
    function checkChess(r, c, player) {
        var row, column
        var size = config.size
        var record = config.record
        var chessArr = document.querySelectorAll('.' + player + '-chess')
        // 根据最后一个落子的坐标向落子方向逆向判断
        if (chessArr.length >= 5) {
            // 水平赢法
            var count = 1
            // 从左向右落子
            for (column = c - 1; c >= 0 && column > c - 5; column--) {
                if (record[r] && record[r][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }

            // 从右向左落子
            for (column = c + 1; c < size && column < c + 5; column++) {
                if (record[r] && record[r][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }

            // 垂直赢法 
            count = 1
            // 从上向下落子
            for (row = r - 1; r >= 0 && row > r - 5; row--) {
                if (record[row] && record[row][c] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }
            // 从下向上落子
            for (row = r + 1; r >= 0 && row < r + 5; row++) {
                if (record[row] && record[row][c] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }
            // 45°
            count = 1
            // 从左下向右上落子

            for (row = r + 1, column = c - 1; (r <= size && c >= 0) && (row < r + 5 && column > c - 5); row++ , column--) {
                if (record[row] && record[row][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }
            // 从右上向左下落子

            for (row = r - 1, column = c + 1; (r >= 0 && c < size) && (row > r - 5 && column < c + 5); row-- , column++) {
                if (record[row] && record[row][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }


            // 左上向右下落子
            count = 1
            for (row = r - 1, column = c - 1; r >= 0 && c >= 0 && row > r - 5 && column > c - 5; row-- , column--) {
                if (record[row] && record[row][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }

            // 右下向左上落子
            for (row = r + 1, column = c + 1; r < size && c < size && row < r + 5 && column < c + 5; row++ , column++) {
                if (record[row] && record[row][column] == player) {
                    count++
                    checkWin(count)
                } else {
                    break;
                }
            }
        }
    }
    function play() {
        var ul = document.querySelector('ul')
        ul.addEventListener('click', function (e) {
            if (!config.winer) {
                var event = e || window.event
                var chess = event.target
                var player = config.player //current player
                if (chess.tagName === 'LI' && chess.className.indexOf('chess') == -1) {
                    var location = chess.dataset.location.split('-')
                    var r = location[0]
                    var c = location[1]
                    config.record[r][c] = player
                    chess.className += ' chess ' + player + '-chess'
                    checkChess(+r, +c, player)
                    config.player = player === 'black' ? 'white' : 'black'
                }
            }
        })
    }
    return {
        init: function () {
            drawCheckerboard()
            play()
        }
    }
}())

game.init()