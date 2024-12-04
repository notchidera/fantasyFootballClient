import React, { useContext, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { StocksContext } from '../context/StocksProvider';
import { UsersContext } from '../context/UsersProvider';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart = () => {
	const { stocks } = useContext(StocksContext); // Stocks data
	const { user } = useContext(UsersContext); // User data
	const [selectedStock, setSelectedStock] = useState(null);

	// Handle stock selection from the chart
	const handleSelectStock = (stockId) => {
		const stock = stocks.find((item) => item.id === stockId);
		setSelectedStock(stock);
	};

	return (
		<div className="chart-container p-6">
			<h2 className="text-2xl font-bold mb-4">Stock Performance Chart</h2>
			<p className="text-sm text-gray-500">Welcome, {user.name}!</p> {/* User Greeting */}

			<div className="chart-section">
				<h3 className="text-xl font-semibold mb-2">Portfolio Distribution</h3>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={stocks}
							dataKey="value" // Assume `value` is a field in stock data
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={100}
							fill="#8884d8"
							onClick={(data) => handleSelectStock(data.payload.id)} // Handle stock selection
						>
							{stocks.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="stock-details mt-4">
				{selectedStock ? (
					<div>
						<h3 className="text-xl font-semibold">{selectedStock.name} Details</h3>
						<p>Price: ${selectedStock.price}</p>
						<p>Change: {selectedStock.change}%</p>
					</div>
				) : (
					<p className="text-gray-400">Click on a stock to view details.</p>
				)}
			</div>
		</div>
	);
};

export default Chart;
