/**
 * TODO 
 * - allow user to choose X or O
 * - The computers choice in moves happens immediately after the user goes
 *   change that so there is at least a small delay 
 * - pull UI changes into their own class or module 
 * - be consistent, unless compelling reason, with use of 'let' and 'var'
 * - allow user to choose difficulty level (easy, medium, impossible)    
 * 
 */

(function(){

    /**
     * revealing module pattern 
     * 
     */
    var board = (function() {
        var _squares = [0,1,2,3,4,5,6,7,8];
        var _updateBoard = function(index, player){
            _squares[index] = player;
        };
        var _resetBoard = function() {

            for(let x=0; x<_squares.length;x++){
                _squares[x] = x;
            }
        };
        var _getSquares = function(){
            return _squares;
        };

        var _hasWon = function(player, passedSquares){
            passedSquares = !passedSquares ? _squares : passedSquares;
            if(
                (passedSquares[0] === player && passedSquares[1] === player && passedSquares[2] === player) ||
                (passedSquares[3] === player && passedSquares[4] === player && passedSquares[5] === player) ||
                (passedSquares[6] === player && passedSquares[7] === player && passedSquares[8] === player) ||
                (passedSquares[0] === player && passedSquares[3] === player && passedSquares[6] === player) ||
                (passedSquares[1] === player && passedSquares[4] === player && passedSquares[7] === player) ||
                (passedSquares[2] === player && passedSquares[5] === player && passedSquares[8] === player) ||
                (passedSquares[0] === player && passedSquares[4] === player && passedSquares[8] === player) ||
                (passedSquares[2] === player && passedSquares[4] === player && passedSquares[6] === player)
            ){
                return true;
            }
            else {
                return false;
            }
        };

        var _determineWinner = function(){
            var msg = null;
            if(_hasWon('X')){
                msg = 'You Win!';
            } else if ( _hasWon('O')){
               msg = 'You Lose!';
            } else if (_getOpenSquares().length === 0){
                msg = 'Tie Game!';
            }
            if(msg){
                setTimeout(() => {
                    alert(msg);
                    _resetBoard();
                }, 100);
                return true;
            }
            return false;
        };

        // returns array of available squares
        let _getOpenSquares = function(){
            return _squares.filter(square => !isNaN(square));
        };

        return {
            squares: _squares,
            updateBoard: _updateBoard,
            hasWon: _hasWon,
            determineWinner: _determineWinner,
            getOpenSquares:_getOpenSquares,
            getSquares: _getSquares
        };

    })();


    var player1 = {
        mark: 'X',
        score: 0
    };

    var computer = (function(){

        let mark = 'O';
        let score = 0;

        // returns a move for the computer to make
        let _determineMove = function(board){
            

           let available = board.getOpenSquares();
           let tempSquares = null;

           // reviews all the open moves and looks for a winning move
           // while also looking for any defense moves to stop player 1 
           // from winning
           // TODO - if not winning or blocking moves look for an 
           // adventitious move
           for(item of available){
               let tempSquares = Object.assign({}, board.getSquares());
               tempSquares[item] = mark;
               if(board.hasWon(mark, tempSquares)){
                   return item;
               }
               tempSquares[item] = 'X';
               if(board.hasWon('X', tempSquares)){
                   // nice little lesson I defined this with let originallly
                   // which gave it block scope and thus wasn't hoisted 
                   // high enough for us
                   var blockingMove = item;
                }
           }

           if(blockingMove){
               return blockingMove;
           }
           return available[Math.floor(Math.random() * (available.length - 0)) + 0];
        };

        return {
            determineMove: _determineMove,
            mark: mark,
            score: score
        };
    })();


    const square = document.querySelectorAll('.square');
    const player1Score = document.querySelector('#player1-score');
    const computerScore = document.querySelector('#computer-score');
    const instructions = document.querySelector('#instructions');

    setTimeout(() => {
        instructions.className += ' hidden';
    }, 2000);
    
    var resetBoard = function() {
        if(board.hasWon(player1.mark)){
            player1.score++;
        } else if (board.hasWon(computer.mark)){
            computer.score++;
        }


        setTimeout(() => {
            for(let j = 0; j< square.length;j++){
                square[j].className = 'col-xs-4 square';
            }
        }, 100);

        player1Score.innerText = 'You: ' + player1.score;
        computerScore.innerText = 'Computer: ' + computer.score;
    };

    // really fighting the jQuery urge here, need to assign 
    // event handler to all squares.  We'll use a loop 
    // in this loop Im using 'let' so that we get block level scope 
    // another approach would be to use var and wrap our callback in 
    // in a closure or define the call back outside of our loop

    let currentPlayer = player1;

    for(let i = 0; i< square.length;i++){
        square[i].addEventListener('click', (e) => {
            
            // make sure the select square isn't occupied
            if(board.squares[i] !== i){
                return false;
            }

            // an alternative approach to the above check
            // if(e.currentTarget.className.split(' ').some(val => val === 'occupied')){
            //     return false;
            // }

            e.currentTarget.className += ' occupied ' + currentPlayer.mark;

            board.updateBoard(i, currentPlayer.mark);
            if(board.determineWinner()){
                resetBoard();
                return false;
            }

            currentPlayer = computer;

            if(currentPlayer.mark === "O"){

                var move = computer.determineMove(board);
  
                board.updateBoard(move, currentPlayer.mark);
                square[move].className += ' occupied ' + currentPlayer.mark;
                if(board.determineWinner()){
                    resetBoard();
                }
                currentPlayer = player1;
            }

        });
    }
})();