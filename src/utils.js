export function randomNumber(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export const getRandomColor = () => {
  return `#${Math.round(0xffffff * Math.random()).toString(16)}`;
}

export const importAll = (_context) => {
  let files = {};
  _context.keys().map((item, index) => { files[item.replace('./', '')] = _context(item); });
  files = Object.values(files).map(file => file.replace('http://localhost:3000/', ''))
  return files;
}