import GameEngine from './engine/GameEngine.js';
import Hud from './ui/Hud.js';
import LevelInspector from './engine/LevelInspector.js';

const loadLevels = async () => {
  const res = await fetch('./config/levels.json');
  const data = await res.json();
  return data.levels || [];
};

const reportIssues = (issues) => {
  issues.forEach(({ level, report }) => {
    console.warn(`[Level ${level.id}] ${report.message} -> ${report.fix}`);
  });
};

const ready = async () => {
  const board = document.querySelector('[data-role="board"]');
  const hud = new Hud(document.querySelector('[data-role="hud"]'));
  const levels = await loadLevels();
  const inspector = new LevelInspector(6, 3);
  const issues = inspector.inspect(levels);
  if (issues.length) reportIssues(issues);
  new GameEngine(board, hud, levels).start();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ready());
} else {
  ready();
}
