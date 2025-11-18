import { CustomHook } from "../Hooks/CustomHook"


export default function Initial() {
    const { isLoading, data, error, isError, isFetching, refetch, } = CustomHook();

    if (isLoading || isFetching) return <div>Loading...</div>
    if (isError) return <div style={{ color: 'red' }}>Error: {(error as Error)?.message}</div>

    const users = Array.isArray(data) ? data : []

    return (
        <div>
            <h1>Initial Component</h1>
            {/* <div>
                {users.map((user: any, idx: number) => (
                    <div key={user.id ?? user.name ?? idx}>{user.name}</div>
                ))}
            </div> */}
            <button onClick={() => refetch()}>
                Fetch
            </button>
            <div>
                {users.map((name) => {
                    return <div key={name}>{name}</div>})}
            </div>
        </div>
    )
}