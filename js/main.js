// 'use strict';

// IIF so that we don't pollute the global 
(function(){



    var board = (function() {

        var moveCount = {
            X: 0,
            O: 0
        }

        var squares = {
            a: {
                1: 'open',
                2: 'open',
                3: 'open'
            },
            b: {
                1: 'open',
                2: 'open',
                3: 'open'
            },
            c: {
                1: 'open',
                2: 'open',
                3: 'open'
            },
        };

        /**
         * updates our board 
         */
        _updateBoard = function(id, sign){

            moveCount[sign]++;

            squares[id[0]][id[1]] = sign;            
        };


        // TODO: refactor this - there has got be a smarter way
        _determineWinner = function(){

            // check for a row winner
            for(let prop in squares){
                if(squares.hasOwnProperty(prop)){
                    var obj = squares[prop];
                    if(obj[1] === obj[2] && obj[1] === obj[3] && obj[1] !== 'open'){
                        console.log('WINNER', obj[1]);
                        return obj[1];
                    }
                }
            }

            // check columns for a winner
            for(let i=1; i<=3;i++){
                if(squares.a[i] === squares.b[i] && squares.a[i] === squares.c[i] && squares.a[i] !== 'open'){
                    console.log('WINNER', squares.a[i]);
                    return squares.a[i];
                }
            }

            // check for a diag winner
            if(squares.a[1] == squares.b[2] && squares.a[1] === squares.c[3] && squares.a[1] !== 'open'){
                console.log('WINNER', squares.a[1]);
                return squares.a[1];
            }

            // check other diag winner
            if(squares.a[3] == squares.b[2] && squares.a[3] === squares.c[1] && squares.a[3] !== 'open'){
                console.log('WINNER', squares.a[3]);
                return squares.a[3];
            }

        };

        return {
            squares: squares,
            updateBoard: _updateBoard,
            determineWinner: _determineWinner,
            moveCount: moveCount
        };

    })();


    var computer = (function(){

        let mark = 'O';

        // returns a move for the computer to make
        let _determineMove = function(squares, moveCount){


            if(moveCount.O > 2){

                // see if we have a win
                
            }


            if(moveCount.X > 2){

                // go on the defense and stop X from winning
                
            }

            console.log(moveCount);


            








        };

        return {
            determineMove: _determineMove
        };
    })();


    const square = document.querySelectorAll('.square');
    let player = 'X';



    // really fighting the jQuery urge here, need to assign 
    // event handler to all squares.  We'll use a loop 
    // in this loop Im using 'let' so that we get block level scope 
    // another approach would be to use var and wrap our callback in 
    // in a closure or define the call back outside of our loop

    for(let i = 0; i< square.length;i++){
        square[i].addEventListener('click', (e) => {
            e.currentTarget.className += ' occupied ' + player;

            board.updateBoard(e.currentTarget.id, player);


            board.determineWinner();


       
            
            // conditional (ternary) operator to swap players
            player = player === 'X' ? 'O' : 'X';

            if(player === "O"){

                computer.determineMove(board.squares, board.moveCount);


            }

        });
    }

})();