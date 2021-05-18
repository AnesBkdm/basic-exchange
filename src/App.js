import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance'
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header'
import styled from 'styled-components';
import axios from 'axios';

/**
* Practice CSS at Flexbox Zombies, CSS Diner
* CSS cheat sheet for commands
*/
const Div = styled.div`
  text-align: center;
  background-color: rgb(120, 120, 173);
  color: #cccccc;
`;

const formatPrice = price => parseFloat(Number(price).toFixed(2));
const COIN_COUNT = 10;

class App extends React.Component {
  constructor (props){
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      showBalance: true,
      balance: 10000,
      coinData: []
      
      // [
      //   {
      //     name: 'Bitcoin',
      //     ticker: 'BTC',
      //     price: 9999.9,
      //     balance: 0.3
      //   },
      //   {
      //     name: 'Ethereum',
      //     ticker: 'ETH',
      //     price: 1000,
      //     balance: 23
      //   },
      //   {
      //     name: 'Ripple',
      //     ticker: 'XRP',
      //     price: 0.2,
      //     balance: 100
      //   },
      //   {
      //     name: 'Tether',
      //     ticker: 'USDT',
      //     price: 1,
      //     balance: 0,
      //   },
      //   {
      //     name: 'Cardano',
      //     ticker: 'ADA',
      //     price: 2,
      //     balance: 15
      //   }
      //
    }
  };

  componentDidMount = async () => {
    
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id)); // axios.get returns a promise
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response){
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price)
      }
    })

    // Retrieving prices
    this.setState({coinData: coinPriceData});
  };
  

  async handleRefresh(valueChangeId) {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;

    const response = await axios.get(tickerUrl);
    console.log(response);

    const newPrice = formatPrice(response.data.quotes.USD.price);
    console.log(newPrice);

    const newCoinData = this.state.coinData.map( function(values) {

      let newValues = {...values};

      if (valueChangeId === values.key) {
        newValues.price = newPrice;
      }

      return newValues;
    });

    this.setState({coinData: newCoinData});
  };

  handleHide() {
    this.setState(function(oldState){
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    })
  };

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
