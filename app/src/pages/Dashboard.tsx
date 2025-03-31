import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';

const Dashboard = () => {
  const { user } = useAuth();

  // Example to use Axios config  (check the axiosConfig.ts for more informations)
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        toastr('error', `Erro: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <p>Welcome, {user?.sub ?? 'No Name'}</p>
    </div>
  );
};

export default Dashboard;