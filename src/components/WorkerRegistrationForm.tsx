import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

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
  identificationType: z.enum(['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte'], {
    errorMap: () => ({ message: 'Selecciona un tipo de identificación válido' })
  }),
  identificationNumber: z.string().trim()
    .min(5, 'El número de identificación debe tener al menos 5 caracteres')
    .max(20, 'El número de identificación no puede exceder 20 caracteres')
    .regex(/^\d+$/, 'El número de identificación solo debe contener números'),
  phoneNumber: z.string().trim()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos')
    .max(15, 'El número de teléfono no puede exceder 15 dígitos')
    .regex(/^[0-9+]+$/, 'El número de teléfono solo debe contener números y el símbolo +'),
  city: z.enum(['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas'], {
    errorMap: () => ({ message: 'Selecciona una ciudad válida' })
  }),
  neighborhood: z.string().trim()
    .min(2, 'El barrio debe tener al menos 2 caracteres')
    .max(100, 'El barrio no puede exceder 100 caracteres'),
  fullAddress: z.string().trim()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
});

const professionalInfoSchema = z.object({
  yearsOfExperience: z.enum(['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'], {
    errorMap: () => ({ message: 'Selecciona una opción válida de experiencia' })
  }),
  services: z.array(z.string().uuid())
    .min(1, 'Debes seleccionar al menos un servicio'),
  description: z.string().trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  availability: z.boolean(),
  websiteUrl: z.string().trim()
    .url('La URL debe ser válida')
    .or(z.literal(''))
    .optional(),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;
type ProfessionalInfoData = z.infer<typeof professionalInfoSchema>;

interface Props {
  onRegistrationComplete: () => void;
}

export default function WorkerRegistrationForm({ onRegistrationComplete }: Props) {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Array<{ id: string; name: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const personalForm = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
  });

  const professionalForm = useForm<ProfessionalInfoData>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      availability: true,
      services: [],
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, name')
          .order('name');

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Error al cargar los servicios disponibles');
      }
    };

    fetchServices();
  }, []);

  const onSubmitPersonalInfo = async (data: PersonalInfoData) => {
    setStep(2);
  };

  const onSubmitProfessionalInfo = async (data: ProfessionalInfoData) => {
    try {
      setIsSubmitting(true);
      
      if (!user) {
        throw new Error('No se encontró información del usuario');
      }

      const personalData = personalForm.getValues();

      // Register worker
      const { error: workerError } = await supabase
        .from('workers')
        .insert({
          id: user.id,
          first_name: personalData.firstName,
          middle_name: personalData.middleName || null,
          first_last_name: personalData.firstLastName,
          second_last_name: personalData.secondLastName || null,
          identification_type: personalData.identificationType,
          identification_number: personalData.identificationNumber,
          phone_number: personalData.phoneNumber,
          email: user.email,
          city: personalData.city,
          neighborhood: personalData.neighborhood,
          full_address: personalData.fullAddress,
          years_of_experience: data.yearsOfExperience,
          description: data.description,
          availability: data.availability,
          website_url: data.websiteUrl || null,
        });

      if (workerError) throw workerError;

      // Add worker services
      const workerServices = data.services.map(serviceId => ({
        worker_id: user.id,
        service_id: serviceId,
      }));

      const { error: servicesError } = await supabase
        .from('worker_services')
        .insert(workerServices);

      if (servicesError) throw servicesError;

      toast.success(
        <div className="space-y-2">
          <p className="font-semibold">¡Registro exitoso!</p>
          <p>Tu perfil ha sido creado correctamente.</p>
        </div>
      );

      onRegistrationComplete();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ha ocurrido un error durante el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <div className={`ml-4 text-sm font-medium ${
                step >= 1 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Información Personal
              </div>
            </div>
            <div className="flex-1 mx-4 h-0.5 bg-gray-200">
              <div className={`h-full bg-blue-600 transition-all duration-300 ${
                step > 1 ? 'w-full' : 'w-0'
              }`} />
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <div className={`ml-4 text-sm font-medium ${
                step >= 2 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Información Profesional
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          {step === 1 && (
            <form onSubmit={personalForm.handleSubmit(onSubmitPersonalInfo)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('firstName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Segundo Nombre <span className="text-gray-400">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('middleName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.middleName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.middleName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primer Apellido *
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('firstLastName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.firstLastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.firstLastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Segundo Apellido <span className="text-gray-400">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('secondLastName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.secondLastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.secondLastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo de Identificación *
                  </label>
                  <select
                    {...personalForm.register('identificationType')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                  {personalForm.formState.errors.identificationType && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.identificationType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Identificación *
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('identificationNumber')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.identificationNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.identificationNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    {...personalForm.register('phoneNumber')}
                    placeholder="+57"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ciudad *
                  </label>
                  <select
                    {...personalForm.register('city')}
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
                  {personalForm.formState.errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Barrio *
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('neighborhood')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.neighborhood && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.neighborhood.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección Completa *
                  </label>
                  <input
                    type="text"
                    {...personalForm.register('fullAddress')}
                    placeholder="Calle, Número, Apartamento"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {personalForm.formState.errors.fullAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {personalForm.formState.errors.fullAddress.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={professionalForm.handleSubmit(onSubmitProfessionalInfo)} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Años de Experiencia *
                  </label>
                  <select
                    {...professionalForm.register('yearsOfExperience')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar experiencia</option>
                    <option value="Menos de 1 año">Menos de 1 año</option>
                    <option value="1-3 años">1-3 años</option>
                    <option value="3-5 años">3-5 años</option>
                    <option value="Más de 5 años">Más de 5 años</option>
                  </select>
                  {professionalForm.formState.errors.yearsOfExperience && (
                    <p className="mt-1 text-sm text-red-600">
                      {professionalForm.formState.errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Servicios Ofrecidos *
                  </label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label key={service.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          value={service.id}
                          {...professionalForm.register('services')}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{service.name}</span>
                      </label>
                    ))}
                  </div>
                  {professionalForm.formState.errors.services && (
                    <p className="mt-1 text-sm text-red-600">
                      {professionalForm.formState.errors.services.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción Profesional *
                  </label>
                  <textarea
                    {...professionalForm.register('description')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe tu experiencia, habilidades y servicios..."
                  />
                  {professionalForm.formState.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {professionalForm.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">
                      Disponibilidad
                    </label>
                    <button
                      type="button"
                      onClick={() => professionalForm.setValue('availability', !professionalForm.watch('availability'))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        professionalForm.watch('availability') ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          professionalForm.watch('availability') ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {professionalForm.watch('availability')
                      ? 'Disponible para trabajar'
                      : 'No disponible temporalmente'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sitio Web <span className="text-gray-400">(Opcional)</span>
                  </label>
                  <input
                    type="url"
                    {...professionalForm.register('websiteUrl')}
                    placeholder="https://ejemplo.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {professionalForm.formState.errors.websiteUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {professionalForm.formState.errors.websiteUrl.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Completar Registro
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}