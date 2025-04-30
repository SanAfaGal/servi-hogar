import { supabase } from '../config/supabase.js';

/**
 * Seed database with initial data
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Seed cities table
    const cities = [
      { name: 'Medellín' },
      { name: 'Bello' },
      { name: 'Itagüí' },
      { name: 'Envigado' },
      { name: 'Sabaneta' },
      { name: 'La Estrella' },
      { name: 'Copacabana' },
      { name: 'Girardota' },
      { name: 'Barbosa' },
      { name: 'Caldas' },
    ];
    
    console.log('Adding cities...');
    const { error: citiesError } = await supabase.from('cities').upsert(
      cities,
      { onConflict: 'name' }
    );
    
    if (citiesError) {
      throw new Error(`Failed to seed cities: ${citiesError.message}`);
    }
    
    // Seed identification types table
    const idTypes = [
      { name: 'Cédula de Ciudadanía', code: 'CC' },
      { name: 'Cédula de Extranjería', code: 'CE' },
      { name: 'Pasaporte', code: 'PP' },
    ];
    
    console.log('Adding identification types...');
    const { error: idTypesError } = await supabase.from('id_types').upsert(
      idTypes,
      { onConflict: 'name' }
    );
    
    if (idTypesError) {
      throw new Error(`Failed to seed identification types: ${idTypesError.message}`);
    }
    
    // Seed experience levels
    const experienceLevels = [
      { name: 'Menos de 1 año', order: 1 },
      { name: '1-3 años', order: 2 },
      { name: '3-5 años', order: 3 },
      { name: 'Más de 5 años', order: 4 },
    ];
    
    console.log('Adding experience levels...');
    const { error: expLevelsError } = await supabase.from('experience_levels').upsert(
      experienceLevels,
      { onConflict: 'name' }
    );
    
    if (expLevelsError) {
      throw new Error(`Failed to seed experience levels: ${expLevelsError.message}`);
    }

    // Seed services
    const services = [
      { name: 'Aire Acondicionado y Refrigeración', description: 'Instalación y mantenimiento de aires acondicionados y neveras' },
      { name: 'Albañilería y Construcción', description: 'Reparación de paredes, pisos, techos, ampliaciones' },
      { name: 'Carpintería', description: 'Fabricación y reparación de muebles, instalación de puertas y ventanas' },
      { name: 'Cerrajería', description: 'Apertura de cerraduras, cambio de chapas, instalación de cerraduras de seguridad' },
      { name: 'Electricidad', description: 'Instalaciones eléctricas, reparación de cortocircuitos, cambio de tomas e interruptores' },
      { name: 'Herrería y Soldadura', description: 'Rejas, puertas metálicas, estructuras de hierro y acero' },
      { name: 'Inspección y Diagnóstico', description: 'Detección de filtraciones, revisión estructural, estudios eléctricos' },
      { name: 'Instalaciones Tecnológicas', description: 'Cámaras de seguridad, domótica, redes de internet' },
      { name: 'Jardinería y Paisajismo', description: 'Poda de árboles, instalación de césped, diseño de jardines' },
      { name: 'Limpieza Profunda', description: 'Limpieza profunda de casas, oficinas, tanques de agua' },
      { name: 'Limpieza y Desinfección', description: 'Limpieza y desinfección general' },
      { name: 'Mecánica Automotriz a Domicilio', description: 'Cambio de aceite, baterías, reparación básica de vehículos' },
      { name: 'Pintura y Acabados', description: 'Pintura de interiores y exteriores, resane de paredes, lacado de muebles' },
      { name: 'Plomería', description: 'Reparación de fugas, instalación de tuberías, destape de desagües' },
      { name: 'Tapicería y Mantenimiento de Muebles', description: 'Reparación y limpieza de sofás, colchones, sillas' },
      { name: 'Vidriería', description: 'Instalación y reparación de vidrios, ventanas y espejos' },
    ];
    
    console.log('Adding services...');
    const { error: servicesError } = await supabase.from('services').upsert(
      services,
      { onConflict: 'name' }
    );
    
    if (servicesError) {
      throw new Error(`Failed to seed services: ${servicesError.message}`);
    }
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();