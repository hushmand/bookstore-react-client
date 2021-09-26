import logo from '../logo.svg';
import '../styles/App.css';

import { useSelector, useDispatch } from 'react-redux'
import { addToken, clearToken } from '../reducers/auth'

function Home() {

  const token = useSelector(state => state.auth.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
        <button
            aria-label="Add Token"
            onClick={() => dispatch(addToken('x'))}
        >
          Add Token
        </button>
        <span>{token}</span>
        <button
            aria-label="clear token"
            onClick={() => dispatch(clearToken())}
        >
          clear token
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
