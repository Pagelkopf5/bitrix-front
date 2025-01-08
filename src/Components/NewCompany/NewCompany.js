import { useState } from 'react';
import { addCompany } from '../../Services/api';
import './newCompany.css';

function NewCompany() {
  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);

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

  return (
    <div className='new-company'>
      <div className='button-wrap'>
        <button className='btn' onClick={() => setOpen(!open)}>Nova Empresa</button>
      </div>
      <div className={`content ${open ? 'open' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <span>Empresa</span>
            <input type='text' name="company_name" onChange={handleChange} placeholder='Razão Social'/>
            <input type='email' name="email" onChange={handleChange} placeholder='Email'/>
          </div>
          <div>
            <span>Contato 1</span>
            <input type='text' name="contact_name_1" onChange={handleChange} placeholder='Nome'/>
            <input type='text' name="contact_second_name_1" onChange={handleChange} placeholder='Sobrenome'/>
          </div>
          <div>
            <span>Contato 2</span>
            <input type='text' name="contact_name_2" onChange={handleChange} placeholder='Nome'/>
            <input type='text' name="contact_second_name_2" onChange={handleChange} placeholder='Sobrenome'/>
          </div>
          <button className='btn btn-submit' type="submit" >Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default NewCompany;
