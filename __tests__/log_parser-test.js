'use strict';

jest.mock('fs');

describe('example1', () => {
  const MOCK_FILE_INFO = {
    './logs/qgames.log': '20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('correctly parses data log', () => {
    const logParser = require('../lib/log_parser');
    const fileSummary = logParser(['./logs/qgames.log']);
    expect(fileSummary).toStrictEqual([{ game_1:
      { total_kills: 1,
        players: ['Isgalamido'],
        kills: {
          Isgalamido: -1,
        },
        kills_by_means: {
          MOD_TRIGGER_HURT: 1,
        } } }])
  });
});

describe('example2', () => {
  const MOCK_FILE_INFO = {
    './logs/qgames.log': `13:52 Kill: 6 7 6: Zeh killed Mal by MOD_ROCKET
13:52 Item: 2 weapon_rocketlauncher
13:55 Kill: 3 4 6: Oootsimo killed Dono da Bola by MOD_ROCKET
13:55 Exit: Fraglimit hit.
13:55 score: 20  ping: 8  client: 3 Oootsimo
13:55 score: 19  ping: 14  client: 6 Zeh
13:55 score: 17  ping: 1  client: 2 Isgalamido
13:55 score: 13  ping: 0  client: 5 Assasinu Credi
13:55 score: 10  ping: 8  client: 4 Dono da Bola
13:55 score: 6  ping: 19  client: 7 Mal`,
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('correctly parses data log', () => {
    const logParser = require('../lib/log_parser');
    const fileSummary = logParser(['./logs/qgames.log']);
    expect(fileSummary).toStrictEqual([{ game_1:
      { total_kills: 2,
        players: ['Mal', 'Zeh', 'Dono da Bola', 'Oootsimo'],
        kills: {
          Zeh: 1,
          Oootsimo: 1
        },
        kills_by_means: {
          MOD_ROCKET: 2,
        } } }])
  });
});

describe('example3', () => {
  const MOCK_FILE_INFO = {
    './logs/qgames.log': `13:52 Kill: 6 7 6: Zeh killed Mal by MOD_ROCKET
13:52 Item: 2 weapon_rocketlauncher
13:55 Kill: 3 4 6: Oootsimo killed Dono da Bola by MOD_ROCKET
13:55 Exit: Fraglimit hit.
13:55 score: 20  ping: 8  client: 3 Oootsimo
13:55 score: 19  ping: 14  client: 6 Zeh
13:55 score: 17  ping: 1  client: 2 Isgalamido
13:55 score: 13  ping: 0  client: 5 Assasinu Credi
13:55 score: 10  ping: 8  client: 4 Dono da Bola
13:55 score: 6  ping: 19  client: 7 Mal`,
  './logs/qgames2.log': '20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('correctly parses data log', () => {
    const logParser = require('../lib/log_parser');
    const fileSummary = logParser(['./logs/qgames.log', './logs/qgames2.log']);
    expect(fileSummary).toStrictEqual([{ game_1:
      { total_kills: 2,
        players: ['Mal', 'Zeh', 'Dono da Bola', 'Oootsimo'],
        kills: {
          Zeh: 1,
          Oootsimo: 1
        },
        kills_by_means: {
          MOD_ROCKET: 2,
        } } },
        { game_2:
      { total_kills: 1,
        players: ['Isgalamido'],
        kills: {
          Isgalamido: -1,
        },
        kills_by_means: {
          MOD_TRIGGER_HURT: 1,
        } } }])
  });
});
