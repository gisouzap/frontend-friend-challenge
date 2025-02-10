'use client';

import { useEffect, useState } from 'react';

import { getAuthUser, logout } from '@/app/actions/auth';
import { getFriends } from './friends';
import { usersDB } from '@/app/lib/mockDB';

import { Avatar, Box, Grid, Heading, Separator } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';

import AvailableUsers from './components/AvailableUsers';
import Friends from './components/Friends';
import Header from './components/Header';
import ReceivedFriendRequests from './components/ReceivedFriendRequests';
import SectionContainer from './components/SectionContainer';
import SentFriendRequests from './components/SentFriendRequests';

import useToaster from './hooks/useToaster';
import useWebSocket from './hooks/useWebsocket';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(usersDB);
  const [friends, setFriends] = useState([]);
  const [receivedFriendRequest, setReceivedFriendRequest] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);

  const showToaster = useToaster();

  const { sendSocketNotification } = useWebSocket(
    'ws://localhost:8080',
    user,
    showToaster,
    setSentRequests,
    setReceivedFriendRequest,
    setAvailableUsers,
    setFriends
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const registeredUser = localStorage.getItem('user');
        if (registeredUser) {
          const parsedUser = JSON.parse(registeredUser);
          setUser(parsedUser);
          setUsers(prev => [...prev, parsedUser]);
        } else {
          const authUser = await getAuthUser();

          if (authUser) {
            setUser(authUser);
          }
        }
      } catch (error) {
        showToaster('Erro ao buscar usuário.', 'error');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { availableUsers } = getFriends(users, user.id);
        setAvailableUsers(availableUsers);
      } catch (error) {
        showToaster('Erro ao buscar amigos.', 'error');
      }
    };

    if (user?.id) {
      fetchFriends();
    }
  }, [user?.id]);

  const updateFriendList = (friendId, sourceList, setSource, setTarget) => {
    const friend = sourceList.find(u => u.id === friendId);
    if (friend) {
      setSource(prev => prev.filter(u => u.id !== friendId));
      setTarget(prev => [...prev, friend]);
    }
  };

  const handleSendFriendRequest = async friendId => {
    showToaster('Convite enviado!');
    updateFriendList(
      friendId,
      availableUsers,
      setAvailableUsers,
      setSentRequests
    );
    sendSocketNotification(friendId, 'sendFriendRequest');
  };

  const handleAcceptFriendRequest = async friendId => {
    showToaster('Convite aceito!');
    updateFriendList(
      friendId,
      receivedFriendRequest,
      setReceivedFriendRequest,
      setFriends
    );
    sendSocketNotification(friendId, 'newFriendAccepted');
  };

  const handleRemoveFriend = async friendId => {
    showToaster('Amigo removido!');

    updateFriendList(friendId, friends, setFriends, setAvailableUsers);

    sendSocketNotification(friendId, 'friendRemoved');
  };

  const handleDeclineFriendRequest = async friendId => {
    showToaster('Convite recusado!');

    updateFriendList(
      friendId,
      receivedFriendRequest,
      setReceivedFriendRequest,
      setAvailableUsers
    );

    sendSocketNotification(friendId, 'friendDeclined');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <Box
      alignContent="center"
      alignSelf="center"
      backgroundColor="bg.subtle"
      borderRadius="md"
      boxShadow="lg"
      height={{ base: '100%', md: '70%', lg: '70%' }}
      justifyContent="center"
      maxWidth="100%"
      mx="auto"
      p="6"
      width={{ base: '100%', md: '90%', lg: '90%' }}
    >
      <Header onLogout={handleLogout} />

      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={{ base: '4', md: '6' }}
        justifyContent="space-between"
        height={'90%'}
        boxSizing="border-box"
      >
        <SectionContainer title={`${user.username}!`}>
          <Avatar.Root size="2xl">
            <Avatar.Fallback name={user.username} />
            <Avatar.Image src={user.picture} />
          </Avatar.Root>
          <Heading>Amigos Adicionados</Heading>
          <Friends users={friends} onRemoveFriend={handleRemoveFriend} />
        </SectionContainer>

        <SectionContainer title="Descubra novos amigos">
          <AvailableUsers
            users={availableUsers}
            onSendRequest={handleSendFriendRequest}
          />
        </SectionContainer>

        <SectionContainer title="Convites Recebidos">
          <ReceivedFriendRequests
            users={receivedFriendRequest}
            onAccept={handleAcceptFriendRequest}
            onDecline={handleDeclineFriendRequest}
          />
          <Separator borderColor="yellow.500" width="100%" />
          <Heading>Solicitações enviadas</Heading>
          <Separator borderColor="yellow.500" width="100%" />
          <SentFriendRequests users={sentRequests} />
        </SectionContainer>
      </Grid>
      <Toaster />
    </Box>
  );
}
