import React from 'react';
import './App.css';
import Coin from './components/Coin/Coin';
import logo from './logo.svg'
import AccountBalance from './components/AccountBalance/AccountBalance'

/**
* Practice CSS at Flexbox Zombies, CSS Diner
* CSS cheat sheet for commands
*/

/**
 * Material UI!!!!
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='react logo' className='App-logo'/>
        <h1 className='App-title'>
          Coin Exchange
        </h1>
      </header>
      <AccountBalance amount={10000} />
      <table className='Coin-table'>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Ticker</th>
                  <th>Price</th>
              </tr>
          </thead>
          <tbody>
            <Coin name="Bitcoin" ticker="BTC" price={9000} />
            <Coin name="Ethereum" ticker="ETH" price={1000} />
            <Coin name="Tether" ticker="USDT" price={1} />
            <Coin name="Ripple" ticker="XRP" price={0.2} />
          </tbody>
            
        </table>
    </div>
  );
}

export default App;
