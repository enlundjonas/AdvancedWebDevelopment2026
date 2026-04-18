import Header from '../components/header'
import Footer from '../components/footer'
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6">Registered Users</h1>

                {loading && (
                    <p className="text-center text-gray-600">Loading users…</p>
                )}

                {error && (
                    <p className="text-center text-red-600 mb-4">{error}</p>
                )}

                {!loading && !error && users.length === 0 && (
                    <p className="text-center text-gray-600">No users found.</p>
                )}

                <ul className="space-y-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                        >
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
