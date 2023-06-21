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
	searchTerm,
	handleSearchChange,
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
		<section className="coins">
			<h1 className="coins__title">Cryptocurrency Tracker</h1>

			<input
				type="text"
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder="Search by name"
				className="coins__input"
			/>

			<Coin coins={coins} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />

			<div className="coins__actions">
				<button onClick={handlePrevPage} disabled={page === 1} className="button">
					Prev
				</button>
				<button onClick={handleNextPage} className="button">Next</button>
			</div>
		</section>
	);
};

export default React.memo(Coins);
