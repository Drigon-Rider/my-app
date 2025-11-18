import { useAddUser } from "../../Hooks/UserHook";
import { useState } from "react";

const AddUsers = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {mutate: addUser} = useAddUser();
    return(
        <div>
            <h1>Add User</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={() => addUser({username, email, password} as unknown as void)}>Add User</button>
        </div>
    )
}
export default AddUsers;