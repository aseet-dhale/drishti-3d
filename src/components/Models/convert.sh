for file in *.glb; do
	echo -e "\e[1;32m$file Convering... \e[0m"
	npx gltfjsx -v $file
done
