#!/bin/bash
# -*- coding: utf-8 -*-
# остановить публикацию при ошибках
set -e

folder="./../dist"

if [ -d "$folder" ]; then
  find $folder -type f -exec rm -f {} \;
  echo ">> old files in folder '$folder' deleted."
else
  echo ">> folder '$folder' not found."
fi

echo ">> starting build.."
npm run build
echo ">> build ended"
cd ./../dist
echo ">> init git repo.."
git init
echo ">> adding files in index.."
git add -A
echo ">> commiting changes.."
git commit -m 'deploy'

git remote add origin git@github.com:TyT-xexebe/mlog-learn-vue.git
echo ">> pushing changes.."
git push -f origin master:gh-pages
echo ">> removing repo & exit from dist"
rm -rf .git
cd ./..
 
echo ">> adding new files in main git repo.."
git add .
git commit
echo ">> pushing changes.."
git push origin
cd ./bin
