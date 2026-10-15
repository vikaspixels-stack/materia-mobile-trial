document.addEventListener("DOMContentLoaded", function () {
    // Get the header div by its ID
    const headerDiv = document.getElementById('header');

    // Set the inner HTML of the header div
    headerDiv.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color:#eee;">
            <div class="container-fluid">
                <div class="d-flex align-items-center" style="text-align: left;">
                    <span onclick='fnHome()' style='cursor:pointer'>&nbsp;Materia Depot :</span>                
                    <span class="pagename"> </span><span style="color:green" id="spDepoName"> </span>
                </div>
                <div class="ml-auto">
                    <span class="pagename" id="spPageName" style="padding-right:5px"></span>
                </div>
            </div>
        </nav>
    `;

    // Call functions after the DOM is fully loaded
    fnSetDepoName();
    function fnHome() {
        window.location.href = "/mv/dashboard.html";
    }

    // Function to set the depo name
    function fnSetDepoName() {
        var depotName= localStorage.getItem("DepotName");
        document.getElementById("spDepoName").innerHTML = depotName;
    }


});
// Function to set the page name

function fnSetPageName(param) {
    document.getElementById("spPageName").innerHTML = param;
}
