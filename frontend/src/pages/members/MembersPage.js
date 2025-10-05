import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';

const initialMembers = [
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jessica.hanson@example.com',
    status: 'Active',
    avatar: null,
  },
  {
    id: 2,
    name: 'Jane Cooper',
    email: 'willie.jennings@example.com',
    status: 'Active',
    avatar: null,
  },
  {
    id: 3,
    name: 'Jane Cooper',
    email: 'd.chambers@example.com',
    status: 'Inactive',
    avatar: null,
  },
  {
    id: 4,
    name: 'Jane Cooper',
    email: 'willie.jennings@example.com',
    status: 'Inactive',
    avatar: null,
  },
  {
    id: 5,
    name: 'Jane Cooper',
    email: 'michael.mitc@example.com',
    status: 'Inactive',
    avatar: null,
  },
  {
    id: 6,
    name: 'Wade Warren',
    email: 'michael.mitc@example.com',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 7,
    name: 'Jacob Jones',
    email: 'deanna.curtis@example.com',
    status: 'Pending',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: 8,
    name: 'Devon Lane',
    email: 'alma.lawson@example.com',
    status: 'Active',
    avatar: null,
  },
  {
    id: 9,
    name: 'Jerome Bell',
    email: 'tanya.hill@example.com',
    status: 'Active',
    avatar: null,
  },
];

const MembersPage = () => {
  const [members] = useState(initialMembers);
  const [selectedMemberIds, setSelectedMemberIds] = useState(new Set());

  const toggleSelectAll = () => {
    if (selectedMemberIds.size === members.length) {
      setSelectedMemberIds(new Set());
    } else {
      setSelectedMemberIds(new Set(members.map(m => m.id)));
    }
  };

  const toggleSelectMember = (id) => {
    const newSelected = new Set(selectedMemberIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMemberIds(newSelected);
  };

  const columns = [
    {
      key: 'name',
      label: 'Users',
      className: 'user-info-cell',
      render: (member) => (
        <>
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="user-avatar" />
          ) : (
            <div className="user-initials">
              {member.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
          <span>{member.name}</span>
        </>
      ),
    },
    { key: 'email', label: 'E-mail' },
    {
      key: 'status',
      label: 'Status',
      render: (member) => (
        <span
          className={`status-badge ${
            member.status === 'Active'
              ? 'status-active'
              : member.status === 'Inactive'
              ? 'status-inactive'
              : 'status-pending'
          }`}
        >
          {member.status}
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
      onClick: (member) => console.log('Chat with', member.name),
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
      onClick: (member) => console.log('Delete member', member.name),
    },
  ];

  return (
    <div className="members-page">
      <div className="members-header">
        <h1>Members</h1>
      </div>
      <DataTable
        data={members}
        columns={columns}
        selectedIds={selectedMemberIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectItem={toggleSelectMember}
        actions={actions}
        pagination={true}
        headerButtons={[
          { label: 'Add Member', className: 'btn-primary', onClick: () => console.log('Add Member clicked') },
          { label: 'Send Message', className: 'btn-outline btn-whitesmoke', onClick: () => console.log('Send Message clicked') },
        ]}
      />
    </div>
  );
};

export default MembersPage;
