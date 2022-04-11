const express = require('express');
const bodyParser = require('body-parser');
const dockerCLI = require('docker-cli-js');
const DockerOptions = dockerCLI.Options;
const Docker = dockerCLI.Docker;

const { dockerCommand } = require('docker-cli-js');

const options = {
    machineName: null, // uses local docker
    currentWorkingDirectory: null, // uses current working directory
    echo: true, // echo command output to stdout/stderr
};

const docker = new Docker(options);

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const server = app.listen(3000, () => {
    console.log('시작! 포트 http://localhost:3000 에서 요청 기다리고 있습니다.');
});

const stopServer = () => {
    server.close();
};

app.get('/docker/', async (req, res) => {
    await docker.command('run -d -p 80:80 docker/getting-started').then(function (data) {
        res.send({
            result : data
        })
    }, function(error){
        res.send({
            result : error
        })
    })
});

module.exports = {
    server,
    stopServer,
};