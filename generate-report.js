
const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, 'test-results', 'json');
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

const jsonResults = jsonFiles.map(file => ({
  jsonFile: path.join(jsonDir, file),
}));

reporter.generate({
  jsonDir,
  reportPath: './test-results/html-report',
  reportName: 'Consolidated Test Results',
  displayDuration: true,
  displayReportTime: true,
  metadata: {
    browser: { name: 'chrome', version: '120' },
    device: 'Local Test Machine',
    platform: { name: 'Windows', version: '11' },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'My Test Project' },
      { label: 'Generated on', value: new Date().toLocaleString() },
    ],
  },
});