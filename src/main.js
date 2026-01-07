import GameEngine from './engine/GameEngine.js';
import Hud from './ui/Hud.js';

const loadLevels = async () => {
  const res = await fetch('./config/levels.json');
  const data = await res.json();
  return data.levels || [];
};

const ready = async () => {
  const board = document.querySelector('[data-role="board"]');
  const hud = new Hud(document.querySelector('[data-role="hud"]'));
  const levels = await loadLevels();
  new GameEngine(board, hud, levels).start();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ready());
} else {
  ready();
}
