import { useEffect, useState } from 'react';
import './App.css';
import { addCompany, getCompanies, deleteCompany } from './Services/api';

function App() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await addCompany(formData)
    if (res) {
      alert('Empresa cadastrada com sucesso!')
    }
  };

  const handleCompanies = async () => {
    let res = await getCompanies()
    if (res) {
      setCompanies(res)
    }
  }

  const handleDelete = async (id, idContact1, idContact2) => {
    let res = await deleteCompany(id, idContact1, idContact2)
    if (res) {
      alert('Empresa deletada com sucesso!')
    }
  }

  useEffect(() => {
    handleCompanies()
  }, []);

  return (
    <div className="App">
      <div className='new-company'>
        <div className='button-wrap'>
          <button className='btn'>Nova Empresa</button>
        </div>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <input type='text' name="company_name" onChange={handleChange} placeholder='Razão Social'/>
            <input type='email' name="email" onChange={handleChange} placeholder='Email'/>
            <span>Contato 1</span>
            <input type='text' name="contact_name_1" onChange={handleChange} placeholder='Nome'/>
            <input type='text' name="contact_second_name_1" onChange={handleChange} placeholder='Sobrenome'/>
            <span>Contato 2</span>
            <input type='text' name="contact_name_2" onChange={handleChange} placeholder='Nome'/>
            <input type='text' name="contact_second_name_2" onChange={handleChange} placeholder='Sobrenome'/>
            <button className='btn-submit' type="submit" >Salvar</button>
          </form>
        </div>
      </div>
      <div className='companies-list'>
        <h2>Empresas</h2>
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
                  <span>{company.company_name}</span>
                  <span>{company.email}</span>
                  <span>{company.contact_name_1} {company.contact_second_name_1}</span>
                  <span>{company.contact_name_2} {company.contact_second_name_2}</span>
                </div>
                <div className='company-actions'>
                  <button className='btn-edit'>Editar</button>
                  <button className='btn-delete' onClick={() => handleDelete(company.ID, company.contacts[0].ID, company.contacts[1].ID, )}>Excluir</button>
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
