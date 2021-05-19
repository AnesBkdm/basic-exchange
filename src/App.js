import React, {useState, useEffect} from 'react';
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

function App(props) {
  
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  // Avoid temporal deadzone by putting exe functions first
  const componentDidMount = async () => {
    
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
    // this.setState({coinData: coinPriceData});
    setCoinData(coinPriceData);
  };

  useEffect(function() { // WARNING: useEffect cannot be Async
    if(coinData.length === 0){
      // componentDidMount here
      componentDidMount();
    } else {
      // componentDidUpdate here
    }
  });

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;

    const response = await axios.get(tickerUrl);
    console.log(response);

    const newPrice = formatPrice(response.data.quotes.USD.price);
    console.log(newPrice);

    const newCoinData = coinData.map( function(values) {

      let newValues = {...values};

      if (valueChangeId === values.key) {
        newValues.price = newPrice;
      }

      return newValues;
    });

    // this.setState({coinData: newCoinData});
    setCoinData(newCoinData);
  };

  const handleHide = () => {
    setShowBalance(oldValue => !oldValue);
  };


  return (
    <Div className="App">
      <Header />
      <AccountBalance amount={balance}
                      handleHide={handleHide} 
                      showBalance={showBalance}
      />
      <CoinList coinData={coinData} 
                handleRefresh={handleRefresh}
                showBalance={showBalance} />
    </Div>
  );

};

export default App;
