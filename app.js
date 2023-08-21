const http = require("http");
const { v4: uuidv4 } = require("uuid");

const port = process.env.PORT || 8080; // Allow configuration via environment variables

function handleRequest(req, res) {
  const transactionId = uuidv4();
  const userAgent = req.headers["user-agent"];

  logRequest(transactionId, req.connection.remoteAddress, userAgent);

  const podName = process.env.POD_NAME || "Unset";
  sendResponse(res, transactionId, podName);
}

function logRequest(transactionId, remoteAddr, userAgent) {
  console.log("Request received", {
    transactionId,
    remoteAddr,
    "User-Agent": userAgent,
  });
}

function sendResponse(res, transactionId, podName) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    `<html>
            <head></head>
            <body>
                <h1>This is a web template</h1>
                <p>Transaction id: ${transactionId}</p>
                <p>Your request is processed by pod: ${podName}</p>
                <footer><p><i>Edit this file at app.js</i></p></footer>
            </body>
        </html>`
  );
  res.end();
}

const server = http.createServer(handleRequest);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
