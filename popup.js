document.addEventListener("DOMContentLoaded", () => {
    const timeList = document.getElementById("timeList");
    const clearButton = document.getElementById("clearButton");

    function updateTimeList() {
        chrome.runtime.sendMessage({ action: "getTimeData" }, response => {
            timeList.innerHTML = "";
            if (response) {
                Object.entries(response).forEach(([site, time]) => {
                    const li = document.createElement("li");
                    li.textContent = `${site}: ${(time / 1000).toFixed(1)}s`;
                    timeList.appendChild(li);
                });
            }
        });
    }

    clearButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "clearTimeData" }, response => {
            if (response.success) {
                timeList.innerHTML = "";
            }
        });
    });

    updateTimeList();
});
