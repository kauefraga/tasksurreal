/*
    File write by shirorsrs (discord) for the first time.
*/

const ranks = new Map([
  [10, "Iniciante",],
  [50, "Avançado"],
  [100, "Surreal"]  
]);

const assets = new Map([
    ["Iniciante", "assets/golden.png"],
    ["Avançado", "assets/diamond.png"],
    ["Surreal", "assets/unreal.webp"]
])

function setInitialRank() {
    const rank = localStorage.getItem("rank");

    if (!rank){
        const initialRank = {
            "rank": "Nenhum",
            "points": 0
        }

        localStorage.setItem("rank", JSON.stringify(initialRank))
    }
}

function setInitialImage() {
    const rankAsset = document.getElementById("rank-image")
    const assetImage = localStorage.getItem("rankAsset")

    if (!assetImage) return;

    rankAsset.setAttribute("src", assetImage)
}

function setRankText (newRank = null) {
    const rankText = document.getElementById("rank-text");
    const rank = newRank ?? JSON.parse(localStorage.getItem("rank"))

    rankText.textContent = `Rank atual: ${rank.rank} - ${rank.points} pontos`
}

function updateRankImage(rank) {
    const rankAsset = document.getElementById("rank-image")
    const asset = assets.get(rank)
    if (!asset) return;

    rankAsset.setAttribute("src", asset)
    localStorage.setItem("rankAsset", asset)
}

function updateRank(points) {
    const lastUpdatedRank = JSON.parse(localStorage.getItem("rank"));
    
    const newPoints = lastUpdatedRank.points + points
    const newRank = ranks.get(newPoints) ?? lastUpdatedRank.rank

    const updatedRank = {
        rank: newRank,
        points: newPoints
    };

    localStorage.setItem("rank", JSON.stringify(updatedRank));
    updateRankImage(newRank)
    setRankText(updatedRank)

    return newRank
}

export { setInitialRank, updateRank, setRankText, setInitialImage };