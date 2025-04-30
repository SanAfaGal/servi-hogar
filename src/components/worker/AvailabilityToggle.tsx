import React, { useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface Props {
  workerId: string;
  initialAvailability: boolean;
  onUpdate: (newAvailability: boolean) => void;
}

export default function AvailabilityToggle({ workerId, initialAvailability, onUpdate }: Props) {
  const [isAvailable, setIsAvailable] = useState(initialAvailability);
  const [updating, setUpdating] = useState(false);

  const toggleAvailability = async () => {
    try {
      setUpdating(true);
      const newAvailability = !isAvailable;

      const { error } = await supabase
        .from('workers')
        .update({ availability: newAvailability })
        .eq('id', workerId);

      if (error) throw error;

      setIsAvailable(newAvailability);
      onUpdate(newAvailability);
      toast.success(
        newAvailability
          ? 'Estado actualizado a Disponible'
          : 'Estado actualizado a No Disponible'
      );
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar la disponibilidad');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleAvailability}
        disabled={updating}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isAvailable ? 'bg-green-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isAvailable ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      <div className="flex items-center gap-2">
        {updating ? (
          <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
        ) : isAvailable ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-700">Disponible</span>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">No Disponible</span>
          </>
        )}
      </div>
    </div>
  );
}