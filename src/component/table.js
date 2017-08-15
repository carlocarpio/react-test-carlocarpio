import React from 'react';
import PropTypes from 'prop-types';

const Table = props => {
  const { type, users, openModal } = props
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Company</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
        { users.map((item, idx) =>
          <tr key={idx}>
            <td><img src={item.picture} alt={item.name}/></td>
            <td >
              { type === 'inactive' && <a onClick={() => openModal(idx, 'userInfo')}>{item.name}</a> }
              { type === 'active' && <h3>{item.name}</h3> }
            </td>
            <td>{item.email}</td>
            <td>{item.registered}</td>
            <td>{item.company}</td>
            <td>
              {item.tags.map((i, x) => ( <small key={x}>{i}, </small> ))}
              { type === 'active' && <a onClick={() => openModal(idx, 'tagInput')}>+</a> }
            </td>
          </tr>
        )} 
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
	users: PropTypes.array,
  openModal: PropTypes.func,
  setActiveItem: PropTypes.func,
}

export default Table