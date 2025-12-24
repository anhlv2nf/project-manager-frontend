import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        axios.get('/api/test')
            .then(response => {
                setMessage(response.data.message)
            })
            .catch(error => {
                console.error('There was an error!', error)
                setMessage('Error connecting to API')
            })
    }, [])

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Project Manager</h1>
            <p>Status from Backend: <strong>{message}</strong></p>
        </div>
    )
}

export default App
