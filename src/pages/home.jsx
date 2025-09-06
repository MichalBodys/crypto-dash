import React from 'react'
import CryptoCard from '../components/CryptoCard'
import LimitSelector from '../components/LimitSelector'
import FilterInput from '../components/FilterInput'
import SortSelector from '../components/SortSelector'
import Spinner from '../components/Spinner'

export default function HomePage({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    loading,
    error
}) {

    const filterCoins  = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) 
        || coin.symbol.toLowerCase().includes(filter.toLowerCase())
      }).slice().sort((a,b) => {
        switch(sortBy){
          case 'market_cap_desc':
            return b.market_cap - a.market_cap;
          case 'market_cap_asc':
            return a.market_cap - b.market_cap;
          case 'price_des':
            return b.current_price - a.current_price;
          case 'price_asc':
            return a.current_price - b.current_price;
          case 'change_desc':
            return a.price_change_percentage_24h - b.price_change_percentage_24h;
          case 'change_asc':
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }
      })

  return (
     <div>
      <h1>Crypto dashboard 🚀</h1>
      {loading && <Spinner color='white'/>}
      {error && <div className='error'>{error}</div>}
      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} setLimit={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy}/>
      </div>
      {!loading && !error && (
        <main className='grid'>
          {filterCoins.length > 0 ? filterCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          )) 
          : <p>no matching coins</p>}
        </main>
      )}
    </div>
  )
}
