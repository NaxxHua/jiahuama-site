# Jiahua Ma's Personal Website

Welcome to the source code of my personal website. This site showcases my work as a Design Engineer, my creative projects, and my passion for technology, design, and mixology.

Previously known as "家骅的锦绣谷 (Jiahua's Vale of Eternal Blossoms)" and hosted on WordPress, this site has been completely rebuilt with modern web technologies for better performance and user experience.

## About This Site

This is a multilingual (English/Chinese) portfolio and blog site that features:

- **Portfolio**: Professional projects including Visa Design System and PsySpace
- **Recipes**: Curated collection of cocktail recipes and cooking guides
- **Resume**: Professional experience and skills
- **Contact**: Get in touch and leave comments
- **Dark Mode**: Comfortable viewing experience day or night

## Tech Stack

### Frontend Framework

- **Astro 5.5.6** - Modern static site generator with partial hydration
- **React 18** - Interactive components (NavBar, DarkModeToggle)
- **Tailwind CSS 4** - Utility-first styling with custom dark mode support

### Features & Integrations

- **Waline Comment System** - Anonymous comments with image upload support
- **Google Analytics** - Visitor tracking and analytics
- **Responsive Design** - Optimized for desktop and mobile devices
- **Bilingual Support** - Seamless English/Chinese language switching
- **Share Functionality** - Easy link sharing for all recipe pages

### Deployment

- **Vercel** - Continuous deployment from GitHub
- **LeanCloud** - Comment database backend
- **Domain**: jiahuama.com

## Project Structure

```
jiahuama-site/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── NavBar.jsx           # Navigation with language & dark mode
│   │   ├── DarkModeToggle.jsx   # Theme switcher
│   │   ├── WalineComment.astro  # Comment system
│   │   └── ShareButton.astro    # Share functionality
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # Route pages
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro         # About me
│   │   ├── portfolio.astro     # Work showcase
│   │   ├── resume.astro        # Professional resume
│   │   ├── contact.astro       # Contact & comments
│   │   └── recipes/            # Recipe collection
│   └── styles/         # Global styles
│       └── global.css
└── public/             # Static assets

```

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/NaxxHua/jiahuama-site.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features Explained

### Multilingual Support

The site uses localStorage to remember language preferences and custom events to synchronize language changes across components. All text content includes both English and Chinese versions via data attributes.

### Dark Mode

Implemented with Tailwind CSS dark mode using class strategy. The theme preference is saved to localStorage and automatically applied on page load.

### Comment System

Powered by Waline, allowing anonymous comments with:

- Nickname and email-based authentication
- Image and GIF upload support
- Markdown formatting
- Admin moderation dashboard
- Bilingual interface

### Share Functionality

Each recipe page includes a share button that copies the current URL to clipboard with visual feedback confirmation.

## Performance

- Static site generation for optimal load times
- Lazy loading for images and components
- Minimal JavaScript for core functionality
- Optimized asset delivery via Vercel Edge Network

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is private and proprietary. All rights reserved.

## Contact

For any questions or collaboration opportunities, feel free to reach out through the contact page on the website.

---

Built with care by Jiahua Ma | Design Engineer @ Visa
