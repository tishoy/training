var fs = require('fs');
var execSync = require('child_process').execSync;

var configs = require("../src/config.js");
var routerPath = "http://47.93.26.208:8001/index.php?m=train&c=route&a=client_route";

var version_commond = "git rev-list HEAD --abbrev-commit --max-count=1";

var configPath = "./src/config.js";

// Exec with echo
function execho(command) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(error.output[1]);
        process.exit(error.status);
    }
}

// Exec with return value or error
function execReturn(command) {
    try {
        return execSync(command, { encoding: 'utf8' });
    } catch (error) {
        console.error(error.output[1]);
        process.exit(error.status);
    }
}


function writeConfig(version) {
    configs.version = version;
    configs.routers = routerPath;
    var writeString = "var config = " + JSON.stringify(configs) + ";\nmodule.exports = config;";
    fs.writeFileSync(configPath, writeString, 'utf8');
}


var web_version = execReturn(version_commond).replace("\n", "");

writeConfig(web_version);

execho("npm run build");
execho("scp -r ../build root@47.93.26.208:/var/www/http/ksclient");
execho("scp -r ../css/font root@47.93.26.208:/var/www/http/ksclient/css");
execho("scp ../css/style.css root@47.93.26.208:/var/www/http/ksclient/css");