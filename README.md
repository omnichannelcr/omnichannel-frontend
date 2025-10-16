# Omnichannel UI

A modern, multilingual frontend application for omnichannel communication platforms built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

- **🌍 Internationalization** - Multi-language support (English, Spanish, French)
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🎨 Modern UI** - Beautiful components with drag-and-drop functionality
- **⚡ Performance** - Next.js 15 with App Router and React 19
- **🔧 TypeScript** - Full type safety throughout the application
- **♿ Accessibility** - Built with accessibility best practices

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Internationalization**: next-intl
- **Icons**: React Icons
- **Drag & Drop**: @dnd-kit
- **Linting**: ESLint

## 📁 Project Structure

```
omnichannel-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── login/         # Authentication
│   │   │   ├── signup/        # User registration
│   │   │   └── page.tsx       # Homepage
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── AuthHeader/        # Authentication header
│   │   ├── ChatList/          # Chat interface
│   │   ├── CustomerList/      # Customer management
│   │   ├── IntegrationCard/   # Integration cards
│   │   ├── LanguageSwitcher/  # Language selection
│   │   └── ...                # Other components
│   ├── data/                  # Static data and mock data
│   ├── i18n/                  # Internationalization config
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── messages/                  # Translation files
│   ├── en/                   # English translations
│   ├── es/                   # Spanish translations
│   └── fr/                   # French translations
├── public/                   # Static assets
└── documentation/            # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd omnichannel-ui
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the application:**
- **Frontend**: http://localhost:3000
- **English**: http://localhost:3000/en
- **Spanish**: http://localhost:3000/es
- **French**: http://localhost:3000/fr

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | Check TypeScript types |

### Development Guidelines

1. **Follow the existing code style**
2. **Run `npm run lint` before committing**
3. **Ensure all TypeScript types are correct**
4. **Update translations when adding new text**
5. **Use semantic commit messages**

## 🌍 Internationalization

The application supports multiple languages:

- **English** (en) - Default
- **Spanish** (es)
- **French** (fr)

### Adding New Languages

1. Create a new folder in `messages/` with the language code
2. Copy translation files from an existing language
3. Update `src/i18n/routing.ts` to include the new locale
4. Translate all text content

### Adding New Translations

1. Add the key-value pair to the appropriate JSON file in `messages/[locale]/`
2. Use the `useTranslations` hook in your components:
```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  return <h1>{t('welcome')}</h1>;
}
```

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling:

- **Utility-first** approach
- **Responsive design** with mobile-first breakpoints
- **Custom components** in `src/components/`
- **Global styles** in `src/app/globals.css`

### Adding New Styles

1. Use Tailwind utility classes whenever possible
2. Create custom components for reusable patterns
3. Use CSS modules for component-specific styles
4. Follow the existing design system

## 📱 Components

The application includes a comprehensive set of components:

### Layout Components
- `PublicLayout` - Public pages layout
- `Layout` - Authenticated pages layout
- `Sidebar` - Navigation sidebar
- `PublicNav` - Public navigation

### Feature Components
- `CustomerList` - Customer management interface
- `IntegrationCard` - Integration display cards
- `ChatList` - Chat interface
- `PipelineAnalytics` - Analytics dashboard

### UI Components
- `Modal` - Reusable modal component
- `LanguageSwitcher` - Language selection
- `GoogleAuthButton` - Google authentication

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Next.js Configuration

The application uses Next.js 15 with:
- **App Router** for routing
- **Standalone output** for deployment
- **Image optimization** with remote patterns
- **Internationalization** with next-intl

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms

1. **Build the application:**
```bash
npm run build
```

2. **Start the production server:**
```bash
npm run start
```

## 📊 Performance

The application is optimized for performance:

- **Next.js 15** with latest optimizations
- **React 19** with improved rendering
- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Static generation** where possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all TypeScript types are correct
4. Update translations when adding new text
5. Test on multiple screen sizes
6. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the UI library
- Tailwind CSS team for the utility-first CSS framework
- next-intl team for internationalization support
- All contributors and maintainers