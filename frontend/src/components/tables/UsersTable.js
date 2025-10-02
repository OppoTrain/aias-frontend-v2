import React from 'react';
import Table from '../ui/Table';
import './UsersTable.css'; // We will create this CSS file for table-specific styles

const UsersTable = ({
  users,
  selectedUserIds,
  onToggleSelectAll,
  onToggleSelectUser,
}) => {
  const allSelected = users.length > 0 && selectedUserIds.size === users.length;

  return (
    <Table className="users-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleSelectAll}
            />
          </th>
          <th>Users</th>
          <th>E-mail</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedUserIds.has(user.id)}
                onChange={() => onToggleSelectUser(user.id)}
              />
            </td>
            <td className="user-info-cell">
              <div className="user-initials">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <span>{user.name}</span>
            </td>
            <td>{user.email}</td>
            <td>
              <span
                className={`status-badge ${
                  user.status === 'Active' ? 'status-active' : 'status-inactive'
                }`}
              >
                {user.status}
              </span>
            </td>
            <td className="actions-cell">
              <button className="action-btn chat-btn" title="Chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#3b82f6"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 6h-18v12h4v4l4-4h10z" />
                </svg>
              </button>
              <button className="action-btn delete-btn" title="Delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#ef4444"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18v2h-18zm3 3h12v11h-12z" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
