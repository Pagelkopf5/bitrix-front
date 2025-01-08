import { deleteCompany } from '../../Services/api';
import './listCompany.css';

function ListCompany(props) {
  const handleDelete = async (id, idContact1, idContact2) => {
    let res = await deleteCompany(id, idContact1, idContact2)
    if (res) {
      alert('Empresa deletada com sucesso!')
      props.refresh()
    }
  }


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
                                <td>{company.TITLE}</td>
                                <td>{company.EMAIL[0]?.value}</td>
                                <td>{company.contacts[0]?.NAME} {company.contacts[0]?.LAST_NAME}</td>
                                <td>{company.contacts[1]?.NAME} {company.contacts[1]?.LAST_NAME}</td>
                                <td className='actions'>
                                    <button className='btn'>Editar</button>
                                    <button className='btn' onClick={() => handleDelete(company.ID, company.contacts[1]?.ID, company.contacts[1]?.ID)}>Excluir</button>
                                </td>
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
