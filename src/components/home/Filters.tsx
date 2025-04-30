import React from 'react';
import { Filter } from 'lucide-react';

interface Props {
  services: Array<{ id: string; name: string }>;
  cities: Array<string>;
  selectedService: string;
  selectedCity: string;
  showAvailable: boolean;
  onServiceChange: (service: string) => void;
  onCityChange: (city: string) => void;
  onAvailabilityChange: (available: boolean) => void;
}

export default function Filters({
  services,
  cities,
  selectedService,
  selectedCity,
  showAvailable,
  onServiceChange,
  onCityChange,
  onAvailabilityChange,
}: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <Filter className="h-5 w-5" />
        <h2 className="text-lg font-medium">Filtros</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servicio
          </label>
          <select
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todos los servicios</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas las ciudades</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={(e) => onAvailabilityChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-700">
              Solo disponibles
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}