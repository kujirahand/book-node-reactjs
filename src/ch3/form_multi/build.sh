#!/bin/sh
config=$(cd $(dirname $0) &&pwd)/build.config.js
cd ../.. && webpack --config $config $* 

