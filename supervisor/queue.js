
export function pushToQueue(queue, data) {
  var q = queue || 'task';
  var open = require('amqplib').connect('amqp://localhost');
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.sendToQueue(q, new Buffer(JSON.stringify(data)));
    });
  }).catch(console.warn);
}
