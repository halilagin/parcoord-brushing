check package.json: webpack-dev-server --config webpack.config.js --inline --progress --profile  --watch  --content-base . --host 0.0.0.0 --port 5002 --public localhost

localhost should be the ip.

check webpack.config.js: 

uncomment the lines below.
//disableHostCheck: true,
//public: '34.235.8.207
