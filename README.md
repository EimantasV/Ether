# Ultimate Tic Tac Toe
## Usage
1. Clone repo.
2. start Ganache
3. cd to project /Ether
4. in terminal "truffle compile"
5. "truffle migrate"
6. "cd client"
7. "npm install"
8. "npm start"
9. In browser connect MetaMask to Ganache
10. In browser press Load web3
11. Then start playing as X, in other browser or as other acc play as O
12. Press on board to make move, be patient, in MetaMask there should be no errors.
13. Win
## Smart contract
- Name: TicTacToe.sol
- Only 2 players can play at a time
- Connect to contract with startPlayingAsX() or startPlayingAsO(), min bet 1 ether :D
- Make moves on tic tac toe board with move(n), n - board tile, 0 - top left, tile order as reading a book.
- once someone wins he gets every ether from contract.
- tie - split jackpot.
- player can get jackpot with escape() if opponent is afk for 20 blocks, or if opponent didin't join. If afk who gets jackpot is oppososite of whos turn it is.
- You can check game state with player1(), player2(), getBoard(), checkJackpot().
- Thats all.
