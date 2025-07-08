
const path = require('path');
const fs = require('fs');


const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const jsonReportPath = path.join(__dirname, 'test-results', 'json', `cucumber-report-${timestamp}.json`);


fs.mkdirSync(path.dirname(jsonReportPath), { recursive: true });

module.exports = {
  default: {
    format: [`json:${jsonReportPath}`, 'progress-bar'],
    require: ['features/step_definitions/*.js'],
    publishQuiet: true,
  },
};