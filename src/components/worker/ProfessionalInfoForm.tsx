import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

const professionalInfoSchema = z.object({
  yearsOfExperience: z.enum(['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'], {
    errorMap: () => ({ message: 'Selecciona una opción válida de experiencia' })
  }),
  description: z.string().trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  websiteUrl: z.string().trim()
    .url('La URL debe ser válida')
    .or(z.literal(''))
    .optional(),
});

type ProfessionalInfoData = z.infer<typeof professionalInfoSchema>;

interface Props {
  worker: any;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function ProfessionalInfoForm({ worker, onUpdate, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfessionalInfoData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      yearsOfExperience: worker.years_of_experience,
      description: worker.description,
      websiteUrl: worker.website_url || '',
    },
  });

  const onSubmit = async (data: ProfessionalInfoData) => {
    try {
      const { error } = await supabase
        .from('workers')
        .update({
          years_of_experience: data.yearsOfExperience,
          description: data.description,
          website_url: data.websiteUrl || null,
        })
        .eq('id', worker.id);

      if (error) throw error;

      toast.success('Información profesional actualizada exitosamente');
      onUpdate();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar la información profesional');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Años de Experiencia *
        </label>
        <select
          {...register('yearsOfExperience')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Seleccionar experiencia</option>
          <option value="Menos de 1 año">Menos de 1 año</option>
          <option value="1-3 años">1-3 años</option>
          <option value="3-5 años">3-5 años</option>
          <option value="Más de 5 años">Más de 5 años</option>
        </select>
        {errors.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción Profesional *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe tu experiencia, habilidades y servicios..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sitio Web <span className="text-gray-400">(Opcional)</span>
        </label>
        <input
          type="url"
          {...register('websiteUrl')}
          placeholder="https://ejemplo.com"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.websiteUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.websiteUrl.message}</p>
        )}
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