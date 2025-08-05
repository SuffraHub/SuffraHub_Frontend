import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ allowedPermissions = [], children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/user-info', { withCredentials: true })
      .then(res => {
        const userPermission = res.data?.permissions;

        console.log('%c[ProtectedRoute]', 'color: #0066ff');
        console.log('→ Wymagane uprawnienia:', allowedPermissions);
        console.log('→ Uprawnienia użytkownika:', userPermission);

        if (typeof userPermission === 'number') {
          setIsAuthenticated(true);

          if (
            Array.isArray(allowedPermissions) &&
            allowedPermissions.includes(userPermission)
          ) {
            setHasAccess(true);
          } else {
            console.warn(
              '[ProtectedRoute] Brak dostępu:',
              'uprawnienia użytkownika =',
              userPermission,
              ', wymagane =',
              allowedPermissions
            );
            setIsAuthenticated(true);
        setHasAccess(false);
          }
        } else {
          console.warn('[ProtectedRoute] Niepoprawny format uprawnień użytkownika:', userPermission);
        }
      })
      .catch((err) => {
        console.error('[ProtectedRoute] Błąd podczas pobierania danych użytkownika:', err.message);
        setIsAuthenticated(false);
        setHasAccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [allowedPermissions]);

  if (loading) return <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>;

  if (!isAuthenticated) {
    console.warn('[ProtectedRoute] Użytkownik niezalogowany – przekierowanie na /user/login');
    return <Navigate to="/user/login" replace />;
  }

  if (!hasAccess) {
    console.warn('[ProtectedRoute] Brak wymaganych uprawnień – przekierowanie na /');
    return <Navigate to="/admin" replace />;

  }

  return children;
}

export default ProtectedRoute;
