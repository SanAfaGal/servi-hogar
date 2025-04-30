import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        // Get error and next path from URL
        const error = searchParams.get('error');
        const next = searchParams.get('next') || '/perfil';

        if (error) {
          throw new Error(error);
        }

        // Check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session) {
          toast.success('¡Verificación exitosa!', {
            duration: 5000,
            icon: '✅'
          });
          navigate(next);
        } else {
          throw new Error('No se encontró una sesión válida');
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        toast.error(
          error.message === 'Email link is invalid or has expired'
            ? 'El enlace ha expirado o no es válido'
            : 'Error al verificar la autenticación',
          { duration: 5000 }
        );
        navigate('/login');
      }
    };

    handleAuthRedirect();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Verificando autenticación
          </h2>
          <p className="text-gray-600">
            Por favor espera mientras verificamos tu identidad...
          </p>
        </div>
      </div>
    </div>
  );
}