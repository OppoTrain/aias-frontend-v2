import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DataTable from '../../components/ui/DataTable';
import mlImage from '../../assets/images/ml-essentials.PNG';
import aiImage from '../../assets/images/ai-marketing.jpg';
import uxImage from '../../assets/images/ux-bootcamp.jpg';

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
        const data = await response.json();
        const formattedUsers = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: index % 2 === 0 ? "Active" : "Inactive"
        }));
        setUsers(formattedUsers);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const activeCount = users.filter(u => u.status === 'Active').length;
  const inactiveCount = users.filter(u => u.status === 'Inactive').length;

  const events = [
    {
      id: 1,
      title: "ux/UI Bootcamp",
      description: "A practical workshop focused on creating intuitive and user-centered designs.",
      buttonText: "See Details →",
      imageUrl: uxImage
    },
    {
      id: 2,
      title: "AI & Marketing 101",
      description: "Discover how artificial intelligence is reshaping the future of digital marketing",
      buttonText: "Learn More →",
      imageUrl: aiImage
    },
    {
      id: 3,
      title: "Machine Learning Essentials",
      description: "A beginner-friendly introduction to machine learning concepts, tools, and workflows.",
      buttonText: "Learn More →",
      imageUrl: mlImage
    }
  ];

  const allSelected = users.length > 0 && selectedUserIds.size === users.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(users.map(u => u.id)));
    }
  };

  const toggleSelectUser = (userId) => {
    const newSelected = new Set(selectedUserIds);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUserIds(newSelected);
  };

  const handleEventClick = (title) => {
    // Replace alert with console log or navigation logic as needed
    console.log(`See details for event: ${title}`);
  };

  const columns = [
    {
      key: 'name',
      label: 'Users',
      className: 'user-info-cell',
      render: (user) => (
        <>
          <div className="user-initials">
            {user.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <span>{user.name}</span>
        </>
      ),
    },
    { key: 'email', label: 'E-mail' },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <span
          className={`status-badge ${
            user.status === 'Active' ? 'status-active' : 'status-inactive'
          }`}
        >
          {user.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      title: 'Chat',
      className: 'chat-btn',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#3b82f6"
          viewBox="0 0 24 24"
        >
          <path d="M21 6h-18v12h4v4l4-4h10z" />
        </svg>
      ),
      onClick: (user) => console.log('Chat with', user.name),
    },
    {
      title: 'Delete',
      className: 'delete-btn',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#ef4444"
          viewBox="0 0 24 24"
        >
          <path d="M3 6h18v2h-18zm3 3h12v11h-12z" />
        </svg>
      ),
      onClick: (user) => console.log('Delete user', user.name),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card stat-card-active">
          <div className="stat-icon stat-icon-active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#22c55e" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div className="stat-content">
            <h6 className="stat-label">Active User</h6>
            <p className="stat-value">{activeCount}</p>
          </div>
        </div>

        <div className="stat-card stat-card-inactive">
          <div className="stat-icon stat-icon-inactive">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div className="stat-content">
            <h6 className="stat-label">Inactive User</h6>
            <p className="stat-value">{inactiveCount}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="section">
        <h3 className="section-title">Upcoming Events</h3>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img
                src={event.imageUrl}
                className="event-image"
                alt={event.title}
              />
              <div className="event-content">
                <h5 className="event-title">{event.title}</h5>
                <p className="event-description">
                  {event.description}
                </p>
                <button
                  className="event-btn"
                  onClick={() => handleEventClick(event.title)}
                >
                  {event.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="section">
        <h3 className="section-title">Recent Users</h3>
        <DataTable
          data={users}
          columns={columns}
          selectedIds={selectedUserIds}
          onToggleSelectAll={toggleSelectAll}
          onToggleSelectItem={toggleSelectUser}
          actions={actions}
          pagination={true}
          headerButtons={[]}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
