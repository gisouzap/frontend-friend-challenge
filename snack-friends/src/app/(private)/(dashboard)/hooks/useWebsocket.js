'use client';

import { useEffect, useState } from 'react';

const useWebSocket = (
  url,
  user,
  showToaster,
  setSentRequests,
  setReceivedFriendRequest,
  setAvailableUsers,
  setFriends
) => {
  const [socket, setSocket] = useState(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const connectWebSocket = () => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsReconnecting(false);
      if (user?.id) {
        ws.send(JSON.stringify({ type: 'register', userId: user.id }));
      }
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.type === 'sendFriendRequest') {
        showToaster(
          `Você recebeu um novo convite de amizade de ${data.senderUsername}!`
        );

        setReceivedFriendRequest(prev => [
          ...prev,
          {
            id: data.senderId,
            username: data.senderUsername,
            picture: data.senderPicture,
          },
        ]);

        setAvailableUsers(prev => prev.filter(u => u.id !== data.senderId));
      }

      if (data.type === 'newFriendAccepted') {
        showToaster(`${data.senderUsername} aceitou seu convite de amizade!`);

        setFriends(prev => [
          ...prev,
          {
            id: data.senderId,
            username: data.senderUsername,
            picture: data.senderPicture,
          },
        ]);

        setSentRequests(prev => prev.filter(s => s.id !== data.senderId));

        setAvailableUsers(prev => prev.filter(u => u.id !== data.senderId));
      }

      if (data.type === 'friendRemoved') {
        showToaster(
          `${data.senderUsername} removeu você da lista de amigos. :(`,
          'error'
        );

        setFriends(prev => prev.filter(f => f.id !== data.senderId));

        setAvailableUsers(prev => [
          ...prev,
          {
            username: data.senderUsername,
            picture: data.senderPicture,
            id: data.senderId,
            status: 'none',
          },
        ]);
      }

      if (data.type === 'friendDeclined') {
        showToaster(`${data.senderUsername} recusou seu convite`, 'error');
        setSentRequests(prev => prev.filter(s => s.id !== data.senderId));

        setAvailableUsers(prev => [
          ...prev,
          {
            username: data.senderUsername,
            picture: data.senderPicture,
            id: data.senderId,
            status: 'none',
          },
        ]);
      }
    };

    ws.onclose = () => {
      if (!isReconnecting) {
        setIsReconnecting(true);
        setTimeout(() => {
          connectWebSocket();
        }, 10000);
      }
    };

    ws.onerror = () => {
      ws.close();
    };

    setSocket(ws);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user]);

  const sendSocketNotification = (friendId, type) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: type,
          senderId: user.id,
          senderUsername: user.username,
          receiverId: friendId,
          senderPicture: user.picture,
        })
      );
    }
  };

  return { socket, sendSocketNotification };
};

export default useWebSocket;
