// Datei: hello-swarm/swarmstuff/server.js
const http = require("http"),
  os = require("os");

http
  .createServer((req, res) => {
    const dateTime = new Date(),
      load = os.loadavg(),
      net = os.networkInterfaces();
    let ips = [];
    for (const key of Object.keys(net)) {
      for (const iface of net[key]) {
        if (iface.internal === false) {
          ips.push(iface.address);
        }
      }
    }
    ips.sort();
    const doc = `<!DOCTYPE html>
<html>
  <head>
    <title>Hello swarm Marco</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <h1>Hello swarm!</h1>
    Swarm-Node: ${os.hostname()}, ver. ${os.release()}<br />
    Serverzeit: ${dateTime}<br />
    Uptime: ${os.uptime() / 60 / 60} Stunden<br />
    Netzwerk: ${ips.join(",")}<br />
    Serverauslastung (load): ${load[0]}
  </body>
</html>`;
    res.setHeader("Content-Type", "text/html");
    res.end(doc);
  })
  .listen(8080);


