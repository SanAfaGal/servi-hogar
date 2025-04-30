import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const schema = z.object({
  email: z
    .string()
    .trim()
    .email('Por favor, ingresa un correo electrónico válido')
    .min(1, 'El correo electrónico es requerido')
});

type FormData = z.infer<typeof schema>;

export default function EmailLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Check if user exists
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({
        filters: {
          email: data.email.trim()
        }
      });

      const userExists = users && users.length > 0;
      const redirectTo = `${window.location.origin}/auth/callback`;
      const next = searchParams.get('next') || (userExists ? '/perfil' : '/registro');
      
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email.trim(),
        options: {
          emailRedirectTo: `${redirectTo}?next=${next}`
        }
      });

      if (error) throw error;

      toast.success(
        <div className="space-y-2">
          <p className="font-semibold">¡Enlace enviado!</p>
          <p>Hemos enviado un enlace de verificación a tu correo electrónico.</p>
          <p className="text-sm">Por favor, revisa tu bandeja de entrada para continuar.</p>
        </div>,
        { duration: 6000 }
      );

      setCountdown(60);
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        'Ha ocurrido un error al enviar el enlace. Por favor, intenta nuevamente.',
        { duration: 4000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Bienvenido a ServiHogar
        </h1>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-700">
              <p className="mb-2">
                Ingresa tu correo electrónico para continuar.
              </p>
              <p className="text-sm">
                Si ya tienes cuenta, recibirás un enlace para iniciar sesión.
                Si no tienes cuenta, te guiaremos para crear una nueva.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                {...register('email')}
                className={`block w-full rounded-md border-gray-300 pl-10 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-300' : ''
                }`}
                placeholder="ejemplo@correo.com"
                disabled={isSubmitting || countdown > 0}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || countdown > 0}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : countdown > 0 ? (
              `Reenviar en ${countdown}s`
            ) : (
              'Enviar enlace de acceso'
            )}
          </button>

          {countdown > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Si no recibes el correo en 1 minuto, verifica tu bandeja de spam o
                podrás solicitar un nuevo enlace cuando el contador llegue a cero.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}