import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router'
const API_URL = import.meta.env.VITE_API_COIN_URL
import Spinner from '../components/Spinner'
import CoinChart from '../components/CoinChart'

export default function CoinDetailsPage() {
    const { id } = useParams()
    const [coin, setCoin] = useState(null)
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCoin = async () => {
            try{
                const res = await fetch(`${API_URL}/${id}`);
                if(!res.ok) throw new Error('Failed to fetch data')
                const data = await res.json()
                setCoin(data)
            }catch(err){
                setError(err.message)
            }finally{
                setloading(false)
            }
        }
        fetchCoin()
    }, [id])
    return (
      <div className='coin-details-container'>
        <Link to='/'>⬅️ Back to Home</Link>

        <h1 className='coin-details-title'>
            {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details' }
            {loading && <Spinner />}
            {error && <div className='error'>❌ {error}</div>}
        </h1>

            {!loading && !error &&(
                <>
                    <img src={coin.image.large} alt={coin.name} className='coin-details-image' />
                    <p>{coin.description.en.split('. ')[0] + '.'}</p>
                    <div>Rank: #{coin.market_cap_rank}</div>
                    <h3>Current Price: {coin.market_data.current_price.usd.toLocaleString()}</h3>
                    <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                    <h4>24H High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
                    <h4>24H Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
                    <h4>24H price Change: ${coin.market_data.price_change_24h.toFixed(2)} ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)</h4>
                    <h4>All Time High: ${coin.market_data.ath.usd.toLocaleString()} on {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}</h4>
                    <h4>All Time Low: ${coin.market_data.atl.usd.toLocaleString()} on {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}</h4>
                    <h4>Last updated: {new Date(coin.last_updated).toLocaleDateString()}</h4>   
                    <CoinChart coinId={id} />
                    <div className='coin-details-links'>
                        {coin.links.homepage[0] && (
                            <p>
                                🪐 <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">Website</a>
                            </p>
                        )}
                        {coin.links.blockchain_site[0] && (
                            <p>
                                🧩 <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">Blockchain Explorer</a>
                            </p>
                        )}
                        {coin.categories.length > 0 && (
                            <p>Categories: {coin.categories.join('. ')}</p>
                        )}
                        {!loading && !error && !coin &&(
                            <p>No Data Found</p>
                        )}
                    </div>         
                </>
            )}
      </div>
    )
}
