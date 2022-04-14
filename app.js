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

app.get('/cleanup/container', async (req, res)=>{
    let resultStatus = {
        container : null
    }

    await docker.command(`ps -a`).then((data=>{

        resultStatus.container = data.containerList;

        if(data.containerList.length > 0){
            docker.command(`stop $(docker ps -a -q)`).then(()=>{
                docker.command(`rm $(docker ps -a -q)`).then(data=>{
                    resultStatus.container = data.raw;
                });
            })
        }
    }))

    await res.send(resultStatus)
})

// TODO 메서드 교체 필요(POST, PUT, DELETE 등)
app.get('/docker/', async (req, res) => {
    const NODE_VERSION = "14.19.1";
    const GITHUB_TARGET = "coffeequickly/half.engineer";
    const tagName = 'test4'

    let resultStatus = {
        dockerImage : null,
        container : null
    }

    await docker.command(`build --build-arg NODE_VERSION=${NODE_VERSION} --build-arg GITHUB_TARGET=${GITHUB_TARGET}  --build-arg GITHUB_TOKEN=${config.token} -q -t ${tagName} .`).then((img)=>{
        resultStatus.dockerImage = img.response[0].replace('sha256:', '');
    }).catch(error=>{
        resultStatus.dockerImage = error
    });

    await docker.command(`run -itd -p 80:3000 ${tagName}`).then(function (data) {
        resultStatus.container = data.containerId;
    }).catch(error=>{
        resultStatus.container = error;
    })

    await res.send(resultStatus)
});


module.exports = {
    server,
    stopServer,
};