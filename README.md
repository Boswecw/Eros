# Ἔρως Author

Official website for author Ἔρως. Built with SolidStart and optimized for Bun.

## Tech Stack

- **Framework**: [SolidStart](https://start.solidjs.com) v1.2.0
- **Runtime**: [Bun](https://bun.sh) (optimized for speed)
- **Styling**: [TailwindCSS](https://tailwindcss.com) v4.1
- **Static Site Generation**: [SolidBase](https://solidbase.kobalte.dev/)
- **TypeScript**: Full type safety

## Development

This project is optimized for Bun. Install dependencies and start development:

```bash
# Install dependencies (faster with Bun)
bun install

# Start development server
bun run dev

# Type checking
bun run typecheck
```

## Building

Build the project for production:

```bash
# Build for production (optimized for Bun runtime)
bun run build

# Preview the build
bun run preview

# Clean build artifacts
bun run clean
```

## Project Structure

```
src/
├── app.tsx              # Main app component
├── components/          # Reusable components
│   ├── Nav.tsx         # Navigation header
│   └── Footer.tsx      # Site footer
└── routes/             # File-based routing
    ├── index.tsx       # Home page
    ├── about.tsx       # About page
    ├── books.tsx       # Books listing
    ├── contact.tsx     # Contact form
    ├── newsletter.tsx  # Newsletter signup
    └── [...404].mdx    # 404 page
```

## Features

- ⚡ **Fast**: Optimized with Bun runtime
- 🎨 **Modern UI**: TailwindCSS with custom design
- 📱 **Responsive**: Mobile-first design
- 🔍 **SEO Ready**: Meta tags and prerendering
- 📝 **Forms**: Contact and newsletter forms
- 🚀 **Static Generation**: Pre-rendered for performance
