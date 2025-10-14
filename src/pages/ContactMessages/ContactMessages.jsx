import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import "../ContactMessages/ContactMessages.css";
import axios from "axios";
import { toast } from "react-toastify";

const ContactMessages = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData,setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");


  // Tüm mesajları çek
  const fetchContactMessages = async () => {
    try {
      const response = await axios.get("http://foodies-railway-deploy.railway.internal/api/contact/all");
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  };

  // Mesaj silme
  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.delete(
        `http://foodies-railway-deploy.railway.internal/api/contact/${contactId}`
      );

      if (response.status === 204) {
        toast.success("Contact message deleted successfully");
        const newData = data.filter((msg) => msg.id !== contactId);
        setData(newData);
        setFilteredData(newData);
      } else {
        toast.error("Failed to delete contact message");
      }
    } catch (error) {
      console.error("Delete contact error:", error);
      toast.error("An error occurred while deleting the contact message");
    }
  };

  // Mesajı okundu olarak işaretle
  const handleMarkAsRead = async (contactId) => {
    try {
      const response = await axios.patch(
        `hhttp://foodies-railway-deploy.railway.internal/api/contact/${contactId}/read`
      );

      if (response.status === 200) {
        toast.success("Message marked as read");
        const newData = data.map((msg) =>
          msg.id === contactId ? { ...msg, status: "Read" } : msg
        );
        setData(newData);
        setFilteredData(newData);
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("An error occurred while updating message status");
    }
  };

  useEffect(() => {
    let filtered = data;
    if(searchText) {
      filtered = filtered.filter(
        (item)=>
          item.email.toLowerCase().includes(searchText.toLowerCase()) ||
          item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if(statusFilter) {
       filtered = filtered.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLocaleLowerCase()
       );
    }
    setFilteredData(filtered);
  }, [searchText,statusFilter,data]);

   useEffect(() => {
    fetchContactMessages();
  }, []);

  return (
    <div className="contact-messages-container">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="fw-bold m-0">
          <i className="bi bi-envelope-paper-heart me-2 text-primary"></i>
          Contact Messages
          <span className="badge bg-secondary ms-2">{filteredData.length}</span>{" "}
          {/* Toplam mesaj */}
        </h2>
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="form-control search-input"
            value={searchText}
           onChange={(e)=>setSearchText(e.target.value)}
          />
          <select className="form-select status-filter" 
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="empty-state text-center py-5">
          <i className="bi bi-inbox fs-1 text-secondary"></i>
          <p className="text-muted mt-3 mb-0">No messages found.</p>
        </div>
      ) : (
        <div className="messages-grid">
          {filteredData.map((msg) => (
            <div key={msg.id} className="message-card shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="mb-1 text-capitalize fw-semibold">
                    {msg.firstName} {msg.lastName}
                  </h5>
                  <small className="text-muted">{msg.email}</small>
                </div>
                <span
                  className={`badge ${
                    msg.status === "New" ? "bg-warning text-dark" : "bg-success"
                  }`}
                >
                  {msg.status}
                </span>
              </div>

              <div className="message-body">
                <p className="message-preview mb-0">{msg.message}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-2">
                <small className="text-muted">
                  <i className="bi bi-calendar-date me-1"></i>
                  {msg.date}
                </small>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleMarkAsRead(msg.id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteContact(msg.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
