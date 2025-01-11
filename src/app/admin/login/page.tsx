"use client";

import LoginForm from "@/components/forms/LoginForm";

export default function AdminLogin() {
    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Area riservata</h1>
                        <LoginForm />
                    </div>
                </section>
            </main>
        </div>
    );
}
