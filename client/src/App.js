import React, { Component, useState } from "react";
import TikTacToeContract from "./contracts/TicTacToe.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [state, updateState] = useState({ web3: null, accounts: null, contract: null });
  const [players, updatePs] = useState({ P1: false, P2: false });

  async function loadWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TikTacToeContract.networks[networkId];
      const instance = new web3.eth.Contract(TikTacToeContract.abi, deployedNetwork && deployedNetwork.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      updateState({ web3, accounts, contract: instance });
      const p1 = await instance.methods.player1().call();
      const p2 = await instance.methods.player2().call();
      updatePs({ P1: p1 === accounts[0], P2: p2 === accounts[0] });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  async function run() {
    // Stores a given value, 5 by default.

    const response = await state.contract.methods.getBoard().call();
    console.log(response);
    for (let i = 0; i < 9; i++) document.getElementById(String(i)).innerHTML = response[i] != "0" ? (response[i] === "1" ? "X" : "O") : "";
  }
  async function escape() {
    try {
      await state.contract.methods.escape().send({ from: state.accounts[0] });
      const p1 = await state.contract.methods.player1().call();
      const p2 = await state.contract.methods.player2().call();
      updatePs({ P1: p1 === state.accounts[0], P2: p2 === state.accounts[0] });
    } catch {
      console.log("failed");
    }
  }
  async function PlayAsX() {
    try {
      await state.contract.methods.startPlayingAsX().send({ from: state.accounts[0], value: 1000000000000000000 });
      const response = await state.contract.methods.player1().call();
      if (response > 0) {
        updatePs({ P1: true, P2: players.P2 });
      }
    } catch {
      console.log("failed");
    }
  }
  async function PlayAsO() {
    try {
      await state.contract.methods.startPlayingAsO().send({ from: state.accounts[0], value: 1000000000000000000 });
      const response = await state.contract.methods.player2().call();
      if (response > 0) {
        updatePs({ P1: players.P1, P2: true });
      }
    } catch {
      console.log("failed");
    }
  }

  async function move(id) {
    try {
      await state.contract.methods.move(id).send({ from: state.accounts[0] });
      alert("move taken");
    } catch {
      console.log("failed");
    }
  }
  if (!state.web3)
    return (
      <div className="menuAlign">
        <button className="connect" onClick={() => loadWeb3()}>
          Load web3
        </button>
      </div>
    );
  setInterval(run, 5000);
  console.log(state.accounts);

  return (
    <div className="fade">
      <div className="navigation">Ultimate Tic Tac Toe</div>

      <div className="alignment">
        <div style={{ display: "grid" }}>
          <button className={"play" + (players.P1 ? " green" : "")} onClick={() => PlayAsX()}>
            Play as X
          </button>
          <button className="play" onClick={() => escape()}>
            Escape
          </button>
        </div>
        <div className="grid">
          <div className="element" id="0" onClick={() => move(0)}></div>
          <div className="element" id="1" onClick={() => move(1)}></div>
          <div className="element" id="2" onClick={() => move(2)}></div>
          <div className="element" id="3" onClick={() => move(3)}></div>
          <div className="element" id="4" onClick={() => move(4)}></div>
          <div className="element" id="5" onClick={() => move(5)}></div>
          <div className="element" id="6" onClick={() => move(6)}></div>
          <div className="element" id="7" onClick={() => move(7)}></div>
          <div className="element" id="8" onClick={() => move(8)}></div>
        </div>
        <div>
          <button className={"play" + (players.P2 ? " green" : "")} onClick={() => PlayAsO()}>
            Play as O
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
