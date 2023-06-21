import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { debounce } from 'lodash';
import Coins from './components/Coins';
import { CoinTypes } from './types/coin.types';

const App: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const [favorites, setFavorites] = useState<string[]>(() => {
		const storedFavorites = localStorage.getItem('favorites');
		return storedFavorites ? JSON.parse(storedFavorites) : [];
	});
	const [coins, setCoins] = useState<CoinTypes[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState<string>('');



	useEffect(() => {
		const fetchCoins = async () => {
			setLoading(true);

			try {
				const response = await fetch(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per&page=${page}`
				);
				const data = await response.json();
				setCoins(data);
				setLoading(false);
			} catch (error) {
				alert('API Error');
				setLoading(false);
			}
		};

		fetchCoins();
	}, [page]);

	useEffect(() => {
		// Save favorites to localStorage whenever it changes
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);


	const handlePageChange = (newPage: number) => {
		setPage(newPage);
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

	const throttledHandleSearchChange = debounce((value: string) => {
		setSearchTerm(value);
	}, 100);

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			throttledHandleSearchChange(value);
		},
		[throttledHandleSearchChange]
	);

	const filteredCoins = useMemo(
		() =>
			coins.filter((coin) =>
				coin.name.toLowerCase().includes(searchTerm.toLowerCase())
			),
		[coins, searchTerm]
	);

	return (
		<main>
			<Coins
				page={page}
				loading={loading}
				onPageChange={handlePageChange}
				coins={filteredCoins}
				onFavoriteToggle={handleFavoriteToggle}
				favorites={favorites}
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
			/>
		</main>
	);
};

export default App;
