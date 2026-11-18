/* =========================================
   NGAO AUTHENTICATION
   Handles:
   1. User Registration
   2. User Login
   3. Default Analyst Setup
   4. Analyst Login

   NOTE:
   This uses localStorage for an academic
   front-end prototype only.
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Create the authorised demo analyst
        initializeDefaultAnalyst();


        // Normal user authentication
        setupUserRegistration();

        setupUserLogin();


        // Analyst authentication
        setupAnalystLogin();

    }
);



/* =========================================
   DEFAULT SAFETY ANALYST
========================================= */

function initializeDefaultAnalyst() {

    const existingAnalysts =
        JSON.parse(
            localStorage.getItem(
                "ngaoAnalysts"
            )
        ) || [];


    /*
        If an analyst account already exists,
        do not create another one.
    */

    if (existingAnalysts.length > 0) {
        return;
    }


    const defaultAnalyst = {

        id: "ANL001",

        analystId: "ANL001",

        name: "Ngao Safety Analyst",

        email: "analyst@ngao.com",

        password: "Ngao123!",

        area: "Digital Safety",

        role: "analyst",

        createdAt:
            new Date()
                .toLocaleString()

    };


    localStorage.setItem(
        "ngaoAnalysts",

        JSON.stringify(
            [defaultAnalyst]
        )
    );

}



/* =========================================
   USER REGISTRATION
========================================= */

function setupUserRegistration() {

    const form =
        document.getElementById(
            "user-register-form"
        );


    /*
        If we are not on the registration
        page, stop this function.
    */

    if (!form) {
        return;
    }



    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* =========================================
               GET FORM VALUES
            ========================================= */

            const name =
                document
                    .getElementById(
                        "user-name"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "user-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document.getElementById(
                    "user-password"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "user-confirm-password"
                ).value;


            const agreement =
                document.getElementById(
                    "user-agreement"
                );


            const errorMessage =
                document.getElementById(
                    "user-register-error"
                );


            errorMessage.textContent = "";



            /* =========================================
               VALIDATE NAME
            ========================================= */

            if (name.length < 3) {

                errorMessage.textContent =
                    "Please enter your full name.";

                return;
            }



            /* =========================================
               VALIDATE EMAIL
            ========================================= */

            if (!email) {

                errorMessage.textContent =
                    "Please enter your email address.";

                return;
            }



            /* =========================================
               VALIDATE PASSWORD LENGTH
            ========================================= */

            if (password.length < 6) {

                errorMessage.textContent =
                    "Password must contain at least 6 characters.";

                return;
            }



            /* =========================================
               CHECK PASSWORD MATCH
            ========================================= */

            if (
                password !==
                confirmPassword
            ) {

                errorMessage.textContent =
                    "Passwords do not match.";

                return;
            }



            /* =========================================
               CHECK PROTOTYPE AGREEMENT
            ========================================= */

            if (
                agreement &&
                !agreement.checked
            ) {

                errorMessage.textContent =
                    "Please confirm that you understand this is an academic prototype.";

                return;
            }



            /* =========================================
               GET EXISTING USERS
            ========================================= */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "ngaoUsers"
                    )
                ) || [];



            /* =========================================
               CHECK DUPLICATE EMAIL
            ========================================= */

            const existingUser =
                users.find(
                    function (user) {

                        return (
                            user.email ===
                            email
                        );

                    }
                );


            if (existingUser) {

                errorMessage.textContent =
                    "An account with this email already exists.";

                return;
            }



            /* =========================================
               CREATE USER OBJECT
            ========================================= */

            const newUser = {

                id:
                    "USR-" +
                    Date.now(),

                name:
                    name,

                email:
                    email,

                password:
                    password,

                role:
                    "user",

                createdAt:
                    new Date()
                        .toLocaleString()

            };



            /* =========================================
               ADD USER TO ARRAY
            ========================================= */

            users.push(
                newUser
            );



            /* =========================================
               SAVE USERS
            ========================================= */

            localStorage.setItem(
                "ngaoUsers",

                JSON.stringify(
                    users
                )
            );



            /* =========================================
               REGISTRATION SUCCESS
            ========================================= */

            alert(
                "Account created successfully. You can now sign in."
            );


            window.location.href =
                "user-login.html";

        }
    );

}



/* =========================================
   USER LOGIN
========================================= */

function setupUserLogin() {

    const form =
        document.getElementById(
            "user-login-form"
        );


    /*
        Stop if we are not currently
        on the user login page.
    */

    if (!form) {
        return;
    }



    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* =========================================
               GET LOGIN DETAILS
            ========================================= */

            const email =
                document
                    .getElementById(
                        "user-login-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document.getElementById(
                    "user-login-password"
                ).value;


            const errorMessage =
                document.getElementById(
                    "user-login-error"
                );


            errorMessage.textContent = "";



            /* =========================================
               GET REGISTERED USERS
            ========================================= */

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "ngaoUsers"
                    )
                ) || [];



            /* =========================================
               FIND MATCHING USER
            ========================================= */

            const matchedUser =
                users.find(
                    function (user) {

                        return (
                            user.email ===
                                email &&

                            user.password ===
                                password
                        );

                    }
                );



            /* =========================================
               INVALID LOGIN
            ========================================= */

            if (!matchedUser) {

                errorMessage.textContent =
                    "Invalid email or password.";

                return;
            }



            /* =========================================
               CREATE USER SESSION
            ========================================= */

            sessionStorage.setItem(
                "ngaoCurrentUser",

                JSON.stringify(
                    matchedUser
                )
            );



            /*
                Remove any analyst session that
                may have existed in this browser.
            */

            sessionStorage.removeItem(
                "ngaoCurrentAnalyst"
            );



            /* =========================================
               GO TO USER DASHBOARD
            ========================================= */

            window.location.href =
                "user-dashboard.html";

        }
    );

}



/* =========================================
   ANALYST LOGIN
========================================= */

function setupAnalystLogin() {

    const form =
        document.getElementById(
            "analyst-login-form"
        );


    /*
        Stop if we are not currently
        on the analyst login page.
    */

    if (!form) {
        return;
    }



    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* =========================================
               GET LOGIN DETAILS
            ========================================= */

            const email =
                document
                    .getElementById(
                        "analyst-login-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document.getElementById(
                    "analyst-login-password"
                ).value;


            const errorMessage =
                document.getElementById(
                    "analyst-login-error"
                );


            errorMessage.textContent = "";



            /* =========================================
               GET AUTHORISED ANALYSTS
            ========================================= */

            const analysts =
                JSON.parse(
                    localStorage.getItem(
                        "ngaoAnalysts"
                    )
                ) || [];



            /* =========================================
               FIND ANALYST
            ========================================= */

            const matchedAnalyst =
                analysts.find(
                    function (analyst) {

                        return (
                            analyst.email ===
                                email &&

                            analyst.password ===
                                password &&

                            analyst.role ===
                                "analyst"
                        );

                    }
                );



            /* =========================================
               INVALID ANALYST LOGIN
            ========================================= */

            if (!matchedAnalyst) {

                errorMessage.textContent =
                    "Invalid analyst credentials.";

                return;
            }



            /* =========================================
               CREATE ANALYST SESSION
            ========================================= */

            sessionStorage.setItem(
                "ngaoCurrentAnalyst",

                JSON.stringify(
                    matchedAnalyst
                )
            );



            /*
                Ensure the same browser is not
                simultaneously treated as a
                normal logged-in user.
            */

            sessionStorage.removeItem(
                "ngaoCurrentUser"
            );



            /* =========================================
               OPEN ANALYST DASHBOARD
            ========================================= */

            window.location.href =
                "analyst-dashboard.html";

        }
    );

}