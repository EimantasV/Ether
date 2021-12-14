// SPDX-License-Identifier: MIT
pragma solidity >=0.7 <0.9.0;

contract TicTacToe {

    event Win(string _player, address _address, uint256 _jackpot);
    event Tie(string _msg, address _address1, address _address2, uint256 _jackpot);

    address payable public player1;
    address payable public player2;

    uint256[9] board; // 0 - top left, order is like reading a book.
    bool turn; // true - O, false - X

    uint256 playerCount=0;

    function startPlyingAsX() external payable {

        require(player2 != msg.sender, "can't play as both");
        require(player1 == address(0), "position taken");
        require(msg.value >= 1 ether, "bet must be >=1 ether");
        player1 = payable( msg.sender);

    }
    function startPlyingAsO() external payable {

        require(player1 != msg.sender, "can't play as both");
        require(player2 == address(0), "position taken");
        require(msg.value >= 1 ether, "bet must be >=1 ether");
        player2 = payable(msg.sender);
    }

    function move(uint256 id) external
    {   
        require(player1 != address(0) && player2 != address(0),"need both players to play");
        require(id<9, "bad position");
        if(turn==false)
        {
            require(msg.sender==player1, "you're not player1 (X)");
        }
        else
        {
            require(msg.sender==player2, "you're not player2 (O)");
        }

        require(board[id] == 0, "position taken");

        board[id] = turn?2:1; // player2 - 2, player1 - 1;

        checkState();
    }
    function checkState() public payable
    {
        
        // check for winner
        uint256 t = turn?2:1;
        turn = ! turn;
        bool winner = false;

        if(board[0]==t &&board[1]==t&&board[2]==t)
        {
            winner = true;
        }
        else if(board[3]==t &&board[4]==t&&board[5]==t)
        {
            winner = true;
        }
        else if(board[6]==t &&board[7]==t&&board[8]==t)
        {
            winner = true;
        }
        else if(board[0]==t &&board[3]==t&&board[6]==t)
        {
            winner = true;
        }
        else if(board[1]==t &&board[4]==t&&board[7]==t)
        {
            winner = true;
        }
        else if(board[2]==t &&board[5]==t&&board[8]==t)
        {
            winner = true;
        }
        else if(board[0]==t &&board[4]==t&&board[8]==t)
        {
            winner = true;
        }
        else if(board[2]==t &&board[4]==t&&board[6]==t)
        {
            winner = true;
        }

        if(winner)
        {
            if(t==1)
            {
                emit Win("Player 1 (X) Won",player1,address(this).balance);
                player1.transfer(address(this).balance);
            }
            if(t==2)
            {
                emit Win("Player 2 (O) Won",player2,address(this).balance);
                player2.transfer(address(this).balance);
            }
        }

        if(winner==false)
        {
            // tie
            bool isTie = true;
            for(uint256 i = 0;i<9;i++)
            {
                if(board[i]==0)
                {
                    isTie = false;
                }
            }
            
            // payout
            if(isTie)
            {
                emit Tie("Game is Tie", player1,player2,address(this).balance);
                player1.transfer(address(this).balance/2);
                player2.transfer(address(this).balance);
            }
        }

    }

    function getBoard() external view returns (uint256 [9] memory){
        return board;
    }

    function checkJackpot() external view returns(uint256){
        return address(this).balance;
    }

}