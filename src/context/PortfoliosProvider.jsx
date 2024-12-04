// TeamsProvider.jsx → PortfoliosProvider.jsx
import { createContext, useState, useEffect } from 'react';
import apiCall from '../utils/api';

export const PortfoliosContext = createContext();

const PortfoliosProvider = ({ children }) => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await apiCall('get', '/api/portfolios');
        setPortfolios(response.data.data.portfolios);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      }
    };

    fetchPortfolios();
  }, []);

  const addPortfolio = async (portfolio) => {
    const response = await apiCall('post', '/api/portfolios', portfolio);
    setPortfolios((prev) => [...prev, response.data.data.portfolio]);
  };

  const removePortfolio = async (id) => {
    await apiCall('delete', `/api/portfolios/${id}`);
    setPortfolios((prev) => prev.filter((portfolio) => portfolio._id !== id));
  };

  return (
    <PortfoliosContext.Provider value={{ portfolios, addPortfolio, removePortfolio }}>
      {children}
    </PortfoliosContext.Provider>
  );
};

export default PortfoliosProvider;