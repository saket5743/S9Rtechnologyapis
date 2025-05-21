// import React from 'react'

// const GetAllDevelopers = () => {
//   return (
//     <div>GetAllDevelopers</div>
//   )
// }

// export default GetAllDevelopers


import { useState } from "react";

function GetAllDevelopers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearOfExperience: 0,
    title: "",
    skills: "",
    developer: "",
    country: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearOfExperience" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:7447/api/v1/developer/createdeveloper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to create developer");
      }

      setMessage("Developer created successfully!");
      setFormData({
        name: "",
        email: "",
        yearOfExperience: 0,
        title: "",
        skills: "",
        developer: "",
        country: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create Developer</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="yearOfExperience" placeholder="Experience (Years)" value={formData.yearOfExperience} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required />
        <input type="text" name="developer" placeholder="Developer Role" value={formData.developer} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <button type="submit" style={styles.button}>Create</button>
      </form>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  success: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '20px',
    color: 'red',
    fontWeight: 'bold',
  },
};

export default GetAllDevelopers;