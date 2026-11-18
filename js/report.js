document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupDescriptionCounter();

        setupReportForm();

    }
);



/* =========================================
   DESCRIPTION CHARACTER COUNTER
========================================= */

function setupDescriptionCounter() {

    const description =
        document.getElementById(
            "report-description"
        );


    const counter =
        document.getElementById(
            "description-count"
        );


    if (!description || !counter) {
        return;
    }


    counter.textContent =
        description.value.length;


    description.addEventListener(
        "input",
        function () {

            counter.textContent =
                description.value.length;

        }
    );

}



/* =========================================
   REPORT FORM SETUP
========================================= */

function setupReportForm() {

    const form =
        document.getElementById(
            "scam-report-form"
        );


    if (!form) {
        return;
    }



    /* =========================================
       CHECK LOGGED-IN USER
    ========================================= */

    const currentUser =
        JSON.parse(
            sessionStorage.getItem(
                "ngaoCurrentUser"
            )
        );


    if (!currentUser) {

        alert(
            "Please sign in before submitting a report."
        );


        window.location.href =
            "user-login.html";


        return;
    }



    /* =========================================
       FORM SUBMISSION
    ========================================= */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* =========================================
               GET FORM VALUES
            ========================================= */

            const title =
                document
                    .getElementById(
                        "report-title"
                    )
                    .value
                    .trim();


            const category =
                document.getElementById(
                    "scam-category"
                ).value;


            const platform =
                document.getElementById(
                    "report-platform"
                ).value;


            const sender =
                document
                    .getElementById(
                        "sender"
                    )
                    .value
                    .trim();


            const suspiciousLink =
                document
                    .getElementById(
                        "suspicious-link"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "report-description"
                    )
                    .value
                    .trim();


            const errorMessage =
                document.getElementById(
                    "report-error"
                );


            const successMessage =
                document.getElementById(
                    "report-success"
                );



            /* =========================================
               CLEAR OLD MESSAGES
            ========================================= */

            errorMessage.textContent = "";

            successMessage.textContent = "";



            /* =========================================
               JAVASCRIPT VALIDATION
            ========================================= */


            // Validate report title

            if (title.length < 5) {

                errorMessage.textContent =
                    "Please enter a more descriptive report title.";

                return;
            }



            // Validate category

            if (!category) {

                errorMessage.textContent =
                    "Please select a scam category.";

                return;
            }



            // Validate platform

            if (!platform) {

                errorMessage.textContent =
                    "Please select where you received the suspicious content.";

                return;
            }



            // Validate description

            if (description.length < 20) {

                errorMessage.textContent =
                    "Please provide at least 20 characters describing what happened.";

                return;
            }



            // Description maximum validation

            if (description.length > 700) {

                errorMessage.textContent =
                    "Description cannot exceed 700 characters.";

                return;
            }



            /* =========================================
               GET SELECTED WARNING SIGNS
            ========================================= */

            const selectedWarnings =
                document.querySelectorAll(
                    'input[name="warningSigns"]:checked'
                );


            const warningSigns = [];


            selectedWarnings.forEach(
                function (checkbox) {

                    warningSigns.push(
                        checkbox.value
                    );

                }
            );



            /* =========================================
               CREATE REPORT OBJECT
            ========================================= */

            const report = {

                id:
                    "RPT-" +
                    Date.now(),

                userId:
                    currentUser.id,

                userName:
                    currentUser.name,

                userEmail:
                    currentUser.email,

                title:
                    title,

                category:
                    category,

                platform:
                    platform,

                sender:
                    sender,

                link:
                    suspiciousLink,

                description:
                    description,

                warningSigns:
                    warningSigns,

                status:
                    "Pending",

                submittedAt:
                    new Date()
                        .toLocaleString()

            };



            /* =========================================
               GET EXISTING REPORTS
            ========================================= */

            const existingReports =
                JSON.parse(
                    localStorage.getItem(
                        "ngaoReports"
                    )
                ) || [];



            /* =========================================
               ADD REPORT
            ========================================= */

            existingReports.push(
                report
            );



            /* =========================================
               SAVE REPORTS TO LOCAL STORAGE
            ========================================= */

            localStorage.setItem(
                "ngaoReports",

                JSON.stringify(
                    existingReports
                )
            );



            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            successMessage.textContent =
                "Report submitted successfully. Your report status is Pending.";



            /* =========================================
               RESET FORM
            ========================================= */

            form.reset();


            const counter =
                document.getElementById(
                    "description-count"
                );


            if (counter) {

                counter.textContent =
                    "0";

            }



            /* =========================================
               OPTIONAL REDIRECT
            ========================================= */

            setTimeout(
                function () {

                    window.location.href =
                        "user-dashboard.html";

                },

                1500
            );

        }
    );

}