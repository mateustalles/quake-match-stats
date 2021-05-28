const fs = require('fs');

const LOGS = ['./logs/qgames.log', './logs/qgames2.log']

function parseLog(logs = LOGS) {
  const matchesData = [];

  logs.forEach((log, index) => {
    try {
      const data = fs.readFileSync(log, 'utf-8')
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
          !matchKills.players.includes(victim) && matchKills.players.push(victim);
          if(killer === 'world') {
            return victim in matchKills.kills ?
              matchKills.kills[victim] -= 1
              : matchKills.kills[victim] = -1;
          }
          !matchKills.players.includes(killer) && matchKills.players.push(killer);
          killer in matchKills.kills?
            matchKills.kills[killer] += 1
            : matchKills.kills[killer] = 1;
        }
      });
      const matchData = {
        [`game_${index + 1}`]: { ...matchKills }
      };
      console.log(matchData);
      matchesData.push(matchData);
    }
    catch (err) {
      throw err;
    }
  });

  return matchesData;
}

function killLoger(line) {
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

module.exports = parseLog;
