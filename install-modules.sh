#!/bin/bash
if read -r modules < modules.txt; then
  npm install $modules
else
  echo "modules.txt file ko read karne mein error."
fi
