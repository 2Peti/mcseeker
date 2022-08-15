# MCSeeker

MCSeeker finds minecraft servers in list of IPs and Ports.

MCSeeker with Masscan on Google Colab:
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/2Peti/mcseeker/blob/main/colab.ipynb)

## Usage

```bash
node index.js --in inputfile.txt --out output.csv
```
Input file should be in format ```IP:Port```.

Example input file: 
```
1.1.1.1:25565
2.2.2.2:25565
```

Output is in format ```IP:Port,Version,Online/Max Players,MOTD```. (see exampleOUT.csv)

Example output file: 
```
1.1.1.1:25565,1.19,12/20,A Minecraft Server
2.2.2.2:25565,1.19,25/30,A Minecraft Server
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
