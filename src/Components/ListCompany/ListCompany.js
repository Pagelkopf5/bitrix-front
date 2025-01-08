import { useState } from 'react';
import { deleteCompany, editCompany } from '../../Services/api';
import './listCompany.css';

function ListCompany(props) {
    const clearForm = {
            company_name: '',
            email: '',
            contact_1_id: '',
            contact_name_1: '',
            contact_second_name_1: '',
            contact_2_id: '',
            contact_name_2: '',
            contact_second_name_2: ''
    }
    const [edit, setEdit] = useState()
    const [formData, setFormData] = useState({});
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleDelete = async (id, idContact1, idContact2) => {
        let res = await deleteCompany(id, idContact1, idContact2)
        if (res) {
            alert('Empresa deletada com sucesso!')
            props.refresh()
        }
    }

    const activeEdit = (index, company) => {
        setEdit(index)
        setFormData({
            ID: company.ID,
            company_name: company.TITLE,
            email: company.EMAIL[0]?.VALUE,
            contact_1_id: company.contacts[0]?.ID,
            contact_name_1: company.contacts[0]?.NAME,
            contact_second_name_1: company.contacts[0]?.LAST_NAME,
            contact_2_id: company.contacts[1]?.ID,
            contact_name_2: company.contacts[1]?.NAME,
            contact_second_name_2: company.contacts[1]?.LAST_NAME
        })
    }

    const resetEdit = () => {
        setEdit(null)
        setFormData(clearForm)
    }

    const handleSubmit = async () => {
        let res = await editCompany(formData)
        if (res) {
            alert('Empresa editada com sucesso!')
            // resetEdit()
            // props.refresh() 
            // props.setCompanies()
            window.location.reload(); // não é o certo mas é o que funciona, seria melhor trazer a setCompanies e atualizar a lista ja que temos a key
        }
    };

    return (
        <div className='companies-list'>
            <table className='companies'>
                <thead>
                    <tr>
                        <th>Razão Social</th>
                        <th>Email</th>
                        <th>Contato 1</th>
                        <th>Contato 2</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.companies.length > 0 ? (
                        props.companies.map((company, index) => (
                            <tr key={index}>
                                {edit === index ? (
                                    <>
                                        <td><input type='text' name="company_name" onChange={handleChange} value={formData.company_name} /></td>
                                        <td><input type='email' name="email" onChange={handleChange} value={formData.email} /></td>
                                        <td className='names'>
                                            <input type='text' name="contact_name_1" onChange={handleChange} value={formData.contact_name_1} />
                                            <input type='text' name="contact_second_name_1" onChange={handleChange} value={formData.contact_second_name_1} />
                                        </td>
                                        <td className='names'>
                                            <input type='text' name="contact_name_2" onChange={handleChange} value={formData.contact_name_2} />
                                            <input type='text' name="contact_second_name_2" onChange={handleChange} value={formData.contact_second_name_2} />
                                        </td>
                                        <td className='actions'>
                                            <button className='btn' onClick={() => handleSubmit()}>Salvar</button>
                                            <button className='btn' onClick={() => resetEdit()}>Cancelar</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{company.TITLE}</td>
                                        <td>{company.EMAIL[0]?.VALUE}</td>
                                        <td>{company.contacts[0]?.NAME} {company.contacts[0]?.LAST_NAME}</td>
                                        <td>{company.contacts[1]?.NAME} {company.contacts[1]?.LAST_NAME}</td>
                                        <td className='actions'>
                                            <button className='btn' onClick={() => activeEdit(index, company)}>Editar</button>
                                            <button className='btn' onClick={() => handleDelete(company.ID, company.contacts[1]?.ID, company.contacts[1]?.ID)}>Excluir</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className='no-companies'>
                                <p>No companies found</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListCompany;
