import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance'
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
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      showBalance: true,
      balance: 10000,
      coinData:[
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.9,
          balance: 0.3
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 1000,
          balance: 23
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2,
          balance: 100
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1,
          balance: 0,
        },
        {
          name: 'Cardano',
          ticker: 'ADA',
          price: 2,
          balance: 15
        }
      ],
    };
  };

  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function(values) {

      let newValues = {...values};

      if (valueChangeTicker === values.ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price = newValues.price * randomPercentage;
      }

      return newValues;
    });

    this.setState({coinData: newCoinData});
  }

  handleHide() {
    this.setState(function(oldState){
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    })
  }

  render() {
    return (
      <Div className="App">
        <Header />
        <AccountBalance amount={this.state.balance}
                        handleHide={this.handleHide} 
                        showBalance={this.state.showBalance}
        />
        <CoinList coinData={this.state.coinData} 
                  handleRefresh={this.handleRefresh}
                  showBalance={this.state.showBalance} />
      </Div>
    );
  }
};

export default App;
