const fs = require('fs')
const {
    SarifBuilder,
    SarifRunBuilder,
    SarifResultBuilder,
} = require('node-sarif-builder')
const yargs = require('yargs')

function minVal(val)
{
  if (val) {
    return val;
  }
  return 1;
}

const argv = yargs
    .option('o', {
        alias: 'output',
        describe: 'Output filename',
        type: 'string',
        demandOption: false,
    })
    .demandCommand(1)
    .usage('Usage: $0 [options] <filename>').argv

const filename = argv._[0];
const outputfilename = argv.output;

const results = JSON.parse(fs.readFileSync(filename, 'utf8'));

// SARIF builder
const sarifBuilder = new SarifBuilder();

// SARIF Run builder
const sarifRunBuilder = new SarifRunBuilder().initSimple({
    toolDriverName: 'spectral-sarif',
    toolDriverVersion: '0.0.7',
});

results.forEach((result) => {
    const sarifResultBuilder = new SarifResultBuilder();
    const sarifResultInit = {
        ruleId: result.code,
        level: 'error',
        messageText: result.message,
        fileUri: result.source,
    };

    sarifResultInit.startLine = minVal(result.range.start.line);
    sarifResultInit.startColumn = minVal(result.range.start.character);
    sarifResultInit.endLine = minVal(result.range.end.line);
    sarifResultInit.endColumn = minVal(result.range.end.character);

    sarifResultBuilder.initSimple(sarifResultInit)
    sarifRunBuilder.addResult(sarifResultBuilder)
})

sarifBuilder.addRun(sarifRunBuilder);

const json = sarifBuilder.buildSarifJsonString({ indent: true });

if (outputfilename) {
  fs.writeFileSync(outputfilename, json);
} else {
  console.log(json);
}
