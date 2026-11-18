document.addEventListener(
    "DOMContentLoaded",
    function () {

        const currentUser =
            getCurrentUser();


        if (!currentUser) {

            alert(
                "Please sign in to access your dashboard."
            );


            window.location.href =
                "user-login.html";


            return;
        }


        displayUserDetails(
            currentUser
        );


        loadUserReports(
            currentUser
        );


        loadSafetyTips();


        setupReportFilter(
            currentUser
        );


        setupLogout();

    }
);



/* =========================================
   GET CURRENT USER
========================================= */

function getCurrentUser() {

    return JSON.parse(
        sessionStorage.getItem(
            "ngaoCurrentUser"
        )
    );

}



/* =========================================
   USER DETAILS
========================================= */

function displayUserDetails(user) {

    const name =
        document.getElementById(
            "dashboard-user-name"
        );


    if (name) {

        name.textContent =
            user.name;

    }

}



/* =========================================
   GET USER REPORTS
========================================= */

function getUserReports(user) {

    const allReports =
        JSON.parse(
            localStorage.getItem(
                "ngaoReports"
            )
        ) || [];


    return allReports.filter(
        function (report) {

            return (
                report.userId ===
                user.id
            );

        }
    );

}



/* =========================================
   LOAD REPORTS
========================================= */

function loadUserReports(
    user,
    statusFilter = "all"
) {

    const reports =
        getUserReports(user);


    updateStatistics(
        reports
    );


    let filteredReports =
        reports;


    if (
        statusFilter !== "all"
    ) {

        filteredReports =
            reports.filter(
                function (report) {

                    return (
                        report.status ===
                        statusFilter
                    );

                }
            );

    }


    displayReports(
        filteredReports
    );

}



/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics(reports) {

    const total =
        reports.length;


    const pending =
        reports.filter(
            function (report) {

                return (
                    report.status ===
                    "Pending"
                );

            }
        ).length;


    const reviewed =
        reports.filter(
            function (report) {

                return (
                    report.status ===
                    "Reviewed" ||
                    report.status ===
                    "Suspicious"
                );

            }
        ).length;


    document.getElementById(
        "total-reports"
    ).textContent = total;


    document.getElementById(
        "pending-reports"
    ).textContent = pending;


    document.getElementById(
        "reviewed-reports"
    ).textContent = reviewed;

}



/* =========================================
   DISPLAY REPORTS
========================================= */

function displayReports(reports) {

    const reportList =
        document.getElementById(
            "user-report-list"
        );


    const emptyState =
        document.getElementById(
            "empty-reports"
        );


    reportList.innerHTML = "";


    if (reports.length === 0) {

        emptyState.style.display =
            "block";


        return;

    }


    emptyState.style.display =
        "none";


    reports
        .slice()
        .reverse()
        .forEach(
            function (report) {

                const reportItem =
                    createReportElement(
                        report
                    );


                reportList.appendChild(
                    reportItem
                );

            }
        );

}



/* =========================================
   CREATE REPORT ELEMENT
========================================= */

function createReportElement(report) {

    const article =
        document.createElement(
            "article"
        );


    article.classList.add(
        "report-item"
    );



    const top =
        document.createElement(
            "div"
        );


    top.classList.add(
        "report-top"
    );



    const info =
        document.createElement(
            "div"
        );



    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        report.title;



    const meta =
        document.createElement(
            "p"
        );


    meta.classList.add(
        "report-meta"
    );


    meta.textContent =
        `${report.category} · ${report.platform} · ${report.submittedAt}`;



    info.appendChild(
        title
    );


    info.appendChild(
        meta
    );



    const status =
        document.createElement(
            "span"
        );


    status.classList.add(
        "status-badge"
    );


    status.textContent =
        report.status;


    addStatusClass(
        status,
        report.status
    );



    top.appendChild(
        info
    );


    top.appendChild(
        status
    );



    const description =
        document.createElement(
            "p"
        );


    description.classList.add(
        "report-description"
    );


    description.textContent =
        report.description;



    article.appendChild(
        top
    );


    article.appendChild(
        description
    );


    return article;

}



/* =========================================
   STATUS STYLE
========================================= */

function addStatusClass(
    element,
    status
) {

    if (status === "Pending") {

        element.classList.add(
            "status-pending"
        );

    }


    if (status === "Reviewed") {

        element.classList.add(
            "status-reviewed"
        );

    }


    if (status === "Suspicious") {

        element.classList.add(
            "status-suspicious"
        );

    }

}



/* =========================================
   FILTER REPORTS
========================================= */

function setupReportFilter(user) {

    const filter =
        document.getElementById(
            "report-filter"
        );


    if (!filter) {
        return;
    }


    filter.addEventListener(
        "change",
        function () {

            loadUserReports(
                user,
                filter.value
            );

        }
    );

}



/* =========================================
   LOAD SAFETY TIPS
========================================= */

async function loadSafetyTips() {

    const container =
        document.getElementById(
            "safety-tip-list"
        );


    if (!container) {
        return;
    }


    try {

        const response =
            await fetch(
                "data/data.json"
            );


        const data =
            await response.json();


        data.safetyTips.forEach(
            function (tip) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.classList.add(
                    "safety-tip"
                );



                const heading =
                    document.createElement(
                        "h3"
                    );


                heading.textContent =
                    tip.title;



                const description =
                    document.createElement(
                        "p"
                    );


                description.textContent =
                    tip.description;



                card.appendChild(
                    heading
                );


                card.appendChild(
                    description
                );


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        container.textContent =
            "Unable to load safety tips.";


        console.error(error);

    }

}



/* =========================================
   LOGOUT
========================================= */

function setupLogout() {

    const logoutButton =
        document.getElementById(
            "logout-button"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "ngaoCurrentUser"
            );


            window.location.href =
                "user-login.html";

        }
    );

}