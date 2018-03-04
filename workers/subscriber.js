var q = 'tasks';

var open = require('amqplib').connect('amqp://localhost');

/* Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);
*/

export async function readQueue(queue, saveCB) {
  var q = queue || 'tasks';

  var open = require('amqplib').connect('amqp://localhost');
    // Consumer
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          saveCB(JSON.parse(msg.content.toString())).then((saveData) => {
            if(saveData) {
              ch.ack(msg);
            }
          })
        }
      });
    });
  }).catch(console.warn);
}