import React from 'react';
import PropTypes from 'prop-types';

const Tags = props => {
  const { tags } = props
  return (
    <div className="columns">
      { tags.map((item, idx) => (
        <div className="column is-half is-offset-one-quarter" key={idx}>
          <table className="table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
            { tags.map((item, idx) =>
              <tr key={idx}>
                <td>{item.tag}</td>
                <td>{item.count}</td>
              </tr>
            )} 
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
}

export default Tags