// ---------------- Depot Selection Logic ----------------
function openDepotSelection() {
    const userId = localStorage.getItem("userID");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
        alert("Please login again.");
        window.location.href = "login.html";
        return;
    }

    // Read depot list from localStorage
    const depotList = JSON.parse(localStorage.getItem("DepotList"));

    if (depotList && depotList.length > 0) {
        depotList.length === 1 ? saveDepotAndRedirect(depotList[0]) : showDepotSelection(depotList);
    } else {
        alert("No depot access found.");
    }
}

function showDepotSelection(depotList) {
    // Create popup container if not exists
    if (!document.getElementById("kwDepotSelection")) {
        const depotDiv = document.createElement("div");
        depotDiv.id = "kwDepotSelection";
        depotDiv.style.display = "none";
        depotDiv.innerHTML = `<input id="depotSelector" style="width:100%;" />`;
        document.body.appendChild(depotDiv);
    }

    const $depotSelector = $("#depotSelector");
    const savedDepotID = localStorage.getItem("DepotID"); // previously selected depot ID

    // Get device height for dynamic dropdown
    const deviceHeight = $(window).height();
    const dropdownHeight = deviceHeight * 0.85;

    // Initialize Kendo MultiColumnComboBox
    const combo = $depotSelector.kendoMultiColumnComboBox({
        dataSource: depotList,
        dataTextField: "DepotName",
        dataValueField: "DepotID",
        height: dropdownHeight,
        filter: "contains",
        columns: [
            { field: "DepotName" },
            { field: "State" }
        ],
        placeholder: "Select Depot",
        filtering: function (e) {
            if (e.filter) {
                e.sender.dataSource.filter({
                    logic: "or",
                    filters: [
                        { field: "DepotName", operator: "contains", value: e.filter.value },
                        { field: "State", operator: "contains", value: e.filter.value }
                    ]
                });
                e.preventDefault();
            }
        },
        change: function () {
            const selected = this.dataItem();
            if (selected) {
                $("#kwDepotSelection").data("kendoWindow").close();
                saveDepotAndRedirect(selected);
            }
        },
        select: function (e) {
           
        },
        open: function () {
            // Hide the grid header row inside dropdown
            this.list.find(".k-table-thead").hide();
        }
    }).data("kendoMultiColumnComboBox");

    combo.wrapper.css({ "width": "99%" });
    combo.value("");
    combo.text("");
    //  combo.wrapper.find(".k-clear-value").hide();
    if (combo.wrapper.find(".k-clear-value").length > 1) {
        combo.wrapper.find(".k-clear-value").not(":first").hide();
    }

    // Preselect saved depot if exists
    if (savedDepotID) {
        combo.value(savedDepotID);
    }

    // Initialize Kendo Window
    const kendoWindow = $("#kwDepotSelection").kendoWindow({
        width: "97%",
        title: "Select Depot", // header visible for closing
        modal: true,
        visible: false,
        actions: ["Close"] // show close button in header
    }).data("kendoWindow");

    // Open ComboBox after window activates
    kendoWindow.bind("activate", function () {
        combo.open(); // auto-open dropdown
    });

    // **Handle close event (cross button click or Esc key)**
    kendoWindow.bind("close", function () {
        toggleMateriaCSS(true); // Re-add materia.css when closed
    });

    // Open window at top
    kendoWindow.center().open();

    const wnd = $("#kwDepotSelection").closest(".k-window");
    wnd.css({ "top": "0px", "margin-top": "0" });
}

function saveDepotAndRedirect(depot) {
    localStorage.setItem("DepotID", depot.DepotID);
    localStorage.setItem("DepotName", depot.DepotName);
    localStorage.setItem("SAPDepotID", depot.SAPDepotID);
    localStorage.setItem("DepotHandlingType", depot.DepotHandlingType);

    if (depot.DepotLongitude && depot.DepotLatitude) {
        localStorage.setItem("DepotLongitude", depot.DepotLongitude);
        localStorage.setItem("DepotLatitude", depot.DepotLatitude);
    } else {
        localStorage.removeItem("DepotLongitude");
        localStorage.removeItem("DepotLatitude");
    }

    // Redirect back to current page
    window.location.href = window.location.pathname;
}

