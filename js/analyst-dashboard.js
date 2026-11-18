document.addEventListener(
    "DOMContentLoaded",
    function () {

        const analyst =
            getCurrentAnalyst();


        if (!analyst) {

            alert(
                "Please sign in as an analyst."
            );


            window.location.href =
                "analyst-login.html";


            return;
        }


        displayAnalystDetails(
            analyst
        );


        loadAnalystReports();


        setupAnalystFilter();


        setupAnalystLogout();

    }
);



/* =========================================
   CURRENT ANALYST
========================================= */

function getCurrentAnalyst() {

    return JSON.parse(
        sessionStorage.getItem(
            "ngaoCurrentAnalyst"
        )
    );

}



/* =========================================
   DISPLAY ANALYST
========================================= */

function displayAnalystDetails(analyst) {

    const name =
        document.getElementById(
            "analyst-name"
        );


    if (name) {

        name.textContent =
            analyst.name;

    }

}



/* =========================================
   GET REPORTS
========================================= */

function getAllReports() {

    return JSON.parse(
        localStorage.getItem(
            "ngaoReports"
        )
    ) || [];

}



/* =========================================
   LOAD REPORTS
========================================= */

function loadAnalystReports(
    statusFilter = "all"
) {

    const reports =
        getAllReports();


    updateAnalystStatistics(
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


    displayAnalystReports(
        filteredReports
    );

}



/* =========================================
   STATISTICS
========================================= */

function updateAnalystStatistics(
    reports
) {

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
                    "Reviewed"
                );

            }
        ).length;


    const suspicious =
        reports.filter(
            function (report) {

                return (
                    report.status ===
                    "Suspicious"
                );

            }
        ).length;


    document.getElementById(
        "analyst-total-reports"
    ).textContent = total;


    document.getElementById(
        "analyst-pending-reports"
    ).textContent = pending;


    document.getElementById(
        "analyst-reviewed-reports"
    ).textContent = reviewed;


    document.getElementById(
        "analyst-suspicious-reports"
    ).textContent = suspicious;

}



/* =========================================
   DISPLAY REPORTS
========================================= */

function displayAnalystReports(
    reports
) {

    const container =
        document.getElementById(
            "analyst-report-list"
        );


    const emptyState =
        document.getElementById(
            "analyst-empty-state"
        );


    container.innerHTML = "";


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

                const reportElement =
                    createAnalystReport(
                        report
                    );


                container.appendChild(
                    reportElement
                );

            }
        );

}



/* =========================================
   CREATE REPORT
========================================= */

function createAnalystReport(report) {

    const article =
        document.createElement(
            "article"
        );


    article.classList.add(
        "analyst-report"
    );



    /* HEADER */

    const header =
        document.createElement(
            "div"
        );


    header.classList.add(
        "analyst-report-header"
    );



    const headingWrapper =
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
        "analyst-report-meta"
    );


    meta.textContent =
        `${report.category} · ${report.platform} · ${report.submittedAt}`;



    headingWrapper.appendChild(
        title
    );


    headingWrapper.appendChild(
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


    addAnalystStatusClass(
        status,
        report.status
    );



    header.appendChild(
        headingWrapper
    );


    header.appendChild(
        status
    );



    /* USER */

    const user =
        document.createElement(
            "p"
        );


    user.classList.add(
        "report-user"
    );


    user.textContent =
        `Submitted by: ${report.userName || "Unknown User"}`;



    /* DESCRIPTION */

    const description =
        document.createElement(
            "p"
        );


    description.classList.add(
        "analyst-report-description"
    );


    description.textContent =
        report.description;



    /* ACTIONS */

    const actions =
        document.createElement(
            "div"
        );


    actions.classList.add(
        "report-actions"
    );



    const pendingButton =
        createStatusButton(
            "Mark Pending",
            "Pending",
            "pending-btn",
            report.id
        );



    const reviewedButton =
        createStatusButton(
            "Mark Reviewed",
            "Reviewed",
            "review-btn",
            report.id
        );



    const suspiciousButton =
        createStatusButton(
            "Mark Suspicious",
            "Suspicious",
            "suspicious-btn",
            report.id
        );



    actions.appendChild(
        pendingButton
    );


    actions.appendChild(
        reviewedButton
    );


    actions.appendChild(
        suspiciousButton
    );



    article.appendChild(
        header
    );


    article.appendChild(
        user
    );


    article.appendChild(
        description
    );


    article.appendChild(
        actions
    );


    return article;

}



/* =========================================
   STATUS BUTTON
========================================= */

function createStatusButton(
    label,
    status,
    cssClass,
    reportId
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.textContent =
        label;


    button.classList.add(
        "report-action-btn",
        cssClass
    );


    button.addEventListener(
        "click",
        function () {

            updateReportStatus(
                reportId,
                status
            );

        }
    );


    return button;

}



/* =========================================
   UPDATE REPORT STATUS
========================================= */

function updateReportStatus(
    reportId,
    newStatus
) {

    const reports =
        getAllReports();


    const report =
        reports.find(
            function (item) {

                return (
                    item.id ===
                    reportId
                );

            }
        );


    if (!report) {

        alert(
            "Report could not be found."
        );


        return;
    }


    report.status =
        newStatus;


    report.reviewedAt =
        new Date()
            .toLocaleString();


    const analyst =
        getCurrentAnalyst();


    report.reviewedBy =
        analyst.name;


    localStorage.setItem(
        "ngaoReports",

        JSON.stringify(
            reports
        )
    );


    const filter =
        document.getElementById(
            "analyst-report-filter"
        );


    loadAnalystReports(
        filter.value
    );

}



/* =========================================
   STATUS BADGE
========================================= */

function addAnalystStatusClass(
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
   FILTER
========================================= */

function setupAnalystFilter() {

    const filter =
        document.getElementById(
            "analyst-report-filter"
        );


    if (!filter) {
        return;
    }


    filter.addEventListener(
        "change",
        function () {

            loadAnalystReports(
                filter.value
            );

        }
    );

}



/* =========================================
   LOGOUT
========================================= */

function setupAnalystLogout() {

    const button =
        document.getElementById(
            "analyst-logout-button"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "ngaoCurrentAnalyst"
            );


            window.location.href =
                "analyst-login.html";

        }
    );

}