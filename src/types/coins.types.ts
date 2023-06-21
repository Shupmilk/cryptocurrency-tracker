import {ChangeEvent} from 'react';
import {CoinTypes} from './coin.types';

export interface CoinsProps {
	page: number;
	favorites: string[];
	coins: CoinTypes[];
	loading: boolean;
	onPageChange: (page: number) => void;
	onFavoriteToggle: (coinId: string) => void;
	searchTerm: string;
	handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
