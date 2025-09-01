import React from 'react'

export default function LimitSelector({limit, setLimit}) {
  return (
    <div className='controls'>
      <label htmlFor='limit'>Show: </label>
        <select id='limit' value={limit} onChange={(e)=>setLimit(e.target.value)}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </select>
    </div>
  )
}
