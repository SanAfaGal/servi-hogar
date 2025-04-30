import React from 'react';
import { MapPin, Calendar, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
}

interface Worker {
  id: string;
  first_name: string;
  middle_name: string | null;
  first_last_name: string;
  second_last_name: string | null;
  city: string;
  profile_picture: string | null;
  availability: boolean;
  years_of_experience: string;
  services: Service[];
}

interface Props {
  worker: Worker;
}

export default function WorkerCard({ worker }: Props) {
  const fullName = [
    worker.first_name,
    worker.middle_name,
    worker.first_last_name,
    worker.second_last_name,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="aspect-[4/3] relative">
        {worker.profile_picture ? (
          <img
            src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${
              worker.profile_picture
            }`}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-400">
              {fullName.charAt(0)}
            </span>
          </div>
        )}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
            worker.availability
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {worker.availability ? 'Disponible' : 'No disponible'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{fullName}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{worker.city}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{worker.years_of_experience}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {worker.services.length} servicio
              {worker.services.length !== 1 ? 's' : ''} disponible
              {worker.services.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {worker.services.slice(0, 3).map((service) => (
            <span
              key={service.id}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {service.name}
            </span>
          ))}
          {worker.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              +{worker.services.length - 3} más
            </span>
          )}
        </div>

        <Link
          to={`/trabajador/${worker.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}