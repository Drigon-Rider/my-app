import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios';

function Home() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() =>{
    axios.get('http://localhost:5173/db.json').then((res)=>{
        setData(res.data.users);
        setIsLoading(false);
    })

  }, [])

  if (isLoading) return <div className="p-4">Loading...</div>

  return (
    <div className="App">
      <header className="App-header flex flex-col items-center">
        <button onClick = {() => setCount((count) => count +1)}>
          <p className='text-blue-500'>Increment</p>
        </button>
        <p>{count}  </p>
        <button onClick = {() => setCount((count) => count -1)}>
          Decrement
        </button>
      </header>
      <div>
        {data.map((users: any) => {
          return <div key={users.name}>{users.name}</div>
        })}
      </div>
    </div>
  )
}

export default Home

