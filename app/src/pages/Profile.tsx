import { useAuth } from '@hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user?.sub}</p>
      <p>Roles: {user?.roles.join(' | ')}</p>
    </div>
  );
};

export default Profile;