function fnHome() {
    window.location.href = 'dashboard.html';
}

function UserTabClik(tabName) {
    switch (tabName) {
        case 'Call':
            // Future implementation
            break;
        case 'TaskList':
            window.location.href = 'UserTask.html';
            break;
        case 'Depot':
            toggleMateriaCSS(false); // Remove           
            openDepotSelection();
            break;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Dynamically add Font Awesome
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(link);

    const footerDiv = document.getElementById('footer');
    const userId = localStorage.getItem("userID"); // Make sure userID is set in localStorage

    function renderFooter(taskCount) {
        footerDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-around; position: fixed; bottom: 0; left: 0; right: 0; background-color: #21338E; color: #fff; border-top: solid 1px #999; z-index: 1000; padding: 10px 5px 4px 10px; height: 50px; font-size: 12px; width: 100%;">
                <span style="margin: 5px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center;" onclick='fnHome()'>
                    <i class="fas fa-home" style="font-size: 20px;"></i>
                    <div>Home</div>
                </span>
                <span style="margin: 5px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center;" onclick="UserTabClik('Call');">
                    <i class="fas fa-phone" style="font-size: 20px;"></i>
                    <div>Call</div>
                </span>
                <span style="margin: 5px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center;" onclick="UserTabClik('TaskList');">
                    <i class="fas fa-list" style="font-size: 20px;"></i>
                    <div>Task<b><font color='#00FFFF'> (${taskCount})</font></b></div>
                </span>
                <span style="margin: 5px 12px; cursor: pointer; display: flex; flex-direction: column; align-items: center;" onclick="UserTabClik('Depot');">
                    <i class="fas fa-warehouse" style="font-size: 20px;"></i>
                    <div>Depot</div>
                </span>
            </div>
        `;
    }

    // Default if no userID
    if (!userId) {
        renderFooter(0);
        return;
    }

    // Fetch task count from API
    fetch(`/api/UserTask/Count?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            const count = data?.count ?? 0;
            renderFooter(count);
        })
        .catch(err => {
            console.error("Task count fetch failed:", err);
            renderFooter(0);
        });
});


function toggleMateriaCSS(enable) {
    var existing = document.querySelector('link[href="css/materia.css?v=1.66"]');
    if (enable && !existing) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/materia.css?v=1.66';
        document.head.appendChild(link);
    } else if (!enable && existing) {
        existing.remove();
    }
}

