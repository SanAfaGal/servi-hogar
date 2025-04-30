# ServiHogar

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-brightgreen)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.38.4-green)](https://supabase.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ServiHogar is a professional services marketplace that connects skilled workers with homeowners in the Medellín metropolitan area. The platform enables service providers to create profiles, showcase their expertise, and connect with potential clients.

![ServiHogar Preview](https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🔒 Secure authentication system
- 👤 Professional worker profiles
- 📱 Responsive design
- 🔍 Advanced search functionality
- 📍 Location-based services
- ⭐ Rating and review system
- 📅 Availability management
- 📄 Document verification
- 💼 Service categorization
- 📊 Admin dashboard

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Deployment**: Netlify
- **Build Tool**: Vite

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/servihogar.git
cd servihogar
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the migrations from `/supabase/migrations`
   - Set up storage buckets using the Edge Function in `/supabase/functions/setup-storage`

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
servihogar/
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/       # React context providers
│   ├── lib/           # Utility libraries and configurations
│   ├── pages/         # Page components
│   └── utils/         # Helper functions and utilities
├── supabase/
│   ├── functions/     # Supabase Edge Functions
│   └── migrations/    # Database migrations
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## API Documentation

### Authentication Endpoints

```typescript
// Sign up with email
await supabase.auth.signUp({
  email: string,
  password: string
});

// Sign in with email
await supabase.auth.signInWithPassword({
  email: string,
  password: string
});
```

### Worker Endpoints

```typescript
// Create worker profile
await supabase
  .from('workers')
  .insert([
    {
      first_name: string,
      last_name: string,
      // ... other fields
    }
  ]);

// Get worker profile
await supabase
  .from('workers')
  .select('*')
  .eq('id', workerId)
  .single();
```

Full API documentation is available in the [API Documentation](docs/API.md) file.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Testing

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run test:watch  # Run tests in watch mode
```

## Deployment

The project is automatically deployed to Netlify when changes are pushed to the main branch. Manual deployments can be triggered with:

```bash
npm run build
npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Open an issue on GitHub
- Join our [Discord community](https://discord.gg/servihogar)
- Email us at support@servihogar.co

## Acknowledgments

- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide Icons](https://lucide.dev/) for the icon system
- All our contributors and community members

## Roadmap

- [ ] Mobile application
- [ ] Payment integration
- [ ] Real-time chat
- [ ] Service scheduling
- [ ] Analytics dashboard
- [ ] Multi-language support

## Screenshots

![Worker Profile](https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
*Worker profile page showing services and reviews*

![Search Interface](https://images.pexels.com/photos/3760071/pexels-photo-3760071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
*Advanced search interface with filters*