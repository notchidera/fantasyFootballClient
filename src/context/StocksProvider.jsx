import { createContext, useState, useEffect } from 'react';
import apiCall from '../utils/api';

export const StocksContext = createContext();

const StocksProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await apiCall('get', '/api/stocks');
        setStocks(response.data.data.stocks);
      } catch (err) {
        console.error('Error fetching stocks:', err);
      }
    };

    fetchStocks();
  }, []);

  return (
    <StocksContext.Provider value={{ stocks }}>
      {children}
    </StocksContext.Provider>
  );
};

export default StocksProvider;
