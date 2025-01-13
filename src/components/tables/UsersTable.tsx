import styles from "./Table.module.css";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
};

type UsersTableProps = {
    users: User[];
};

export default function UsersTable({ users }: UsersTableProps) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Data Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "Sì" : "No"}</td>
                            <td>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
