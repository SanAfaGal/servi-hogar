import React from 'react';
import { Edit2, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

interface Props {
  worker: {
    first_name: string;
    middle_name: string | null;
    first_last_name: string;
    second_last_name: string | null;
    identification_type: string;
    identification_number: string;
    email: string;
    phone_number: string;
    city: string;
    neighborhood: string;
    full_address: string;
  };
  onEdit: () => void;
}

export default function PersonalInfoDisplay({ worker, onEdit }: Props) {
  const fullName = [
    worker.first_name,
    worker.middle_name,
    worker.first_last_name,
    worker.second_last_name,
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Información Personal
        </h3>
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 transition-colors"
          title="Editar información personal"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
          <p className="mt-1 text-sm text-gray-900">{fullName}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
          <div className="mt-1 flex items-center text-sm text-gray-900">
            <Mail className="h-4 w-4 text-gray-400 mr-2" />
            <span>{worker.email}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Identificación</p>
          <div className="mt-1 flex items-center text-sm text-gray-900">
            <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
            <span>
              {worker.identification_type}: {worker.identification_number}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Teléfono</p>
          <div className="mt-1 flex items-center text-sm text-gray-900">
            <Phone className="h-4 w-4 text-gray-400 mr-2" />
            <span>{worker.phone_number}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Ciudad</p>
          <p className="mt-1 text-sm text-gray-900">{worker.city}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Barrio</p>
          <p className="mt-1 text-sm text-gray-900">{worker.neighborhood}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-500">Dirección</p>
          <div className="mt-1 flex items-center text-sm text-gray-900">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{worker.full_address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}