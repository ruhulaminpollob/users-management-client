import { useEffect } from "react"
import { useState } from "react"
import "./app.css"


function App() {

  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleSubmit = event => {
    event.preventDefault()
    const form=event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email}
    console.log(user);
    fetch("http://localhost:5000/users", {
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);

      const newUsers=[...users, data]
      setUsers(newUsers)
      form.reset()
    })
  }



  return (
    <>
      <div>
        <h1>users management users length: {users.length}</h1>
        <form onSubmit={handleSubmit} action="">
          <input type="text" name="name" id="name" /><br />
          <input type="email" name="email" id="email" /><br />
          <input type="submit" value="submit" />
        </form>
        <div>
          {
            users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
          }
        </div>
      </div>
    </>
  )
}

export default App
