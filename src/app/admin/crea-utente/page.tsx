"use client";

import AddUserForm from "@/components/forms/AddUserForm";

// IMPORTANT: After creating first user for me make this form available only for admins 🔴

export default function CreaUtente() {
    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Crea nuovo utente</h1>
                        <AddUserForm />
                    </div>
                </section>
            </main>
        </div>
    );
}
