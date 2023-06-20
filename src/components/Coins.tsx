import React, {useCallback} from 'react';
import Coin from './Coin';
import {CoinsProps} from '../types/coins.types';

const Coins: React.FC<CoinsProps> = ({
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

			<Coin coins={coins} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />

			<div>
				<button onClick={handlePrevPage} disabled={page === 1}>
					Prev
				</button>
				<button onClick={handleNextPage}>Next</button>
			</div>
		</div>
	);
};

export default React.memo(Coins);
