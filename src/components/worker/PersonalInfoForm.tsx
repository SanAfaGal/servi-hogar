import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

const personalInfoSchema = z.object({
  firstName: z.string().trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  middleName: z.string().trim()
    .max(50, 'El segundo nombre no puede exceder 50 caracteres')
    .optional(),
  firstLastName: z.string().trim()
    .min(2, 'El primer apellido debe tener al menos 2 caracteres')
    .max(50, 'El primer apellido no puede exceder 50 caracteres'),
  secondLastName: z.string().trim()
    .max(50, 'El segundo apellido no puede exceder 50 caracteres')
    .optional(),
  phoneNumber: z.string().trim()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos')
    .max(15, 'El número de teléfono no puede exceder 15 dígitos')
    .regex(/^(\+57|57)?[1-9][0-9]{9}$/, 'Ingresa un número de teléfono colombiano válido (10 dígitos)'),
  city: z.enum(['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas']),
  neighborhood: z.string().trim()
    .min(2, 'El barrio debe tener al menos 2 caracteres')
    .max(100, 'El barrio no puede exceder 100 caracteres'),
  fullAddress: z.string().trim()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface Props {
  worker: any;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function PersonalInfoForm({ worker, onUpdate, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: worker.first_name,
      middleName: worker.middle_name || '',
      firstLastName: worker.first_last_name,
      secondLastName: worker.second_last_name || '',
      phoneNumber: worker.phone_number,
      city: worker.city,
      neighborhood: worker.neighborhood || '',
      fullAddress: worker.full_address,
    },
  });

  const onSubmit = async (data: PersonalInfoData) => {
    try {
      const { error } = await supabase
        .from('workers')
        .update({
          first_name: data.firstName,
          middle_name: data.middleName || null,
          first_last_name: data.firstLastName,
          second_last_name: data.secondLastName || null,
          phone_number: data.phoneNumber,
          city: data.city,
          neighborhood: data.neighborhood,
          full_address: data.fullAddress,
        })
        .eq('id', worker.id);

      if (error) throw error;

      toast.success('Información personal actualizada exitosamente');
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar la información personal');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Read-only Information */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">
              Información no editable
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Correo electrónico:</span> {worker.email}
              </div>
              <div>
                <span className="font-medium">Tipo de identificación:</span> {worker.identification_type}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Número de identificación:</span> {worker.identification_number}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            {...register('firstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Segundo Nombre <span className="text-gray-400">(Opcional)</span>
          </label>
          <input
            type="text"
            {...register('middleName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.middleName && (
            <p className="mt-1 text-sm text-red-600">{errors.middleName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primer Apellido *
          </label>
          <input
            type="text"
            {...register('firstLastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.firstLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstLastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Segundo Apellido <span className="text-gray-400">(Opcional)</span>
          </label>
          <input
            type="text"
            {...register('secondLastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.secondLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.secondLastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">+57</span>
            </div>
            <input
              type="tel"
              {...register('phoneNumber')}
              className="block w-full pl-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="3001234567"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad *
          </label>
          <select
            {...register('city')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccionar ciudad</option>
            <option value="Medellín">Medellín</option>
            <option value="Bello">Bello</option>
            <option value="Itagüí">Itagüí</option>
            <option value="Envigado">Envigado</option>
            <option value="Sabaneta">Sabaneta</option>
            <option value="La Estrella">La Estrella</option>
            <option value="Copacabana">Copacabana</option>
            <option value="Girardota">Girardota</option>
            <option value="Barbosa">Barbosa</option>
            <option value="Caldas">Caldas</option>
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Barrio *
          </label>
          <input
            type="text"
            {...register('neighborhood')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Dirección Completa *
          </label>
          <input
            type="text"
            {...register('fullAddress')}
            placeholder="Calle, Número, Apartamento"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.fullAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.fullAddress.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}