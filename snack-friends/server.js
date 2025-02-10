const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const users = new Map();

wss.on('connection', ws => {
  ws.on('message', message => {
    const data = JSON.parse(message);

    if (data.type === 'register') {
      if (!users.has(data.userId)) {
        users.set(data.userId, new Set());
      }
      users.get(data.userId).add(ws);
    }

    if (
      data.type === 'sendFriendRequest' ||
      data.type === 'newFriendAccepted' ||
      data.type === 'friendRemoved' ||
      data.type === 'friendDeclined'
    ) {
      const receiverConnections = users.get(data.receiverId);
      if (receiverConnections) {
        receiverConnections.forEach(connection => {
          if (connection.readyState === WebSocket.OPEN) {
            connection.send(JSON.stringify(data));
          }
        });
      }
    }
  });

  ws.on('close', () => {
    users.forEach((connections, userId) => {
      connections.delete(ws);
      if (connections.size === 0) {
        users.delete(userId);
      }
    });
  });
});
