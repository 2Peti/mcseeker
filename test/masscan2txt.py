import os
import argparse

# Convert bin to IP:Port format.
#!cd $workDir && masscan --readscan result.bin -oL tmp.txt
os.system("masscan --readscan result.bin -oL masscan.txt")

inputfile = "masscan.txt"
outputdir = "out"

fileHandler = open(str(inputfile), "r")
listOfLines = fileHandler.readlines()
fileHandler.close()
os.remove(inputfile)

tmp = [];
for line in listOfLines:
  if line.strip()[0] != "#":
    tmp.append(line.strip().split(' ',4)[3] + ":" + line.strip().split(' ',4)[2])

dirpath = os.path.join(outputdir)
if os.path.exists(dirpath) and os.path.isdir(dirpath):
    shutil.rmtree(dirpath)

os.mkdir(outputdir)

chunk_size = 400000
for i in range(0, len(tmp), chunk_size):
  chunk = tmp[i:i + chunk_size]
  text_file = open(outputdir + "/" + str(int(i/chunk_size)) + ".txt", "w")
  for addr in chunk:
    text_file.write(addr + "\n")
  text_file.close()
