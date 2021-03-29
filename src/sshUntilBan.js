const { spawn } = require('cross-spawn');

const sshUntilBan = async (sshIter, masterIter, masterFunc) => {

    if (sshIter > process.env.sshThreshold) {
        masterFunc(masterIter + 1, sshUntilBan)
        return;
    }

    console.log(process.env.IP)
    const ssh = spawn('sshpass', ["-p", "passrandom", "ssh", process.env.IP,  "-v", "bash", "-s",]);

    ssh.on('exit',  () => {
        setTimeout(() => sshUntilBan(sshIter + 1, masterIter, masterFunc), 2000);
    });
}

module.exports = sshUntilBan;