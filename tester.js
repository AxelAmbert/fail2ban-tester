const { spawn } = require('cross-spawn');
const sshUntilBan = require('./sshUntilBan');
const resetConnection = require('./resetConnection');

require('dotenv').config()

let availableCountry = [ 'Albania', 'Canada', 'Finland', 'India', 'Malaysia', 'Portugal', 'Spain', 'United_States',
    'Argentina', 'Chile', 'France', 'Indonesia', 'Mexico', 'Romania', 'Sweden', 'Vietnam', 'Australia', 'Costa_Rica',
    'Georgia', 'Ireland', 'Moldova', 'Serbia', 'Switzerland', 'Austria', 'Croatia', 'Germany', 'Israel', 'Netherlands',
    'Singapore', 'Taiwan','Belgium', 'Cyprus', 'Greece', 'Italy', 'New_Zealand', 'Slovakia', 'Thailand', 'Poland',
    'Bosnia_And_Herzegovina', 'Czech_Republic', 'Hong_Kong', 'Japan', 'North_Macedonia', 'Slovenia', 'Turkey','Brazil',
    'Denmark', 'Hungary', 'Latvia', 'Norway', 'South_Africa', 'Ukraine','Bulgaria', 'Estonia', 'Iceland', 'Luxembourg',
    'South_Korea', 'United_Kingdom' ]

const disconnectVPN = () => {
    const connect = spawn("nordvpn", ["disconnect"]);

    connect.on('exit',  (code, signal) => {
        if (code !== 0) {
            console.log(`Something went wrong with NordVPN, exited with error code ${code}`);
        }
    });
}

const connectVPNThen = (masterIter, then) => {
    let connect = null;
    const randomCountry = Math.floor(Math.random() * (availableCountry.length - 1));

    if (masterIter > process.env.nbOfIpThreshold) {
        disconnectVPN()
        return;
    }
    connect = spawn("nordvpn", ["connect", availableCountry[randomCountry]]);
    connect.on('exit',  (code, signal) => {
        if (code !== 0) {
            console.log(`Something went wrong with NordVPN, exited with error code ${code}`);
        } else {
            then(1, masterIter, connectVPNThen)
        }
    });
}

connectVPNThen(1, resetConnection);
