import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/user-info', { withCredentials: true })
      .then(res => {
        // Sprawdzamy czy user ma permission 5
        // Załóżmy, że permission jest liczbą w res.data.permission
        if (res.data.permissions === 5) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      })
      .catch(() => {
        setHasPermission(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasPermission) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
