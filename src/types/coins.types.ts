import {CoinTypes} from './coin.types';

export interface CoinsProps {
	perPage: number;
	page: number;
	favorites: string[];
	coins: CoinTypes[];
	loading: boolean;
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: number) => void;
	onFavoriteToggle: (coinId: string) => void;
}
