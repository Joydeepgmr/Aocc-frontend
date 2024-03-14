let user = {
    "admin@test.com": {
        password: "Admin@123",
        role: "admin"
    },
    "planner@test.com": {
        password: "Planner@123",
        role: "planner"
    },
    "vendor@test.com": {
        password: "Vendor@123",
        role: "vendor"
    },
}

export const checkAuth = (auth) => {
    const token = "mu_dummy_auth_token";
    const email = auth.email.toLowerCase();
    const password = auth.password;

    if (Object.keys(user).includes(email)) {
        if (user[email].password === password) {
            return {
                token,
                user: {
                    email,
                    password: user[email].password,
                    role: user[email].role
                },
            }
        } else {
            alert("Wrong Password");
        }
    } else {
        alert("User not found");
    }
}