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
        fetch(`/blueprints/${currentAuthor}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const tableBody = document.getElementById("blueprints-table");
                tableBody.innerHTML = "";

                if (data.length > 0) {
                    data.forEach(blueprint => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${blueprint.name}</td>
                            <td>${blueprint.points.length}</td>
                            <td><button class="btn btn-primary" onclick="Module.openBlueprint('${blueprint.name}')">Open</button></td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else {
                    alert("No blueprints found for this author.");
                }
            })
            .catch(error => {
                console.error("Error fetching blueprints:", error);
                alert("Failed to load blueprints.");
            });
    }

    function openBlueprint(blueprintName) {
        fetch(`/blueprints/${currentAuthor}/${blueprintName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                drawBlueprint(data);
            })
            .catch(error => {
                console.error("Error opening blueprint:", error);
                alert("Failed to open blueprint.");
            });
    }

    function drawBlueprint(blueprint) {
        const canvas = document.getElementById("blueprint-canvas");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        
        if (blueprint.points.length > 0) {
            ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
            blueprint.points.forEach(point => {
                ctx.lineTo(point.x, point.y);
            });
        }

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    return {
        updateAuthor: updateAuthor,
        openBlueprint: openBlueprint
    };
})();
