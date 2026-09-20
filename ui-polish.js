const titleEl = document.querySelector('.title');
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

const titleObserver = new MutationObserver(() => {
    const content = titleEl.textContent || '';
    if (content.includes('winner') && !titleEl.classList.contains('draw-state')) {
        titleEl.classList.add('win-state');
        gameBoard.classList.add('game-over');
    }
});

titleObserver.observe(titleEl, { childList: true, subtree: true, characterData: true });

const squares = document.querySelectorAll('.square');
squares.forEach(sq => {
    const observer = new MutationObserver(() => {
        if (sq.style.background === 'rgb(173, 173, 170)') {
            sq.classList.add('winner-cell');
        }
    });
    observer.observe(sq, { attributes: true, attributeFilter: ['style'] });
});

restartBtn.addEventListener('click', () => {
    resetGame();
});