import React, {ReactNode} from 'react';
import {CoinTypes} from '../types/coin.types';
import './CoinCard.css';

export type CoinCardTypes = {
	coin: CoinTypes,
	children: ReactNode,
}

export const CoinCard = ({coin, children}: CoinCardTypes) => (
	<div className="card">
		<span className="card__item card__item_image">
			<img src={coin.image} alt={coin.name} width='30px' />
		</span>
		<span className="card__item">Name: {coin.name}</span>
		<span className="card__item">Symbol: {coin.symbol}</span>
		<span className="card__item">Price: {coin.current_price}</span>
		<span className="card__item">Market Cap Rank: {coin.market_cap_rank}</span>

		{children}
	</div>
);
