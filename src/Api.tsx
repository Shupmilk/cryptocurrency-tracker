import React, { useState, useEffect } from 'react';
import App from './App';
import View from './components/Coins';
import { Coin } from './types/coins.types';

const Api: React.FC = () => {
	const [perPage, setPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [favorites, setFavorites] = useState<string[]>(() => {
		const storedFavorites = localStorage.getItem('favorites');
		return storedFavorites ? JSON.parse(storedFavorites) : [];
	});
	const [coins, setCoins] = useState<Coin[]>([]);
	const [loading, setLoading] = useState(true);

	let fetchCoins: () => Promise<void>;
	fetchCoins = async () => {
		setLoading(true);

		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`
			);
			const data = await response.json();
			setCoins(data);
			setLoading(false);
		} catch (error) {
			alert('API Error');
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCoins();
	}, [fetchCoins, page, perPage]);

	useEffect(() => {
		// Save favorites to localStorage whenever it changes
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);


	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
		setPage(1); // Reset page to 1 when changing perPage
	};

	const handleFavoriteToggle = (coinId: string) => {
		if (favorites.includes(coinId)) {
			// Remove from favorites
			const updatedFavorites = favorites.filter((id) => id !== coinId);
			setFavorites(updatedFavorites);
		} else {
			// Add to favorites
			const updatedFavorites = [...favorites, coinId];
			setFavorites(updatedFavorites);
		}
	};

	return (
		<div>
			<App
				perPage={perPage}
				page={page}
				loading={loading}
				onPageChange={handlePageChange}
				onPerPageChange={handlePerPageChange}
				coins={coins}
				onFavoriteToggle={handleFavoriteToggle}
				favorites={favorites}
			/>
			<View coins={coins} favorites={favorites} />
		</div>
	);
};

export default Api;