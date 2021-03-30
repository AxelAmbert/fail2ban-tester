# fail2ban-tester
## How to start the project:

### First install the dependencies:
npm install

### Then you must install sshpass:
sudo apt install sshpass

### Install and configure NordVPN CLI:
https://support.nordvpn.com/Connectivity/Linux/1325531132/Installing-and-using-NordVPN-on-Debian-Ubuntu-Raspberry-Pi-Elementary-OS-and-Linux-Mint.htm

### Create a .env file that contain the following values:
IP= The ip that you want to test/attack.

sshTreshold= The number of attempt before Fail2ban bans the IP.

nbOfIpThreshold= The number of IP you want Fail2ban to ban.

### Start the program:
node tester.js
