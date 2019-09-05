#!/usr/bin/env sh

cat mail.txt | while read -r mail; do
  echo "Processing ${mail}...";
  qrencode -o out/"${mail}".png "${mail}"
done
