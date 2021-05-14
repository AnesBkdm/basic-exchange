import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance'
import { v4 as uuidv4 } from 'uuid';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header'
import styled from 'styled-components';

/**
* Practice CSS at Flexbox Zombies, CSS Diner
* CSS cheat sheet for commands
*/
const Div = styled.div`
  text-align: center;
  background-color: rgb(120, 120, 173);
  color: #cccccc;
`;

class App extends React.Component {
  constructor (props){
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.state = {
      balance: 10000,
      coinData:[
        {
          key: uuidv4(),
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.9
        },
        {
          key: uuidv4(),
          name: 'Ethereum',
          ticker: 'ETH',
          price: 1000
        },
        {
          key: uuidv4(),
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2
        },
        {
          key: uuidv4(),
          name: 'Tether',
          ticker: 'USDT',
          price: 1
        },
        {
          key: uuidv4(),
          name: 'Cardano',
          ticker: 'ADA',
          price: 2
        }
      ],
    };
  };

  handleRefresh(valueChangeTicker) {
    const coin = this.state.coinData.find(({ticker}) => ticker === valueChangeTicker);
    console.log(coin);
  }

  render() {
    return (
      <Div className="App">
        <Header />
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} />
      </Div>
    );
  }

};

/**
 * Material UI!!!!
 */
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} alt='react logo' className='App-logo'/>
//         <h1 className='App-title'>
//           Coin Exchange
//         </h1>
//       </header>
//       <AccountBalance amount={10000} />
//       <table className='Coin-table'>
//           <thead>
//               <tr>
//                   <th>Name</th>
//                   <th>Ticker</th>
//                   <th>Price</th>
//               </tr>
//           </thead>
//           <tbody>
//             <Coin name="Bitcoin" ticker="BTC" price={9000} />
//             <Coin name="Ethereum" ticker="ETH" price={1000} />
//             <Coin name="Tether" ticker="USDT" price={1} />
//             <Coin name="Ripple" ticker="XRP" price={0.2} />
//           </tbody>
            
//         </table>
//     </div>
//   );
// }

export default App;
