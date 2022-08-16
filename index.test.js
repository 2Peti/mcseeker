const fs = require('fs');
const os = require('os');
const path = require('path');
const events = require('events');
const { fork } = require("child_process");

var testServer = "mc.hypixel.net:25565";

test(testServer, async () => {
  let tmpDir;
  var data;
  try {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mcseeker"));
    inFile = tmpDir + "/input.txt";
    outFile = tmpDir + "/output.csv";
    fs.writeFileSync(inFile, testServer);
    const child = fork("index.js", ["--in", inFile, "--out", outFile, "--quiet"]);
    await events.once(child, 'close');

    try {
      data = fs.readFileSync(outFile, 'utf8').toString();
    } catch (err) {
      console.error(err);
    }
  }
  catch (err) {console.error(err);}
  finally { 
    try {
      if (tmpDir) {fs.rmSync(tmpDir, { recursive: true });}
    }catch (err) {
      console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${err}`);
    }
  }
  expect(data.substring(0,testServer.length)).toBe(testServer);
  expect(data.length).toBeGreaterThan(testServer.length);
});