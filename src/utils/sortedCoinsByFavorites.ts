import {CoinTypes} from '../types/coin.types';

export const sortedCoinsByFavorites = (
	coins: CoinTypes[],
	favorites: string[],
) => coins.sort((a) => favorites.includes(a.id) ? -1 : 0);
