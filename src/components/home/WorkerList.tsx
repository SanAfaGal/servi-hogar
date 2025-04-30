import React from 'react';
import { Loader2 } from 'lucide-react';
import WorkerCard from './WorkerCard';

interface Props {
  workers: any[];
  loading: boolean;
  error: string | null;
}

export default function WorkerList({ workers, loading, error }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          Lo sentimos, no encontramos trabajadores que coincidan con tu búsqueda.
        </p>
        <p className="mt-2 text-gray-500">
          ¡Intenta con otros términos o ajusta los filtros!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
}