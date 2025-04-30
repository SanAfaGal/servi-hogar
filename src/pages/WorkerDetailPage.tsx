import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  Calendar,
  User,
  FileText,
  ChevronLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function WorkerDetailPage() {
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    loadWorkerDetails();
  }, [id]);

  const loadWorkerDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('workers')
        .select(`
          *,
          worker_services!inner (
            services (
              id,
              name
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        const formattedWorker = {
          ...data,
          services: data.worker_services.map((ws: any) => ws.services)
        };
        setWorker(formattedWorker);
      }
    } catch (error) {
      console.error('Error loading worker details:', error);
      setError('Error al cargar los detalles del trabajador');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/buscar"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a la búsqueda
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="relative h-48 bg-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                {worker.profile_picture ? (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${worker.profile_picture}`}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Basic Info */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{fullName}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{`${worker.city}${worker.neighborhood ? `, ${worker.neighborhood}` : ''}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  worker.availability
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {worker.availability ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Disponible</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      <span>No disponible</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{worker.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{worker.phone_number}</span>
              </div>
              {worker.website_url && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="h-4 w-4" />
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

            {/* Experience & Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Experiencia
                </h2>
                <p className="text-gray-600">{worker.years_of_experience}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Servicios
                </h2>
                <div className="flex flex-wrap gap-2">
                  {worker.services.map((service: any) => (
                    <span
                      key={service.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Descripción Profesional
              </h2>
              <p className="text-gray-600 whitespace-pre-line">{worker.description}</p>
            </div>

            {/* Certifications */}
            {worker.certifications && worker.certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Certificaciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {worker.certifications.map((cert: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{cert.name}</p>
                        <a
                          href={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/certifications/${cert.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Ver certificado
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}