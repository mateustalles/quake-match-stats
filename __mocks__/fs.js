'use strict';

const path = require('path');
const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const path in newMockFiles) {
    if (!mockFiles[path]) {
      mockFiles[path] = '';
    }
    mockFiles[path] = newMockFiles[path];
  }
}

function readFileSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
