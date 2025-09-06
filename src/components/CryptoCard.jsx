
import { Link } from "react-router"


export default function CryptoCard({coin}) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div key={coin.id} className='coin-card'>
          <img src={coin.image} alt={coin.name} className='coin-image' />
          <div>
            <h2>{coin.name}</h2>
            <p className='symbol'>{coin.symbol.toUpperCase()}</p>
          </div>
          <p className='price'>${coin.current_price.toLocaleString()}</p>
          <p className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
          <p> Market Cap: ${coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  )
}
