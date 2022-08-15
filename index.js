const fs = require('fs');
var status = require('minecraft-status').MinecraftServerListPing;
const events = require('events');
const readline = require('readline');
process.params = (require('commandos')).parse(process.argv);

var INPUT_FILE = (process.params['in']);
var SCAN_OPTS_OUTPUT_CSV = (process.params['out']);
var TIMEOUT = (process.params['timeout'] || 15000);

var outStream = fs.createWriteStream(SCAN_OPTS_OUTPUT_CSV, { flags: 'a' });
var servers = 0;
var total = 0;

main();
printProgress();
async function main() {
  console.log("Scanning IPs from " + INPUT_FILE);
  var inFile = readline.createInterface({input: fs.createReadStream(INPUT_FILE)});
  inFile.on('line', function (line) {
    var data = line.split(":");
    status.ping(757, data[0], data[1], TIMEOUT).then((pingRes) => {
      servers++
      total++
      //console.log(`${line}\t${pingRes.version.name}\t${pingRes.players.online} of ${pingRes.players.max} players\t${pingRes.description.text.replace(/\n/g, ' ').replace(/\u00A7[0-9A-FK-OR]/ig,'')}`);
      outStream.write(`${line},${pingRes.version.name.replace(/\,/g, '+')},${pingRes.players.online}/${pingRes.players.max},${pingRes.description.text.replace(/\n/g, ' ').replace(/\,/g, ';')}\n`);
    }).catch((error) => {total++});
  });
}
async function printProgress(){
  await new Promise(resolve => setTimeout(resolve, 1000))
  for (var x = 0; x < total+1; x++) {
    process.stdout.cursorTo(0);
    process.stdout.write(`Found ${servers}/${total} servers`);
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}