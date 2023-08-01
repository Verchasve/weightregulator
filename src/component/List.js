import React from 'react';
const List = (props) => {
  const { users } = props;
  if (!users || users.length === 0) return <p>No repos, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>User Records</h2>
      {users.map((user) => {
        return (

          <div key={user.id} >
            <h1 style={{ color: "green" }}>{user?.Fname} {user?.Lname}</h1>
            <li className='list'>
              <span className='repo-text'>Email:{user?.Email} </span>
              <span className='repo-description'>Phone:{user?.Phone}</span>
            </li>
          </div>

        );
      })}
    </ul>
  );
};
export default List;
