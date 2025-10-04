import React, { useState } from "react";
import AddUserModal from "./AddUserModal";
import MessagePopup from "./MessagePopup";
import './MembersTable.css';

const membersData = [
  { id: 1, name: "Jane Cooper", email: "jessica.hanson@example.com", status: "Active", avatar: "JC" },
  { id: 2, name: "Jane Cooper", email: "willie.jennings@example.com", status: "Active", avatar: "JC" },
  { id: 3, name: "Jane Cooper", email: "d.chambers@example.com", status: "Inactive", avatar: "JC" },
  { id: 4, name: "Jane Cooper", email: "willie.jennings@example.com", status: "Inactive", avatar: "JC" },
  { id: 5, name: "Jane Cooper", email: "michael.mitc@example.com", status: "Inactive", avatar: "JC" },
  { id: 6, name: "Wade Warren", email: "michael.mitc@example.com", status: "Active", avatar: "WW" },
  { id: 7, name: "Jacob Jones", email: "deanna.curtis@example.com", status: "Pending", avatar: "JJ" },
  { id: 8, name: "Devon Lane", email: "alma.lawson@example.com", status: "Active", avatar: "DL" },
  { id: 9, name: "Jerome Bell", email: "tanya.hill@example.com", status: "Active", avatar: "JB" },
];

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "Active":
      return "Inactive";
    case "Inactive":
      return "Pending";
    case "Pending":
      return "Active";
    default:
      return "Active";
  }
};

const getAvatarColor = (name) => {
  const colors = {
    "Jane Cooper": "#8B5CF6",
    "Wade Warren": "#1F2937",
    "Jacob Jones": "#10B981",
    "Devon Lane": "#8B5CF6",
    "Jerome Bell": "#8B5CF6",
  };
  return colors[name] || "#8B5CF6";
};

const MembersTable = () => {
  const [members, setMembers] = useState(membersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [popupUser, setPopupUser] = useState(null);

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedMember) {
      setMembers(members.filter(m => m.id !== selectedMember.id));
      handleCloseModal();
    }
  };

  const showNotification = (userName) => {
    setNotification(userName);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleStatusChange = (memberId) => {
    setMembers(members.map(member => {
      if (member.id === memberId) {
        const newStatus = getNextStatus(member.status);
        const updatedMember = { ...member, status: newStatus };

        if (newStatus === 'Active') {
          showNotification(member.name);
        }

        return updatedMember;
      }
      return member;
    }));
  };

  const handleMessage = (member) => {
    setPopupUser(member);
    setShowMessagePopup(true);
  };

  const handleSendMessageToAll = () => {
    setPopupUser(null);
    setShowMessagePopup(true);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleAddUser = (formData) => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase();

    const newUser = {
      id: members.length + 1,
      name: fullName,
      email: formData.email,
      status: "Pending",
      avatar: initials
    };

    setMembers([...members, newUser]);
    setShowAddModal(false);
  };

  return (
    <div className="members-page">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet" />

      {notification && (
        <div className="user-approved-notification">
          <div className="notification-icon">
            <i className="bi bi-check"></i>
          </div>
          <div className="notification-content">
            <div className="notification-title">User Approved</div>
            <div className="notification-subtitle">{notification} is now active.</div>
          </div>
          <button className="notification-close" onClick={closeNotification}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">Members</h1>
        <div className="header-actions">
          <button className="btn-add-member" onClick={() => setShowAddModal(true)}>Add Member</button>
          <button className="btn-send-message" onClick={handleSendMessageToAll}>
            Send Message
          </button>
        </div>
      </div>

      <div className="members-table-wrapper">
        <table className="members-table">
          <thead>
            <tr>
              <th className="col-users">Users</th>
              <th className="col-email">E-mail</th>
              <th className="col-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="member-row">
                <td className="user-cell">
                  <div className="user-info">
                    <div
                      className="avatar"
                      style={{ backgroundColor: getAvatarColor(member.name) }}
                    >
                      {member.avatar}
                    </div>
                    <span className="user-name">{member.name}</span>
                  </div>
                </td>

                <td className="email-cell">{member.email}</td>

                <td className="status-cell">
                  <div className="status-actions-wrapper">
                    <button className="status-btn" onClick={() => handleStatusChange(member.id)}>
                      <span className={`status-badge ${member.status.toLowerCase()}`}>
                        <span className={`status-dot ${member.status.toLowerCase()}`}></span>
                        {member.status}
                      </span>
                    </button>

                    <div className="action-buttons">
                      <button className="action-btn message-action" onClick={() => handleMessage(member)}>
                        <i className={member.status === 'Pending' ? "bi bi-check-circle" : "bi bi-chat-left-text"}></i>
                      </button>
                      <button className="action-btn delete-action" onClick={() => handleOpenModal(member)}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddUser={handleAddUser}
      />

      <MessagePopup
        show={showMessagePopup}
        handleClose={() => setShowMessagePopup(false)}
        members={members}
        selectedUser={popupUser}
      />

      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="modal-body">
              <h3 className="modal-title">Delete This Member?</h3>
              <p className="modal-text">
                This action will permanently remove this member from the platform. Are you sure you want to delete this member?
              </p>
            </div>
            <div className="modal-buttons">
              <button className="btn-delete-confirm" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn-cancel-delete" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersTable;