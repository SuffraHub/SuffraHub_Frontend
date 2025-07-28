import { useEffect } from 'react';

// komponenty
import Header from '../components/admin/Header.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';
import Footer from '../components/Footer.jsx';


function Admin() {
 // const [count, setCount] = useState(0)
 useEffect(() => {
    document.title = 'Home | SuffraHub';
  })

 const mockToasts = [
    "Głosowanie zostało zapisane",
    "Zmieniono status ankiety"
  ]; // to jest placeholder zeby sie toast wyswietlal

  return (
    <>
    <Header />
    <Sidebar />
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h1>DO ZMIANY! - HOME</h1>
        </main> 
      
      <Footer toastMessages={mockToasts} />
    </>
  )
}

export default Admin
