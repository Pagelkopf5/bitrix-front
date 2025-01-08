import { useEffect, useState } from 'react';
import './App.css';
import { getCompanies, deleteCompany } from './Services/api';
import NewCompany from './Components/NewCompany/NewCompany';

function App() {
  const [companies, setCompanies] = useState([]);

  const handleCompanies = async () => {
    let res = await getCompanies()
    if (res) {
      setCompanies(res.result)
    }
  }

  const handleDelete = async (id, idContact1, idContact2) => {
    let res = await deleteCompany(id, idContact1, idContact2)
    if (res) {
      alert('Empresa deletada com sucesso!')
      handleCompanies()
    }
  }

  const handleContacts = (company) => {
    return (
      company.contacts?.map((contact, index) => (
        <p key={index}>{contact.NAME} {contact.LAST_NAME}</p>
      ))
    )
  }

  useEffect(() => {
    handleCompanies()
  }, []);

  return (
    <div className="App">
      <h1>Empresas</h1>
      <NewCompany refresh={() => handleCompanies()}/>
      <div className='companies-list'>
        <div className='companies'>
          <div className='company'>
            <div className='company-info'>
              <span>Razão Social</span>
              <span>Email</span>
              <span>Contato 1</span>
              <span>Contato 2</span>
            </div>
            <div className='company-actions'>
              <span>Ações</span>
            </div>
          </div>
        </div>
        <div className='list'>
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <div className='company' key={index}>
                <div className='company-info'>
                  <p>{company.TITLE}</p>
                  <p>{company.HAS_EMAIL}</p>
                  {handleContacts(company)}
                </div>
                <div className='company-actions'>
                  <button className='btn-edit'>Editar</button>
                  <button className='btn-delete' onClick={() => handleDelete(company.ID, company.contacts[1].ID, company.contacts[1].ID, )}>Excluir</button>
                </div>
              </div>
            ))
          ) : (
            <div className='no-companies'>
              <p>No companies found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
