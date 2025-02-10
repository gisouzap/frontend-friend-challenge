export const getFriends = (users, userId) => {
  const user = users.find(user => user.id === userId);
  if (!user) return { friends: [], pendingFriends: [], availableUsers: users };

  const availableUsers = users
    .filter(u => u.id !== userId && !user.friends.some(f => f.id === u.id))
    .map(u => ({ ...u, status: 'none', picture: u.picture }));

  return { availableUsers };
};
