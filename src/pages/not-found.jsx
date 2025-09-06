import React from 'react'
import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div style={style.container}>
        <h1 style={style.title}>404</h1>
        <p style={style.message}>Oops The page you're looking for does not exist</p>
        <Link style={style.link} to='/'>⬅️ Go Back Home</Link>
    </div>
  )
}

const style = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        color: '#fff'
    },
    title: {
        fontSize: '72px',
        marginBottom: '20px'
    },
    message: {
        fontSize: '18px',
        marginBottom: '30px'
    },
    link: {
        TextDecoration: 'none',
        color: '#007bff',
        FontWeight: 'bold'
    },
 
}
