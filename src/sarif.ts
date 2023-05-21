

const fs = require('fs')
const {
    SarifBuilder,
    SarifRunBuilder,
    SarifResultBuilder,
} = require('node-sarif-builder')
const yargs = require('yargs')

export function minVal(val: number) {
    if (val) {
        return val;
    }
    return 1;
}

export function relative(rootdir: string, fullpath: string) {
    if (fullpath.startsWith(rootdir)) {
        return fullpath.substring(rootdir.length+1);
    }
    return fullpath;
}

export function main() {
    const argv = yargs
        .option('o', {
            alias: 'output',
            describe: 'Output filename',
            type: 'string',
            demandOption: false,
        })
        .option('r', {
            alias: 'root',
            describe: 'Root directory',
            type: 'string',
            demandOption: false,
        })
        .demandCommand(1)
        .usage('Usage: $0 [options] <filename>').argv
    
    const filename = argv._[0]
    const outputfilename = argv.output
    const rootdir = argv.root;

    exportSarif(filename, outputfilename, rootdir);
}

export function exportSarif(filename:string, outputfilename:string,rootdir:string) {
    const results = JSON.parse(fs.readFileSync(filename, 'utf8'))

    // SARIF builder
    const sarifBuilder = new SarifBuilder()

    // SARIF Run builder
    const sarifRunBuilder = new SarifRunBuilder().initSimple({
        toolDriverName: 'spectral-sarif',
        toolDriverVersion: '0.0.8',
    })

    results.forEach((result) => {
        const sarifResultBuilder = new SarifResultBuilder()
        const sarifResultInit = {
            ruleId: result.code,
            level: 'error',
            messageText: result.message,
            fileUri: relative(rootdir,result.source),   
            
            startLine: 0,
            startColumn: 0,
            endLine: 0,
            endColumn: 0
        }

        sarifResultInit.startLine = minVal(result.range.start.line) + 1
        sarifResultInit.startColumn = minVal(result.range.start.character)
        sarifResultInit.endLine = minVal(result.range.end.line) + 1
        sarifResultInit.endColumn = minVal(result.range.end.character)

        sarifResultBuilder.initSimple(sarifResultInit)
        sarifRunBuilder.addResult(sarifResultBuilder)
    })

    sarifBuilder.addRun(sarifRunBuilder)

    const json = sarifBuilder.buildSarifJsonString({ indent: true })

    if (outputfilename) {
        fs.writeFileSync(outputfilename, json)
    } else {
        console.log(json)
    }
}
