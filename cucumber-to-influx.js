/*
const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');


const reportPath = '/Users/macbook/Desktop/sele/test-results/json/cucumber-report-2025-07-07T05-45-13-423Z.json'; // Update path
const raw = fs.readFileSync(reportPath);
const features = JSON.parse(raw);

// 2. Configure InfluxDB
const influx = new InfluxDB({
  url: 'http://localhost:8086',
  token: 'zIZggXV3mlpFNxsEcV8lHvQpYIe_reVyhrD19ovh0wDIUYO7-iEL9un9FPfMG3RYZVW_SVqf9YvoL7jPqjQfLg=='
});

const writeApi = influx.getWriteApi('Init', 'my-bucket'); // Update org name


features.forEach((feature) => {
  feature.elements.forEach((scenario) => {
    const status = scenario.steps.every(s => s.result && s.result.status === 'passed') ? 'passed' : 'failed';
    const duration = scenario.steps.reduce((sum, step) => sum + ((step.result && step.result.duration) || 0), 0);
    
    const point = new Point('test_result')
      .tag('feature', feature.name || 'unknown')
      .tag('scenario', scenario.name || 'unknown')
      .tag('status', status)
      .intField('step_count', scenario.steps.length)
      .floatField('duration', duration)
      .timestamp(new Date()); 
    
    writeApi.writePoint(point);
  });
});

// 4. Send data
writeApi.close()
  .then(() => console.log('✅ Test results written to InfluxDB'))
  .catch(e => console.error('❌ Error writing to InfluxDB:', e));
  */

  const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');


const config = {
  reportPath: '/Users/macbook/Desktop/sele/test-results/json/cucumber-report-2025-07-07T05-45-13-423Z.json',
  influx: {
    url: 'http://localhost:8086',
    token: 'zIZggXV3mlpFNxsEcV8lHvQpYIe_reVyhrD19ovh0wDIUYO7-iEL9un9FPfMG3RYZVW_SVqf9YvoL7jPqjQfLg==',
    org: 'Init',
    bucket: 'my-bucket'
  }
};


try {
  const report = JSON.parse(fs.readFileSync(config.reportPath));
  const influx = new InfluxDB({ url: config.influx.url, token: config.influx.token });
  const writeApi = influx.getWriteApi(config.influx.org, config.influx.bucket);

  report.forEach(feature => {
    feature.elements.forEach(scenario => {
      
      const status = scenario.steps.every(s => s.result.status === 'passed') ? 'passed' : 'failed';
      const durationNs = scenario.steps.reduce((sum, step) => sum + step.result.duration, 0);
      const durationSec = durationNs / 1e9; 

      
      const scenarioPoint = new Point('test_result')
        .tag('feature', feature.name)
        .tag('scenario', scenario.name)
        .tag('status', status)
        .intField('step_count', scenario.steps.length)
        .floatField('duration_sec', durationSec)
        .timestamp(new Date());
      
      writeApi.writePoint(scenarioPoint);

      
      scenario.steps.forEach(step => {
        const stepPoint = new Point('test_step')
          .tag('feature', feature.name)
          .tag('scenario', scenario.name)
          .tag('step', step.name.replace(/"/g, "'"))
          .tag('status', step.result.status)
          .floatField('duration_sec', step.result.duration / 1e9)
          .timestamp(new Date());
        
        writeApi.writePoint(stepPoint);
      });
    });
  });


  writeApi.close()
    .then(() => console.log('Data successfully written to InfluxDB'))
    .catch(e => console.error(' Write failed:', e));

} catch (e) {
  console.error('Processing failed:', e);
  process.exit(1);
}