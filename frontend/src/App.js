import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:7447/api/v1/developer/getAlldevelopers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        console.log(users, "dataatat")
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
       {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <p>{user.title}</p>
          <p>{user.developer}</p>
          <p>{user.country}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
