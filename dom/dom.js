
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
    function check(r, c) {
        var record = config.record
        // 横
        console.log(record[r])
        if (record[r].length >= 5) {
            console.log('check')
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
                    var location = chess.dataset.location
                    var r = location[0]
                    var c = location[2]
                    config.record[r][c] = player
                    chess.className += ' chess ' + player + '-chess'
                    config.player = player === 'black' ? 'white' : 'black'
                    check(r, c)
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