document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const size = 3;
    const totalTiles = size * size;
    const emptyTile = totalTiles;

    let tiles = Array.from({ length: totalTiles }, (_, index) => index + 1);

    function shuffleTiles() {
        for (let i = totalTiles - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }

    function createPuzzle() {
        shuffleTiles();
        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = tiles[i] === emptyTile ? "" : tiles[i];
            tile.addEventListener("click", () => moveTile(i));
            puzzleContainer.appendChild(tile);
        }
    }

    function moveTile(index) {
        const emptyIndex = tiles.indexOf(emptyTile);
        const adjacentIndices = getAdjacentIndices(emptyIndex);

        if (adjacentIndices.includes(index)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            updatePuzzle();
        }

        if (isPuzzleSolved()) {
            setTimeout(() => alert("Congratulations! Puzzle solved!"), 100);
        }
    }

    function getAdjacentIndices(index) {
        const row = Math.floor(index / size);
        const col = index % size;

        const adjacentIndices = [];

        if (row > 0) adjacentIndices.push(index - size);
        if (row < size - 1) adjacentIndices.push(index + size);
        if (col > 0) adjacentIndices.push(index - 1);
        if (col < size - 1) adjacentIndices.push(index + 1);

        return adjacentIndices;
    }

    function updatePuzzle() {
        const puzzleTiles = document.querySelectorAll(".tile");
        puzzleTiles.forEach((tile, index) => {
            tile.textContent = tiles[index] === emptyTile ? "" : tiles[index];
        });
    }

    function isPuzzleSolved() {
        return tiles.every((tile, index) => tile === index + 1);
    }

    createPuzzle();
});
