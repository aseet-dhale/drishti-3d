i=0
for file in *.jpg; do
	echo $file
	i=$((i+1))
	cwebp $file -o  "$i.webp"
done
