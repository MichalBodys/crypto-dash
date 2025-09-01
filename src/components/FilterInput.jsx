import React from 'react'

export default function FilterInput({filter, onFilterChange}) {
  return (
    <div className='filter'>
        <input type="text" value={filter}  placeholder='Filter coins by name or symbol' onChange={(e) => onFilterChange(e.target.value)}/>
    </div>
  )
}
