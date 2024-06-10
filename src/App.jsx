import './App.scss';
import { useEffect, useState } from 'react';
import Instructions from './instrucciones.jpg';

function App() {
  const [bombName, setBombName] = useState('');
  const [leaderboard, setLeaderboard] = useState([{dispositive: 'Bomb 4', time: 31}, {dispositive: 'Bomb 1', time: 43}, {dispositive: 'Bomb 3', time: 64}]);

  const startGame = async () => {
    try {
      const res = await fetch('http://100.28.74.43:8081/startgame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dispositive: bombName})
      });

      if(res.ok){
        alert('Game started');
        setBombName('')
      }
      else{
        alert('Could not start game');
      }

    }catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = async () => {
    try {
      const res = await fetch('http://100.28.74.43:8081/leaderboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();
      if(res.ok){
        const sortedData = data.sort((a, b) => a.time - b.time);
        setLeaderboard(sortedData);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="page">
      <div className="col1">
        <div className="input-container">
          <input type="text" value={bombName} placeholder='Bomb Name' onChange={(e) => setBombName(e.target.value)} />
          <button className="button" onClick={startGame}>Start Game</button>
        </div>

        <div className='leaderboard'>
          <h2>Best times</h2>
          <ul>
            {leaderboard.map((item, index) => (
              <div className='item' key={index}>{index+1}. <b>{item.dispositive}</b>: {Math.round(item.time * 100) / 100} seconds</div>
            ))}
          </ul>
        </div>
      </div>
      <div className="col2">
        <img src={Instructions} />
      </div>
      
    </div>
  );
}

export default App;
