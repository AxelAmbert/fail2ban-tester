const { spawn } = require('cross-spawn');
require('dotenv').config()

const sshThreshold = 2;
const nbOfIpThreshold = 2;

const disconnectVPN = () => {
    const connect = spawn("nordvpn", ["connect"]);

    connect.on('exit',  (code, signal) => {
        if (code !== 0) {
            console.log(`Something went wrong with NordVPN, exited with error code ${code}`);
        } else {
            console.log("VPN disconnected!")
        }
    });
}

const sshUntilBan = async (sshIter, masterIter) => {
    if (sshIter > sshThreshold) {
        spamSSHConnection(masterIter + 1)
        return;
    }

    const ssh = spawn('sshpass', ["-p", "passrandom", "ssh", process.env.IP,  "-v", "bash", "-s",]);

    ssh.on('exit',  () => {
        setTimeout(() => sshUntilBan(sshIter + 1, masterIter), 2000);
    });
}

const spamSSHConnection = (masterIter) => {
    let connect = null;

    if (masterIter > nbOfIpThreshold) {
        disconnectVPN()
        return;
    }
    connect = spawn("nordvpn", ["connect"]);
    connect.on('exit',  (code, signal) => {
        if (code !== 0) {
            console.log(`Something went wrong with NordVPN, exited with error code ${code}`);
        } else {
            sshUntilBan(1, masterIter)
        }
    });
}

spamSSHConnection(1);
