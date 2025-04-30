import React, { useState, useEffect } from 'react';
import { Edit2, Mail, MapPin, Phone, Globe, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import PersonalInfoForm from './PersonalInfoForm';
import PersonalInfoDisplay from './PersonalInfoDisplay';
import ProfessionalInfoForm from './ProfessionalInfoForm';
import ProfilePictureUploader from './ProfilePictureUploader';
import ServicesEditor from './ServicesEditor';
import AvailabilityToggle from './AvailabilityToggle';

export default function WorkerProfile() {
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(false);
  const [editingServices, setEditingServices] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadWorkerProfile();
  }, [user]);

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
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900">Error al cargar el perfil</p>
          <p className="mt-2 text-gray-600">No se pudo encontrar la información del trabajador.</p>
        </div>
      </div>
    );
  }

  const fullName = [
    worker.first_name,
    worker.middle_name,
    worker.first_last_name,
    worker.second_last_name,
  ].filter(Boolean).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Picture & Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <ProfilePictureUploader
                workerId={worker.id}
                currentPicture={worker.profile_picture}
                onUpdate={(newPicture) => {
                  setWorker({ ...worker, profile_picture: newPicture });
                }}
              />

              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{worker.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{worker.phone_number}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{worker.city}, {worker.neighborhood}</span>
                </div>
                {worker.website_url && (
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <a
                      href={worker.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {worker.website_url}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Estado de Disponibilidad
                </h3>
                <AvailabilityToggle
                  workerId={worker.id}
                  initialAvailability={worker.availability}
                  onUpdate={(newAvailability) => {
                    setWorker({ ...worker, availability: newAvailability });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {editingPersonal ? (
              <PersonalInfoForm
                worker={worker}
                onUpdate={() => {
                  loadWorkerProfile();
                  setEditingPersonal(false);
                }}
                onCancel={() => setEditingPersonal(false)}
              />
            ) : (
              <PersonalInfoDisplay
                worker={worker}
                onEdit={() => setEditingPersonal(true)}
              />
            )}
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Información Profesional
              </h3>
              {!editingProfessional && (
                <button
                  onClick={() => setEditingProfessional(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {editingProfessional ? (
              <ProfessionalInfoForm
                worker={worker}
                onUpdate={() => {
                  loadWorkerProfile();
                  setEditingProfessional(false);
                }}
                onCancel={() => setEditingProfessional(false)}
              />
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Años de Experiencia</p>
                  <p className="mt-1 text-sm text-gray-900">{worker.years_of_experience}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">Servicios Ofrecidos</p>
                    <button
                      onClick={() => setEditingServices(true)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm">Editar Servicios</span>
                    </button>
                  </div>
                  {editingServices ? (
                    <div className="mt-4">
                      <ServicesEditor
                        workerId={worker.id}
                        currentServices={worker.services}
                        onUpdate={() => {
                          loadWorkerProfile();
                          setEditingServices(false);
                        }}
                        onCancel={() => setEditingServices(false)}
                      />
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {worker.services.map((service: any) => (
                        <span
                          key={service.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {service.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Descripción Profesional</p>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {worker.description}
                  </p>
                </div>

                {worker.website_url && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sitio Web</p>
                    <a
                      href={worker.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-blue-600 hover:underline"
                    >
                      {worker.website_url}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}