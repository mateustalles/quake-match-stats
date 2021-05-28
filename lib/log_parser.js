const fs = require('fs');

function parseLog() {
  let jsonLog = [];
  fs.readFile('./logs/qgames.log', 'utf-8', (err, data) => {
    if (err) throw err;
    const raw = data.split(/\n/g);
    raw.forEach((line) => detectKills(line, jsonLog));
  });
}

function detectKills(line, file) {
  if (line.includes('Kill')) {
    const killData = line.split(':')[3];
    const isWorldKill = killData.match('<world>');
    if(isWorldKill) return console.log('world kill')
    const killing = killData.split('killed')
    const killer = killing[0].trim();
    const victim = killing[1].split('by')[0].trim();
    const cause = killing[1].split('by')[1].trim();
  }
}

parseLog();
