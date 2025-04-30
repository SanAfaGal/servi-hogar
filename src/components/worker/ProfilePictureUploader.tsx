import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { Camera, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface Props {
  workerId: string;
  currentPicture: string | null;
  onUpdate: (newPicture: string) => void;
}

export default function ProfilePictureUploader({ workerId, currentPicture, onUpdate }: Props) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    try {
      setUploading(true);

      // Compress image if needed
      let imageFile = file;
      if (file.size > 5 * 1024 * 1024) { // 5MB
        imageFile = await imageCompression(file, {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
      }

      // Generate a unique filename that preserves the full UUID
      const fileExtension = file.name.split('.').pop() || '';
      const timestamp = Date.now();
      const fileName = `${workerId}-${timestamp}.${fileExtension}`;

      // Upload to Supabase Storage with explicit options
      const { error: uploadError, data } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, imageFile, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Update worker profile
      const { error: updateError } = await supabase
        .from('workers')
        .update({ profile_picture: fileName })
        .eq('id', workerId);

      if (updateError) throw updateError;

      // Delete old profile picture if exists
      // if (currentPicture) {
      //   await supabase.storage
      //     .from('profile-pictures')
      //     .remove([currentPicture]);
      // }

      onUpdate(fileName);
      toast.success('Foto de perfil actualizada exitosamente');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  }, [workerId, currentPicture, onUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });
  console.log(currentPicture)
  const imageUrl = currentPicture
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${currentPicture}`
    : null;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-2 border-dashed border-blue-400 bg-blue-50' : ''
        }`}
      >
        <div className="aspect-square w-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <User className="h-20 w-20 text-gray-400" />
            </div>
          )}
        </div>
        <input {...getInputProps()} />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          {uploading ? (
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          ) : (
            <div className="text-center text-white">
              <Camera className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Haz clic o arrastra una imagen aquí</p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        {...getRootProps()}
        disabled={uploading}
        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
        <span>{uploading ? 'Subiendo...' : 'Actualizar Foto'}</span>
      </button>
    </div>
  );
}