import { useState } from "react";
import { useAddPerson,CustomHook } from "../Hooks/CustomHook";

const AddNonUsers = () => {
    const {data} = CustomHook();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {mutate} = useAddPerson();
    const handelClick = () => {
        const info = {name, email};
        mutate(info);
    }
    return (
        <>
            <div>AddNonUsers Component</div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handelClick}>Add Non-User</button>
            <div>
                {data?.map((name: string) => {
                    return <div key={name}>{name}</div>
                })}
            </div>
        </>
    );
}
export default AddNonUsers;