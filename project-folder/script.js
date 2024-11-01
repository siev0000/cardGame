// カードデータ
const cards = [
    { name: 'Warrior', cost: 5, hp: 15, defense: 10, attack: 20, magic: 5, description: '強力な戦士', rarity: 'bronze' },
    { name: 'Mage', cost: 7, hp: 10, defense: 8, attack: 15, magic: 25, description: '強力な魔法使い', rarity: 'gold' },
    { name: 'Knight', cost: 6, hp: 20, defense: 15, attack: 18, magic: 5, description: '忠実な騎士', rarity: 'silver' },
    { name: 'Dragon', cost: 10, hp: 30, defense: 25, attack: 40, magic: 10, description: '恐ろしい11111111111111111111111111111111111111111111111111111111111竜', rarity: 'black' },
    { name: 'Paladin', cost: 8, hp: 18, defense: 20, attack: 22, magic: 10, description: '聖なる守護者', rarity: 'platinum' }
];

let draggedCard = null;

// カード作成関数
function createCard(cardData) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', `card-${cardData.rarity}`);
    cardElement.setAttribute('draggable', true);
    cardElement.innerHTML = `
        <div class="card-cost">${cardData.cost}</div>
        <div class="card-name">${cardData.name}</div>
        <img src="path/to/image.png" class="card-image" alt="Card Image">
        <div class="card-description">${cardData.description}</div>
        <div class="card-stats">
            <div class="card-hp card-stat-icon">${cardData.hp}</div>
            <div class="card-defense card-stat-icon">${cardData.defense}</div>
            <div class="card-attack card-stat-icon">${cardData.attack}</div>
            <div class="card-magic card-stat-icon">${cardData.magic}</div>
        </div>
    `;
    // .card-hp
    cardElement.dataset.description = cardData.description;

    // カードの説明表示
    cardElement.addEventListener('click', () => {
        const popupDescription = document.getElementById('popup-description');
        popupDescription.textContent = cardData.description;
    });

    // ドラッグ開始
    cardElement.addEventListener('dragstart', (e) => {
        draggedCard = cardElement;
        e.dataTransfer.effectAllowed = "move";
    });

    return cardElement;
}


// デッキからカードを引く（手札に追加）
function drawCard() {
    const deck = document.getElementById('deck');
    const hand = document.getElementById('hand');
    if (deck.children.length > 0) {
        hand.appendChild(deck.children[0]);
    } else {
        alert("デッキにカードがありません。");
    }
}

// エリアの切り替え表示
function showArea(areaId) {
    ['deck', 'hand', 'graveyard'].forEach(id => {
        document.getElementById(id).style.display = id === areaId ? 'block' : 'none';
    });
}
// エリアの切り替え表示とタイトル変更
function showArea(areaId) {
    ['deck', 'hand', 'graveyard'].forEach(id => {
        document.getElementById(id).style.display = id === areaId ? 'block' : 'none';
    });

    // エリアタイトルを更新
    const areaTitle = document.getElementById('area-title');
    if (areaId === 'deck') {
        areaTitle.textContent = 'デッキ';
    } else if (areaId === 'hand') {
        areaTitle.textContent = '手札';
    } else if (areaId === 'graveyard') {
        areaTitle.textContent = '墓地';
    }
}

// ドロップエリアの設定（場、デッキ、手札、墓地）
['field', 'drop-to-field', 'drop-to-deck', 'drop-to-hand', 'drop-to-graveyard'].forEach(areaId => {
    const area = document.getElementById(areaId);

    area.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    area.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedCard) {
            const targetId = areaId.replace('drop-to-', '') || 'field';
            const targetArea = document.getElementById(targetId);
            targetArea.appendChild(draggedCard);
            draggedCard = null;
        }
    });
});

// ゲームの初期化
function initializeGame() {
    const deck = document.getElementById('deck');
    cards.forEach(cardData => {
        const cardElement = createCard(cardData);
        deck.appendChild(cardElement);
    });

    // 初期表示を「手札」に設定
    showArea('hand');
}
document.addEventListener('DOMContentLoaded', () => {
    const screenWidth = window.innerWidth;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.style.width = `${screenWidth / 7}px`;
        card.style.height = `${screenWidth * 0.25}px`;
    });
});

initializeGame();
