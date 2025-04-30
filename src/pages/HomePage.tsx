import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SearchBar from '../components/home/SearchBar';
import Filters from '../components/home/Filters';
import WorkerList from '../components/home/WorkerList';

export default function HomePage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  const cities = [
    'Medellín',
    'Bello',
    'Itagüí',
    'Envigado',
    'Sabaneta',
    'La Estrella',
    'Copacabana',
    'Girardota',
    'Barbosa',
    'Caldas',
  ];

  useEffect(() => {
    loadServices();
    loadWorkers();
  }, []);

  useEffect(() => {
    loadWorkers();
  }, [searchQuery, selectedService, selectedCity, showAvailable]);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Error al cargar los servicios');
    }
  };

  const loadWorkers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('workers')
        .select(`
          *,
          worker_services!worker_id (
            services!service_id (
              id,
              name
            )
          )
        `);

      // Apply filters
      if (selectedCity) {
        query = query.eq('city', selectedCity);
      }

      if (showAvailable) {
        query = query.eq('availability', true);
      }

      if (selectedService) {
        query = query.eq('worker_services.service_id', selectedService);
      }

      if (searchQuery) {
        query = query.or(`
          first_name.ilike.%${searchQuery}%,
          first_last_name.ilike.%${searchQuery}%,
          description.ilike.%${searchQuery}%
        `);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Format worker data
      const formattedWorkers = data?.map(worker => ({
        ...worker,
        services: worker.worker_services.map((ws: any) => ws.services)
      })) || [];

      setWorkers(formattedWorkers);
    } catch (error) {
      console.error('Error loading workers:', error);
      setError('Error al cargar los trabajadores');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Encuentra profesionales confiables para tu hogar
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Conectamos hogares con los mejores trabajadores independientes
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Filters
          services={services}
          cities={cities}
          selectedService={selectedService}
          selectedCity={selectedCity}
          showAvailable={showAvailable}
          onServiceChange={setSelectedService}
          onCityChange={setSelectedCity}
          onAvailabilityChange={setShowAvailable}
        />

        <WorkerList
          workers={workers}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}