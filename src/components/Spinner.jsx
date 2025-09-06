import React from 'react'
import { BarLoader } from 'react-spinners'

const ovveride = {
    dispaly: 'block',
    margin: '0 auto 50px auto'
}
export default function Spinner({color = 'blue', size='150'}) {
  return (
    <div>
        <BarLoader 
            color={color} 
            size={size}
            cssOverride={ovveride}
            aria-label='Loading....'
        />
    </div>
  )
}
