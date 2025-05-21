import { useEffect, useState } from "react";

function GetAllDevelopers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('http://localhost:7447/api/v1/developer/getAlldevelopers');
        if (!response.ok) {
          throw new Error('Failed to fetch developers');
        }
        const data = await response.json();
        setUsers(data.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (isLoading) {
    return <div style={styles.message}>🚀 Loading developers...</div>;
  }

  if (error) {
    return <div style={{ ...styles.message, color: "#e63946" }}>❌ Error: {error}</div>;
  }

  if (!users.length) {
    return <div style={styles.message}>👨‍💻 No developers found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>💡 Developer Profiles</h1>
      <div style={styles.grid}>
        {users.map((user) => (
          <div key={user._id} style={styles.card}>
            <h2 style={styles.name}>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Title:</strong> {user.title}</p>
            <p><strong>Experience:</strong> {user.yearOfExperience} {user.yearOfExperience > 1 ? 'years' : 'year'}</p>
            <p><strong>Role:</strong> {user.developer}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <div>
              <p style={styles.skillsTitle}>Skills:</p>
              <div style={styles.skillTags}>
                {user.skills.map((skill, index) => (
                  <span key={index} style={styles.skillItem}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: '40px',
  },
  message: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#555',
    marginTop: '50px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
  },
  card: {
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    borderRadius: '16px',
    padding: '25px',
    border: '1px solid #ccc',
    boxShadow: '0 6px 14px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    hover: {
      transform: 'scale(1.05)',
    }
  },
  name: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
  },
  skillsTitle: {
    marginTop: '15px',
    fontWeight: '600',
    color: '#333',
    fontSize: '16px',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '8px',
  },
  skillItem: {
    backgroundColor: '#00bcd4',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  },
};

export default GetAllDevelopers;
