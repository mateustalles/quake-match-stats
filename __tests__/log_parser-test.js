// __tests__/FileSummarizer-test.js
'use strict';

jest.mock('fs');

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    './logs/qgames.log': '20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT',
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('includes all files in the directory in the summary', () => {
    const logParser = require('../lib/log_parser');
    const fileSummary = logParser(['./logs/qgames.log']);
    console.log(fileSummary);
    // expect(fileSummary.length).toBe(2);
  });
});
