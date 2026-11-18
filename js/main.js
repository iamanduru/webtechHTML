document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadThreats();

        setupScrollAnimations();

    }
);



/* =========================================
   LOAD THREATS FROM JSON
========================================= */

async function loadThreats() {

    const threatList =
        document.getElementById("threat-list");


    if (!threatList) {
        return;
    }


    try {

        const response =
            await fetch("data/data.json");


        const data =
            await response.json();


        data.threats.forEach(
            function (threat) {

                const card =
                    document.createElement("article");


                card.classList.add(
                    "threat-card"
                );


                card.innerHTML = `
                    <h3>
                        ${threat.name}
                    </h3>

                    <p>
                        ${threat.description}
                    </p>
                `;


                threatList.appendChild(card);

            }
        );


    } catch (error) {

        threatList.innerHTML =
            "<p>Unable to load safety information.</p>";


        console.error(error);

    }

}



/* =========================================
   SCROLL ANIMATION
========================================= */

function setupScrollAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}