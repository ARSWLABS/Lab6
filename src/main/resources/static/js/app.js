var Module = (function () {
    let currentAuthor = "";

    function updateAuthor() {
        const authorInput = document.getElementById("author").value;
        if (authorInput.trim() === "") {
            alert("Please enter an author name.");
            return;
        }
        currentAuthor = authorInput;
        fetchBlueprints();
    }

    function fetchBlueprints() {
        apimock.getBlueprintsByAuthor(currentAuthor, function (data) {
            const tableBody = document.getElementById("blueprints-table");
            tableBody.innerHTML = "";

            if (data.length > 0) {
                data.forEach(blueprint => {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${blueprint.name}</td>
                    <td>${blueprint.points.length}</td>
                    <td><button onclick="Module.openBlueprint('${blueprint.name}')">Open</button></td>`
                    tableBody.appendChild(row);
                });
            } else {
                alert("No blueprints found for this author.");
            }
        });
    }

    return {
        updateAuthor: updateAuthor
    };
})();
