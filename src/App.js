import { useEffect, useState } from 'react';
import './App.css';
import { getCompanies } from './Services/api';
import NewCompany from './Components/NewCompany/NewCompany';
import ListCompany from './Components/ListCompany/ListCompany';

function App() {
  const [companies, setCompanies] = useState([]);

  const handleCompanies = async () => {
    let res = await getCompanies()
    if (res) {
      setCompanies(res.result)
    }
  }

  useEffect(() => {
    handleCompanies()
  }, []);

  return (
    <div className="App">
      <h1>Empresas</h1>
      <NewCompany refresh={() => handleCompanies()}/>
      <ListCompany companies={companies} refresh={() => handleCompanies()}/>
    </div>
  );
}

export default App;
