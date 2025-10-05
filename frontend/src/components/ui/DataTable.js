import React, { useState } from 'react';
import Table from './Table';
import './DataTable.css';

const DataTable = ({
  data,
  columns,
  selectable = true,
  selectedIds = new Set(),
  onToggleSelectAll,
  onToggleSelectItem,
  actions = [],
  pagination = true,
  rowsPerPage = 5,
  headerButtons = [],
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const allSelected = data.length > 0 && selectedIds.size === data.length;

  // Calculate pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={`data-table-container ${className}`}>
      {(headerButtons.length > 0) && (
        <div className="data-table-header">
          <div className="data-table-buttons">
            {headerButtons.map((button, index) => (
              <button
                key={index}
                className={`btn ${button.className || 'btn-primary'}`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <Table className="data-table">
        <thead>
          <tr>
            {selectable && (
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                />
              </th>
            )}
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            {actions.length > 0 && <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index}>
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => onToggleSelectItem(item.id)}
                  />
                </td>
              )}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={col.className || ''}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="actions-cell">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`action-btn ${action.className || ''}`}
                      title={action.title}
                      onClick={() => action.onClick(item)}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {pagination && totalPages > 1 && (
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

export default DataTable;
