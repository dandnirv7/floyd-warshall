const floydWarshall = (graph) => {
  const dist = [];
  const numVertices = graph.length;

  for (let i = 0; i < numVertices; i++) {
    dist[i] = [];
    for (let j = 0; j < numVertices; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (graph[i][j] === -1) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }

  for (let k = 0; k < numVertices; k++) {
    for (let i = 0; i < numVertices; i++) {
      for (let j = 0; j < numVertices; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
};

const getGraphFromUser = () => {
  const numVertices = parseInt(prompt("Masukkan jumlah simpul dalam graf:"));

  if (isNaN(numVertices) || numVertices <= 0) {
    alert("Jumlah simpul harus berupa angka positif.");
    return null;
  }

  const graph = [];

  for (let i = 0; i < numVertices; i++) {
    graph[i] = [];
    for (let j = 0; j < numVertices; j++) {
      const value = prompt(
        `Masukkan jarak dari simpul ${i + 1} ke simpul ${
          j + 1
        } (-1 jika tidak ada edge / infinity):`
      );
      if (value === null) {
        alert("Input dibatalkan.");
        return null;
      }
      const floatValue = parseFloat(value);
      graph[i][j] = isNaN(floatValue) ? 0 : floatValue;
    }
  }

  return graph;
};

const displayResult = (matrix) => {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML =
    "<h3>Jarak terpendek antara setiap pasang simpul:</h3>";
  const table = document.createElement("table");
  table.border = "1";

  const headerRow = document.createElement("tr");
  const emptyHeaderCell = document.createElement("th");
  headerRow.appendChild(emptyHeaderCell);
  for (let i = 0; i < matrix.length; i++) {
    const headerCell = document.createElement("th");
    headerCell.textContent = i + 1;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("tr");
    const headerCell = document.createElement("th");
    headerCell.textContent = i + 1;
    row.appendChild(headerCell);
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement("td");
      cell.textContent = matrix[i][j] === Infinity ? "∞" : matrix[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  resultContainer.appendChild(table);
};

const runFloydWarshall = () => {
  const graph = getGraphFromUser();
  if (graph === null) {
    return;
  }
  const result = floydWarshall(graph);
  displayResult(result);
};
