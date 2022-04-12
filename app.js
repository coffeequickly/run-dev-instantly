// https://github.com/Quobject/docker-cli-js
const express = require('express');
const bodyParser = require('body-parser');
const dockerCLI = require('docker-cli-js');
// const DockerOptions = dockerCLI.Options;
const Docker = dockerCLI.Docker;
// const { dockerCommand } = require('docker-cli-js');
import config from "./configure"
const options = {
    machineName: null, // uses local docker
    currentWorkingDirectory: null, // uses current working directory
    echo: true, // echo command output to stdout/stderr
};

const docker = new Docker(options);

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const server = app.listen(config.port, () => {
    console.log('시작! 포트 http://localhost:' + config.port + ' 에서 요청 기다리고 있습니다.');
});

const stopServer = () => {
    server.close();
};

//https://github.com/coffeequickly/half.engineer.git

app.get('/docker/', async (req, res) => {
    // TODO : 이미지 만드는걸 분리하자...
    const NODE_VERSION = "14.19.1";
    const GITHUB_TARGET = "coffeequickly/half.engineer";
    await docker.command(`run -itd -p 80:3000 $(docker build --build-arg NODE_VERSION=${NODE_VERSION} --build-arg GITHUB_TARGET=${GITHUB_TARGET}  --build-arg GITHUB_TOKEN=${config.token} -q -t test-2 .)`).then(function (data) {
        res.send({
            containerId : data.containerId
        })
    }, function(error){
        res.send({
            error : error
        })
    })
});

module.exports = {
    server,
    stopServer,
};