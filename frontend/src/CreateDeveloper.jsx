// import React from 'react'

// const CreateDeveloper = () => {
//   return (
//     <div>CreateDeveloper</div>
//   )
// }

// export default CreateDeveloper

import { useEffect, useState } from "react";

function CreateDeveloper() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:7447/api/v1/developer/getAlldevelopers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch developers");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div style={styles.message}>Loading developers...</div>;
  }

  if (error) {
    return <div style={styles.message}>Error: {error}</div>;
  }

  if (!users.length) {
    return <div style={styles.message}>No developers found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Developer Profiles</h1>
      {users.map((user) => (
        <div key={user._id} style={styles.card}>
          <h2 style={styles.name}>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Title:</strong> {user.title}</p>
          <p><strong>Experience:</strong> {user.yearOfExperience} {user.yearOfExperience > 1 ? 'years' : 'year'}</p>
          <p><strong>Role:</strong> {user.developer}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>Skills:</strong></p>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  name: {
    marginBottom: '10px',
    color: '#333',
  },
  message: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#666',
  },
};

export default CreateDeveloper;