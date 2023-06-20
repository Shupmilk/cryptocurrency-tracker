import React, {useCallback} from 'react';
import {CoinTypes} from '../types/coin.types';
import {sortedCoinsByFavorites} from '../utils/sortedCoinsByFavorites';
import {CoinCard} from './CoinCard';
import './Coin.css';

interface Props {
	coins: CoinTypes[];
	favorites: string[];
	onFavoriteToggle: (coinId: string) => void;
}

const Coin: React.FC<Props> = ({
    favorites,
    coins,
    onFavoriteToggle,
}) => {

	const handleFavoriteToggle = useCallback(
		(coinId: string) => {
			onFavoriteToggle(coinId);
		}, [onFavoriteToggle]);

	return (
		<div style={{ margin: '15px 0' }}>
			{sortedCoinsByFavorites(coins, favorites).map((coin) => (
				<CoinCard coin={coin} key={coin.id}>
					<button
						onClick={() => handleFavoriteToggle(coin.id)}
						className="coin__button"
					>
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="24" width="24">
							<polygon
								points="12,3 6,21 21,9 3,9 18,21"
					            style={{ translate: '.5s', fill: `${favorites.includes(coin.id) ? 'yellow' : 'grey'}`}}
							/>
						</svg>
					</button>
				</CoinCard>
			))}
		</div>
	);
};

export default Coin;
