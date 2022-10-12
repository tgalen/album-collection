const UserProfile = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h1>profile</h1>
      <h1>{user && user.userName}</h1>
      <h3>{user && user.email}</h3>
    </div>
  );
};

export default UserProfile;
