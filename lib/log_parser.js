const fs = require('fs');

const LOGS = ['./logs/qgames.log', './logs/qgames2.log']

function parseLog() {
  const matchesData = [];
  LOGS.forEach((log, index) => fs.readFile(log, 'utf-8', (err, data) => {
    if (err) throw err;
    const matchKills = {
      total_kills: 0,
      players: [],
      kills: {},
      kills_by_means: {}
    };
    const raw = data.split(/\n/g);
    raw.forEach((line) => {
      if (line.includes('Kill')) {
        const { killer, victim, deathCause } = killLoger(line);
        matchKills.total_kills += 1;
        deathCause in matchKills.kills_by_means ?
          matchKills.kills_by_means[deathCause] += 1
          : matchKills.kills_by_means[deathCause] = 1;
        if(killer === 'world') {
          return victim in matchKills.kills ?
            matchKills.kills[victim] -= 1
            : matchKills.kills[victim] = -1;
        }
        !matchKills.players.includes(killer) && matchKills.players.push(killer);
        !matchKills.players.includes(victim) && matchKills.players.push(victim);
        killer in matchKills.kills?
          matchKills.kills[killer] += 1
          : matchKills.kills[killer] = 1;
      }
    });
    console.log({
      [`game_${index + 1}`]: { ...matchKills }
    })
    matchesData.push({
      [`game_${index + 1}`]: { ...matchKills }
    });
  }));
}

function killLoger(line) {
  {
    const killData = line.split(':')[3];
    const isWorldKill = killData.match('<world>');
    const killing = killData.split('killed');
    const killer = isWorldKill ? 'world' : killing[0].trim();
    const victim = killing[1].split('by')[0].trim();
    const deathCause = killing[1].split('by')[1].trim();
    return {
      killer,
      victim,
      deathCause,
    }
  }
}

parseLog();
