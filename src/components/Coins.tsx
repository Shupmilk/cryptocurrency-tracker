import React, {useCallback} from 'react';
import {CoinsProps} from '../types/coins.types';
import Coin from './Coin';
import {Loading} from './Loading';
import './Coins.css'

const Coins: React.FC<CoinsProps> = ({
  page,
  favorites,
  coins,
  loading,
  onPageChange,
  onFavoriteToggle,
}) => {
	const handlePrevPage = useCallback(() => {
		onPageChange(page - 1);
	}, [page, onPageChange]);

	const handleNextPage = useCallback(() => {
		onPageChange(page + 1);
	}, [page, onPageChange]);

	const handleFavoriteToggle = useCallback(
		(coinId: string) => {
			onFavoriteToggle(coinId);
		},
		[onFavoriteToggle]
	);

	if (loading) return <Loading />

	return (
		<div className="coins">
			<h1>Cryptocurrency Tracker</h1>

			<Coin coins={coins} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />

			<div className="coins__actions">
				<button onClick={handlePrevPage} disabled={page === 1} className="button">
					Prev
				</button>
				<button onClick={handleNextPage} className="button">Next</button>
			</div>
		</div>
	);
};

export default React.memo(Coins);
