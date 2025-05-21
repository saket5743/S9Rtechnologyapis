import { useState } from "react";

function CreateDeveloper() {
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
      <h1 style={styles.heading}>🚀 Create Developer</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input style={styles.input} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input style={styles.input} type="number" name="yearOfExperience" placeholder="Experience (Years)" value={formData.yearOfExperience} onChange={handleChange} required />
        <input style={styles.input} type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input style={styles.input} type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required />
        <input style={styles.input} type="text" name="developer" placeholder="Developer Role" value={formData.developer} onChange={handleChange} required />
        <input style={styles.input} type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <button type="submit" style={styles.button}>✨ Create Developer</button>
      </form>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '550px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(to bottom right, #f9f9f9, #e0f7fa)',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transition: '0.3s ease-in-out',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#00796b',
    fontSize: '26px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: '0.2s ease',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
  },
  button: {
    padding: '12px',
    background: 'linear-gradient(to right, #007bff, #00c6ff)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  success: {
    marginTop: '20px',
    color: '#2e7d32',
    fontWeight: 'bold',
    backgroundColor: '#e8f5e9',
    padding: '10px 15px',
    borderRadius: '8px',
  },
  error: {
    marginTop: '20px',
    color: '#c62828',
    fontWeight: 'bold',
    backgroundColor: '#ffebee',
    padding: '10px 15px',
    borderRadius: '8px',
  },
};

export default CreateDeveloper;
