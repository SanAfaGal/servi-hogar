import React, { useState, useEffect } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface Service {
  id: string;
  name: string;
}

interface Props {
  workerId: string;
  currentServices: Service[];
  onUpdate: () => void;
  onCancel: () => void;
}

export default function ServicesEditor({ workerId, currentServices, onUpdate, onCancel }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadServices();
    // Initialize selected services from current services
    setSelectedServices(new Set(currentServices.map(s => s.id)));
  }, [currentServices]);

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
      toast.error('Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const handleSave = async () => {
    if (selectedServices.size === 0) {
      toast.error('Debes seleccionar al menos un servicio');
      return;
    }

    try {
      setSaving(true);

      // Delete existing services
      const { error: deleteError } = await supabase
        .from('worker_services')
        .delete()
        .eq('worker_id', workerId);

      if (deleteError) throw deleteError;

      // Insert new services
      const workerServices = Array.from(selectedServices).map(serviceId => ({
        worker_id: workerId,
        service_id: serviceId,
      }));

      const { error: insertError } = await supabase
        .from('worker_services')
        .insert(workerServices);

      if (insertError) throw insertError;

      toast.success('Servicios actualizados exitosamente');
      onUpdate();
    } catch (error) {
      console.error('Error saving services:', error);
      toast.error('Error al actualizar los servicios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => (
          <label
            key={service.id}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedServices.has(service.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedServices.has(service.id)}
              onChange={() => toggleService(service.id)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{service.name}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Cancelar
          </div>
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Guardar Cambios
          </div>
        </button>
      </div>
    </div>
  );
}