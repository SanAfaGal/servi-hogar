import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Upload,
  Loader2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit2,
  X,
  Camera,
  FileText,
  Globe,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const ALLOWED_DOC_TYPES = [...ALLOWED_IMAGE_TYPES, 'application/pdf'];

const updateSchema = z.object({
  phoneNumber: z.string().trim()
    .min(10, 'El número de teléfono debe tener al menos 10 dígitos')
    .max(15, 'El número de teléfono no puede exceder 15 dígitos')
    .regex(/^[0-9+]+$/, 'El número de teléfono solo debe contener números y el símbolo +'),
  city: z.enum(['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'La Estrella', 'Copacabana', 'Girardota', 'Barbosa', 'Caldas']),
  neighborhood: z.string().trim()
    .min(2, 'El barrio debe tener al menos 2 caracteres')
    .max(100, 'El barrio no puede exceder 100 caracteres'),
  fullAddress: z.string().trim()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección no puede exceder 200 caracteres'),
  yearsOfExperience: z.enum(['Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años']),
  description: z.string().trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  websiteUrl: z.string().trim()
    .url('La URL debe ser válida')
    .or(z.literal(''))
    .optional(),
  availability: z.object({
    isAvailable: z.boolean(),
    schedule: z.array(z.object({
      day: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']),
      startTime: z.string(),
      endTime: z.string(),
    })),
  }),
});

type UpdateFormData = z.infer<typeof updateSchema>;

interface WorkerData {
  id: string;
  firstName: string;
  middleName: string | null;
  firstLastName: string;
  secondLastName: string | null;
  identificationType: string;
  identificationNumber: string;
  phoneNumber: string;
  email: string;
  city: string;
  neighborhood: string;
  fullAddress: string;
  yearsOfExperience: string;
  description: string;
  profilePicture: string | null;
  availability: {
    isAvailable: boolean;
    schedule: Array<{
      day: string;
      startTime: string;
      endTime: string;
    }>;
  };
  websiteUrl: string | null;
  certifications: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  services: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function WorkerProfile() {
  const [worker, setWorker] = useState<WorkerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
  });

  const calculateProfileCompletion = useCallback((data: WorkerData) => {
    const fields = [
      data.profilePicture,
      data.websiteUrl,
      data.certifications?.length > 0,
      data.services?.length > 0,
      data.description?.length > 100,
      data.availability?.schedule?.length > 0,
    ];

    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  }, []);

  useEffect(() => {
    loadWorkerProfile();
  }, []);

  const loadWorkerProfile = async () => {
    try {
      if (!user) throw new Error('Usuario no autenticado');

      const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .select(`
          *,
          worker_services (
            service:services (
              id,
              name
            )
          )
        `)
        .eq('id', user.id)
        .single();

      if (workerError) throw workerError;

      if (workerData) {
        const formattedWorker = {
          ...workerData,
          services: workerData.worker_services.map((ws: any) => ws.service),
        };

        setWorker(formattedWorker);
        setCompletionPercentage(calculateProfileCompletion(formattedWorker));
        reset(formattedWorker);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG o GIF.');
      }

      // Compress image if needed
      let imageFile = file;
      if (file.size > MAX_IMAGE_SIZE) {
        imageFile = await imageCompression(file, {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
      }

      // Create preview
      const preview = URL.createObjectURL(imageFile);
      setImagePreview(preview);

      // Upload to Supabase
      const fileName = `${user?.id}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Update worker profile
      const { error: updateError } = await supabase
        .from('workers')
        .update({ profile_picture: fileName })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      toast.success('Foto de perfil actualizada exitosamente');
      loadWorkerProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ALLOWED_IMAGE_TYPES,
    },
    maxSize: MAX_IMAGE_SIZE,
    multiple: false,
  });

  const onSubmit = async (data: UpdateFormData) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');

      const { error: updateError } = await supabase
        .from('workers')
        .update({
          phone_number: data.phoneNumber,
          city: data.city,
          neighborhood: data.neighborhood,
          full_address: data.fullAddress,
          years_of_experience: data.yearsOfExperience,
          description: data.description,
          website_url: data.websiteUrl,
          availability: data.availability,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success('Perfil actualizado exitosamente');
      setIsEditing(false);
      loadWorkerProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleCertificationUpload = async (files: FileList | null) => {
    if (!files?.length || !user) return;

    try {
      setUploadingCert(true);

      for (const file of Array.from(files)) {
        // Validate file type and size
        if (!ALLOWED_DOC_TYPES.includes(file.type)) {
          throw new Error('Tipo de archivo no permitido. Solo se permiten imágenes o PDF.');
        }

        if (file.size > MAX_DOC_SIZE) {
          throw new Error('El archivo excede el tamaño máximo permitido (10MB).');
        }

        const fileName = `${user.id}-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('certifications')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Update worker certifications
        const newCertification = {
          name: file.name.split('.')[0],
          url: fileName,
          type: file.type,
        };

        const { error: updateError } = await supabase
          .from('workers')
          .update({
            certifications: [
              ...(worker?.certifications || []),
              newCertification,
            ],
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      }

      toast.success('Certificaciones subidas exitosamente');
      loadWorkerProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al subir las certificaciones');
    } finally {
      setUploadingCert(false);
    }
  };

  const handleCertificationDelete = async (index: number) => {
    try {
      if (!worker?.certifications?.[index] || !user) return;

      const certification = worker.certifications[index];
      const updatedCertifications = [...worker.certifications];
      updatedCertifications.splice(index, 1);

      // Delete file from storage
      const { error: deleteError } = await supabase.storage
        .from('certifications')
        .remove([certification.url]);

      if (deleteError) throw deleteError;

      // Update worker profile
      const { error: updateError } = await supabase
        .from('workers')
        .update({ certifications: updatedCertifications })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success('Certificación eliminada exitosamente');
      loadWorkerProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la certificación');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Error al cargar el perfil</h2>
          <p className="mt-2 text-gray-600">No se pudo encontrar la información del trabajador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Completion Banner */}
      {completionPercentage < 100 && (
        <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Completa tu perfil
              </h3>
              <p className="mt-1 text-sm text-blue-600">
                Tu perfil está completo al {completionPercentage}%. Agrega más información para mejorar tu visibilidad.
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info & Photo */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative">
              <div
                {...getRootProps()}
                className={`relative rounded-lg overflow-hidden ${
                  isDragActive ? 'border-2 border-dashed border-blue-400 bg-blue-50' : ''
                }`}
              >
                {worker.profilePicture ? (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${worker.profilePicture}`}
                    alt="Foto de perfil"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <input {...getInputProps()} />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  {uploadingImage ? (
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                  ) : (
                    <div className="text-center text-white">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Haz clic o arrastra una imagen aquí</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {`${worker.firstName} ${worker.middleName || ''} ${worker.firstLastName} ${worker.secondLastName || ''}`}
              </h2>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{worker.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{worker.phoneNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{`${worker.city}, ${worker.neighborhood}`}</span>
              </div>
              {worker.websiteUrl && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <a
                    href={worker.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {worker.websiteUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Disponibilidad
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <button
                    type="button"
                    onClick={() => setValue(
                      'availability.isAvailable',
                      !watch('availability.isAvailable')
                    )}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      watch('availability.isAvailable') ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        watch('availability.isAvailable') ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {watch('availability.isAvailable') && (
                  <div className="space-y-3">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                      <div key={day} className="flex items-center gap-4">
                        <span className="w-24 text-sm text-gray-600">{day}</span>
                        <input
                          type="time"
                          {...register(`availability.schedule.${index}.startTime`)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">a</span>
                        <input
                          type="time"
                          {...register(`availability.schedule.${index}.endTime`)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${
                    worker.availability.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm text-gray-600">
                    {worker.availability.isAvailable ? 'Disponible' : 'No disponible'}
                  </span>
                </div>

                {worker.availability.isAvailable && worker.availability.schedule?.length > 0 && (
                  <div className="space-y-2">
                    {worker.availability.schedule.map((schedule, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="w-24">{schedule.day}</span>
                        <Clock className="h-4 w-4 mx-2" />
                        <span>{`${schedule.startTime} - ${schedule.endTime}`}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Professional Info & Certifications */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Información Profesional
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Años de Experiencia
                    </label>
                    <select
                      {...register('yearsOfExperience')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Menos de 1 año">Menos de 1 año</option>
                      <option value="1-3 años">1-3 años</option>
                      <option value="3-5 años">3-5 años</option>
                      <option value="Más de 5 años">Más de 5 años</option>
                    </select>
                    {errors.yearsOfExperience && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.yearsOfExperience.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sitio Web
                    </label>
                    <input
                      type="url"
                      {...register('websiteUrl')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.websiteUrl && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.websiteUrl.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción Profesional
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset(worker);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Años de Experiencia
                  </h4>
                  <p className="mt-1 text-gray-900">{worker.yearsOfExperience}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Servicios Ofrecidos
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {worker.services.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Descripción Profesional
                  </h4>
                  <p className="mt-1 text-gray-900 whitespace-pre-line">
                    {worker.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Certificaciones
              </h3>
              <div className="relative">
                <input
                  type="file"
                  id="certification-upload"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                
                  onChange={(e) => handleCertificationUpload(e.target.files)}
                  className="hidden"
                />
                <label
                  htmlFor="certification-upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  {uploadingCert ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Subir Certificación
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-4">
              {worker.certifications?.length > 0 ? (
                worker.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{cert.name}</p>
                        <p className="text-sm text-gray-500">
                          {cert.type === 'application/pdf' ? 'PDF' : 'Imagen'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/certifications/${cert.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver
                      </a>
                      <button
                        onClick={() => handleCertificationDelete(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No hay certificaciones subidas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}