import React from 'react';
import {Coin} from '../types/coins.types';

interface ViewProps {
	coins: Coin[];
	favorites: string[];
}

const View: React.FC<ViewProps> = ({ coins, favorites }) => {
	return (
		<div>
			<h2>Cryptocurrency Tracker</h2>
			<ul>
				{coins.map((coin) => (
					<li key={coin.id}>
						<div>
							<span>Name: {coin.name}</span>
							<span>Symbol: {coin.symbol}</span>
							<span>Price: {coin.current_price}</span>
							<span>Market Cap Rank: {coin.market_cap_rank}</span>
							<span>
                Favorite:
                <input
	                type="checkbox"
	                checked={favorites.includes(coin.id)}
	                onChange={() => {}}
                />
              </span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default View;
