import { Card } from 'antd'
import type { Cryptocurrency } from '../types/cryptocurrency'

interface CryptoCurrencyCardProps {
	currency: Cryptocurrency
}

const CryptoCurrencyCard = ({ currency }: CryptoCurrencyCardProps) => {
	return (
		<Card
			title={
				<div className='flex items-center gap-3'>
					<img
						src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
						alt={`${currency.name} logo`}
						className='w-8'
					/>
					<p>{currency.name}</p>
				</div>
			}
			style={{ width: 380 }}
		>
			<div className='flex flex-col items-left'>
				<p>Circulating supply - {currency.circulating_supply}</p>
				<p>
					Max supply - {!currency.max_supply ? 'None' : currency.max_supply}
				</p>
				<p>
					Num market pairs -{' '}
					<span className='text-green-500 font-bold'>
						{currency.num_market_pairs}
					</span>
				</p>
			</div>
		</Card>
	)
}

export default CryptoCurrencyCard
