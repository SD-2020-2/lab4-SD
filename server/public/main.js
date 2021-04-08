var socket = io.connect("/clients", { forceNew: true });

socket.on("time", function (data) {
  console.log(data);
});

function addMessage(e) {
  terminal.stdin.write('date --set "2021-04-07 17:27"');
  terminal.stdin.end();
  return true;
}
