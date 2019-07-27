#!/bin/sh
config=$(cd $(dirname $0) &&pwd)/webpack.config.js
cd ../.. && webpack --config $config $* 

