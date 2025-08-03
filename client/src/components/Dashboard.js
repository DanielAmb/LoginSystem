
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });

  // Get User Data
  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/user', { withCredentials: true })
      .then(response => {
        setUserData({
          username: response.data.username,
          email: response.data.email
        });
        fetchAppointments();
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  // Get Appointment Data
  const fetchAppointments = () => {
    axios.get('http://localhost:8080/api/appointments', { withCredentials: true })
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create Appointment
  const handleCreateAppointment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/appointments', newAppointment, { withCredentials: true })
    .then(response => {
      console.log("Appointment created:", response.data);
      setNewAppointment({
        title: '',
        description: '',
        startTime: '',
        endTime: ''
      });
      fetchAppointments(); // Refresh the list
    })
    .catch(error => {
      console.error("Error creating appointment:", error.response?.data);
    });
  };

  // Logout
  const handleLogout = () => {
    axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
      .then(() => navigate('/login'));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.message}>Welcome, {userData.username}!</p>
      <p style={styles.message}>Your email: {userData.email}</p>

      {/* Appointment Creation Form */}
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Create New Appointment</h2>
        <form onSubmit={handleCreateAppointment} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={newAppointment.title}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              value={newAppointment.description}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time:</label>
            <input
              type="datetime-local"
              name="startTime"
              value={newAppointment.startTime}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>End Time:</label>
            <input
              type="datetime-local"
              name="endTime"
              value={newAppointment.endTime}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>
            Create Appointment
          </button>
        </form>
      </div>

      {/* Appointments List */}
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Your Appointments</h2>
        {appointments.length > 0 ? (
          <ul style={styles.list}>
            {appointments.map(appointment => (
              <li key={appointment.id} style={styles.listItem}>
                <h3 style={styles.appointmentTitle}>{appointment.title}</h3>
                <p>{appointment.description}</p>
                <p>
                  <strong>Start:</strong> {new Date(appointment.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {new Date(appointment.endTime).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments yet.</p>
        )}
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1rem',
  },
  section: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    margin: '1.5rem 0',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#444',
    marginBottom: '1rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '80px',
    resize: 'vertical',
  },
  submitButton: {
    padding: '0.75rem',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  appointmentTitle: {
    marginTop: 0,
    color: '#007bff',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  }
};

export default Dashboard;
