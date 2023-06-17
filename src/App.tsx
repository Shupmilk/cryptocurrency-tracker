import React, {useCallback} from 'react';

interface Coin {
	id: string;
	name: string;
	symbol: string;
}

interface Props {
	perPage: number;
	page: number;
	favorites: string[];
	coins: Coin[];
	loading: boolean;
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: number) => void;
	onFavoriteToggle: (coinId: string) => void;
}

const App: React.FC<Props> = ({
      perPage,
      page,
      favorites,
      coins,
      loading,
      onPageChange,
      onPerPageChange,
      onFavoriteToggle,
  }) => {
	const handlePrevPage = useCallback(() => {
		onPageChange(page - 1);
	}, [page, onPageChange]);

	const handleNextPage = useCallback(() => {
		onPageChange(page + 1);
	}, [page, onPageChange]);

	const handlePerPageChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onPerPageChange(Number(event.target.value));
		},
		[onPerPageChange]
	);

	const handleFavoriteToggle = useCallback(
		(coinId: string) => {
			onFavoriteToggle(coinId);
		},
		[onFavoriteToggle]
	);

	const renderView = () => {
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h1>Cryptocurrency Tracker</h1>
				<div>
					<label>Per Page:</label>
					<select value={perPage} onChange={handlePerPageChange}>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
					</select>
				</div>
				<ul>
					{coins.map((coin) => (
						<li key={coin.id}>
							<span>{coin.name}</span>
							<span>{coin.symbol}</span>
							<button onClick={() => handleFavoriteToggle(coin.id)}>
								{favorites.includes(coin.id) ? 'Unfavorite' : 'Favorite'}
							</button>
						</li>
					))}
				</ul>
				<div>
					<button onClick={handlePrevPage} disabled={page === 1}>
						Prev
					</button>
					<button onClick={handleNextPage}>Next</button>
				</div>
				<div>
					<h2>Favorites</h2>
					<ul>
						{favorites.map((favorite) => (
							<li key={favorite}>{favorite}</li>
						))}
					</ul>
				</div>
			</div>
		);
	};

	return <div>{renderView()}</div>;
};

export default React.memo(App);
