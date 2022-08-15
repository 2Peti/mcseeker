FILES="out/*"
for f in $FILES
do
  ./MCSeeker --in $f --out "example.csv" 
  sleep 5
done
