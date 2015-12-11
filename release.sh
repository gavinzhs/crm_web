#!/usr/bin/env bash
host=123.59.62.21

dist=dist
dir=/opt/huihua/public/admin

echo "prepare"
rm -rf $dist
cp -r app $dist
rm -rf $dist/*.html $dist/bower_components $dist/js/*.js
cp -r app/index_dist.html $dist/index.html
rm -rf $dist/js/*

echo "build lib.css"
cp app/bower_components/html5-boilerplate/src/css/main.css $dist/css
cat \
app/bower_components/angular-xeditable/dist/css/xeditable.css \
> $dist/css/lib.css

echo "build lib.js"
echo "'use strict';" > $dist/js/lib.js

cat app/bower_components/angular-ui-utils/ui-utils.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/angular-xeditable/dist/js/xeditable.min.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/holderjs/holder.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/angular-ueditor/dist/angular-ueditor.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/ng-file-upload/angular-file-upload-shim.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/ng-file-upload/angular-file-upload.js >> $dist/js/lib.js

echo " " >> $dist/js/lib.js
cat app/bower_components/angular-i18n/angular-locale_zh-cn.js >> $dist/js/lib.js

echo "build app.js"
echo "'use strict';" > $dist/js/app.js
cat app/js/app.js |grep -v "use strict" >> $dist/js/app.js
cat app/js/**/*.js |grep -v "use strict" >> $dist/js/app.js


echo "tar"
tar -zcf $dist.tar.gz $dist

echo "prepare"
ssh root@$host "mkdir -p $dir"

echo "scp"
scp $dist.tar.gz root@$host:


echo "remote operation"
ssh root@$host "rm -rf $dist"
ssh root@$host "tar -zxf $dist.tar.gz && rm -rf $dir && mv $dist $dir >/dev/null"

echo "clean"
rm -rf $dist.tar.gz
rm -rf $dist

echo "done"
