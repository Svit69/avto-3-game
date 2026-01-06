import GameEngine from './engine/GameEngine.js';
import Hud from './ui/Hud.js';

const ready = () => {
  const board = document.querySelector('[data-role="board"]');
  const hud = new Hud(document.querySelector('[data-role="hud"]'));
  new GameEngine(board, hud).start();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
