import React, {ReactNode} from 'react';
import {CoinTypes} from '../types/coin.types';
import './CoinCard.css';

export type CoinCardTypes = {
	coin: CoinTypes,
	children: ReactNode,
	className?: string,
}

export const CoinCard = ({coin, children, className}: CoinCardTypes) => (
	<div className={`card ${className}`}>
		<div className="card__item card__item_image">
			<img src={coin.image} alt={coin.name} width='30px' />
		</div>
		<div className="card__item">
			<span>{coin.name}</span>
			{children}
		</div>
		<div className="card__item">{coin.symbol}</div>
		<div className="card__item">{coin.current_price}</div>
		<div className="card__item">{coin.price_change_percentage_24h}%</div>


	</div>
);
