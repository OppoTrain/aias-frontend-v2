import React, { useState } from 'react';
import Table from '../ui/Table';
import './UsersTable.css'; // We will create this CSS file for table-specific styles

const UsersTable = ({
  users,
  selectedUserIds,
  onToggleSelectAll,
  onToggleSelectUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const allSelected = users.length > 0 && selectedUserIds.size === users.length;

  // Calculate pagination
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
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
          {currentUsers.map(user => (
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
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
