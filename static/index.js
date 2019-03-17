
"use strict";
var game = (function () {
    var config = {
        size: 15,
        winner: '',
        record: [],
        player: 'white',
        chessCount: [0, 0]
    }
    function drawCheckerboard() {
        var fragment = document.createDocumentFragment();
        var ul = document.createElement('ul')
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
        fragment.appendChild(ul)
        document.querySelector('.checkerboard').appendChild(fragment)
    }
    function checkWin(count) {
        if (count === 5) {
            config.winner = config.player
            if (config.winner === 'black') {
                var blackWinCount = +sessionStorage.getItem('blackWinCount') + 1
                sessionStorage.setItem('blackWinCount', blackWinCount)
                document.querySelector('.black-score').innerText = blackWinCount

            } else {
                var whiteWinCount = +sessionStorage.getItem('whiteWinCount') + 1
                sessionStorage.setItem('whiteWinCount', whiteWinCount)
                document.querySelector('.white-score').innerText = whiteWinCount
            }
            document.querySelector('.winner-wrap').style.zIndex = 11
            document.querySelector('.winner-wrap p').innerText = config.winner.toUpperCase() + ' CHESS WIN'
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


            // 和棋
            if (document.querySelectorAll('.chess').length === config.size * config.size && !config.winner) {
                document.querySelector('.winner-wrap').style.zIndex = 11
                document.querySelector('.winner-wrap p').innerText = 'DRAW'
            }

        }
    }

    function restart() {
        var btn = document.querySelector('.play-again')
        btn.addEventListener('click', function () {
            config.player = config.winner === 'black' ? 'white' : 'black' // 输者先行
            config.winner = ''
            config.record = []
            config.chessCount = [0, 0]
            document.querySelector('.checkerboard').innerHTML = ""
            drawCheckerboard()
            play()
            document.querySelector('.winner-wrap').style.zIndex = -1
            document.querySelector('.black-count').innerText = config.chessCount[0]
            document.querySelector('.white-count').innerText = config.chessCount[1]
        })
    }
    function play() {
        var ul = document.querySelector('ul')
        ul.addEventListener('click', function (e) {
            if (!config.winner) {
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

                    if (player === 'black') {
                        config.player = 'white'
                        config.chessCount[0] += 1
                        document.querySelector('.black-count').innerText = config.chessCount[0]
                    } else {
                        config.player = 'black'
                        config.chessCount[1] += 1
                        document.querySelector('.white-count').innerText = config.chessCount[1]
                    }

                    if (document.querySelector('.sound-control').className.indexOf('close-sound') === -1) {
                        document.querySelector('.audio').play()
                    }

                }
            }
        })
    }
    return {
        init: function () {
            drawCheckerboard()
            play()
            restart()
        }
    }
}())

game.init()
