const { spawn } = require('cross-spawn');

const resetConnection = (sshIter, masterIter, masterFunc) => {
    if (sshIter > process.env.sshThreshold) {
        masterFunc(masterIter + 1, resetConnection)
        return;
    }

    const ssh = spawn('ssh', [process.env.IP, "-p", "222", "-l", "axe"]);
    const cancel = setTimeout(() => {
        ssh.kill()
    }, 2000);

    ssh.on('exit',  () => {
        clearTimeout(cancel);
        setTimeout(() => resetConnection(sshIter + 1, masterIter, masterFunc), 2000);
    });
}

module.exports = resetConnection;