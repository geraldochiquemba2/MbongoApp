# Mbongo Investment Platform - Design Guidelines

## Design Approach
**Hybrid Reference-Based Approach** drawing from:
- **Nubank/Revolut**: Modern fintech aesthetics with bold colors and clarity
- **Trading platforms**: Professional data displays with trust-building elements
- **Educational platforms**: Accessible learning interfaces with visual progression

**Core Principles**: Credibilidade profissional, acessibilidade educativa, modernidade sem frieza tecnológica

## Color Palette

### Primary Colors (Blue Identity)
- **Mbongo Primary Blue**: 215 85% 45% - Main brand color from logo
- **Deep Blue**: 215 75% 35% - Headers, primary CTAs
- **Light Blue**: 215 65% 92% - Backgrounds, cards (light mode)

### Dark Mode
- **Dark Background**: 220 25% 10%
- **Card Background**: 220 20% 15%
- **Primary Blue Dark**: 215 75% 55% - Adjusted for dark mode

### Functional Colors
- **Success Green**: 145 65% 45% - Positive returns, growth
- **Alert Orange**: 35 85% 55% - IPO alerts, important notices
- **Danger Red**: 0 70% 50% - Risk warnings, losses
- **Neutral Gray**: 215 15% 65% - Secondary text

## Typography

**Font Stack**: 'Inter' (primary), 'Plus Jakarta Sans' (headings) via Google Fonts
- **H1**: 2.5rem (40px), font-weight 700, tracking tight
- **H2**: 2rem (32px), font-weight 600
- **H3**: 1.5rem (24px), font-weight 600
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **Small/Captions**: 0.875rem (14px), font-weight 400
- **Data Display**: 1.25rem (20px), font-weight 600, tabular-nums

## Layout System

**Spacing Primitives**: Tailwind units 2, 4, 6, 8, 12, 16, 20 (p-2, p-4, gap-6, m-8, etc.)
- **Section Padding**: py-16 (desktop), py-12 (mobile)
- **Card Padding**: p-6 to p-8
- **Grid Gaps**: gap-6 to gap-8
- **Container**: max-w-7xl with px-4 to px-8

## Component Library

### Navigation
- Top navbar: Sticky, backdrop-blur-lg with bg-opacity-95
- Logo placement with blue accent
- Clear menu structure: Aprender | Produtos | Simular | Notícias
- "Quero Começar" CTA button prominently placed

### Hero Section
- Full-width with blue gradient overlay (215 85% 45% to 215 65% 35%)
- Bold headline sobre investimentos inteligentes
- Primary CTA "Começar Agora" + Secondary "Ver Produtos"
- Trust indicators: "Informação oficial BODIVA/CMC"

### Cards & Data Display
- Elevated cards with subtle shadows (shadow-lg)
- Border radius: rounded-xl to rounded-2xl
- Product cards: Compact info with clear pricing in AOA
- Dashboard tiles: Real-time data with trend indicators (↑↓)
- Hover states: Slight scale (hover:scale-105) com transition-transform

### Forms & Calculators
- Clean input fields with labels above
- Blue accent on focus states
- Real-time calculation displays
- Visual feedback: Loading states, success checkmarks
- Sliders para valores com visual feedback

### Charts & Visualizations
- Line charts for growth projections (Chart.js or Recharts)
- Bar charts for comparisons
- Color-coded: Blue (investment), Green (growth), Orange (alerts)
- Responsive with touch interactions

### Interactive Elements
- Quiz cards for Teste de Risco with progressive disclosure
- Step indicators for Guia de 5 Passos (1→5 visual progress)
- Accordion panels for educational content
- Modal overlays for detailed empresa information

### Buttons
- Primary: Bold blue (bg-[215_85%_45%]) with white text
- Secondary: Outline with blue border
- Tertiary: Text links with blue color
- States: Clear hover/active feedback

## Animations & Transitions

**Sparingly Applied**:
- Page transitions: Subtle fade-in (200ms ease)
- Card hover: transform scale (150ms ease-out)
- Number counters: Animated increment for statistics
- Chart loading: Smooth draw-in animation
- Scroll-triggered: Fade-up for sections (intersection observer)

**Forbidden**: Excessive parallax, spinning elements, distracting micro-animations

## Images

**Strategic Placement**:
- **Hero**: Professional image of pessoas angolanas planejando finances or modern skyline de Luanda with blue overlay (60% opacity)
- **Feature Sections**: Icons/illustrations for educational steps (custom or from unDraw em azul)
- **Trust Section**: Logos parceiros (bancos/corretoras) em grid
- **No generic stock photos** - prefer illustrations or real Angola context

## Accessibility

- WCAG AA contrast ratios maintained
- Focus indicators visible (blue ring)
- Screen reader friendly labels
- Keyboard navigation support
- Dark mode toggle with system preference detection

## Page-Specific Guidelines

**Homepage**: Hero + 4 feature blocks (Aprender, Ver, Simular, Conectar) + Notícias recentes + CTA footer

**Produtos Page**: Filterable table/grid, real-time cotações, detailed modals

**Calculadoras**: Clean form layout, result visualization, share functionality

**Educational Pages**: Step-by-step progression, visual diagrams, interactive quizzes