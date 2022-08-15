var fs = require('fs');
var status = require('minecraft-status').MinecraftServerListPing;
process.params = (require('commandos')).parse(process.argv);

var INPUT_FILE = (process.params['in']);
var SCAN_OPTS_OUTPUT_CSV = (process.params['out']);
var TIMEOUT = (process.params['timeout'] || 15000);

var outStream = fs.createWriteStream(SCAN_OPTS_OUTPUT_CSV, { flags: 'a' });
var i = 0;

function a(file_line){
    var data = file_line.split(":");
    status.ping(757, data[0], data[1], TIMEOUT).then(function(pingRes){
      i++;
      //console.log(`${file_line}\t${pingRes.version.name}\t${pingRes.players.online} of ${pingRes.players.max} players\t${pingRes.description.text.replace(/\n/g, ' ').replace(/\u00A7[0-9A-FK-OR]/ig,'')}`);
      outStream.write(`${file_line},${pingRes.version.name.replace(/\,/g, '+')},${pingRes.players.online}/${pingRes.players.max},${pingRes.description.text.replace(/\n/g, ' ').replace(/\,/g, ';')}\n`);
      if (pingRes.description.text.toLowerCase().includes('LiveOverflow'.toLowerCase())) {
        console.log(`Found LiveOverflow on ${file_line}`);
      }
    }).catch(function(error){
      //console.log(error);
    });
}

console.log("Scanning IPs from " + INPUT_FILE);
console.time("finish");
console.time("load");
var lines = fs.readFileSync(INPUT_FILE, 'utf-8').split('\n');
for (var x = 0; x < lines.length; x++) {
  a(lines[x]);
}
console.timeEnd("load");
function exitHandler() {console.timeEnd("finish");console.log(`Found ${i} servers.`);}
process.on('exit', exitHandler.bind());
