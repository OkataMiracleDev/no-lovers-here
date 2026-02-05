# NO LOVERS HERE - Design System

## 🎨 Complete Redesign from Scratch

A bold, modern, high-end event landing page with precise attention to detail.

## Color Palette

### Primary Colors
- **Hot Pink**: `#FF006B` - Primary brand color
- **Pink Accent**: `#FF4D8F` - Hover states
- **Purple**: `#A855F7` - Secondary accent
- **Purple Light**: `#C084FC` - Hover states

### Backgrounds
- **Black**: `#000000` - Main background
- **Zinc 950**: `#09090b` - Section backgrounds
- **Zinc 900**: `#18181b` - Card backgrounds

### Text
- **White**: `#ffffff` - Primary text
- **White 80%**: `rgba(255,255,255,0.8)` - Secondary text
- **White 60%**: `rgba(255,255,255,0.6)` - Tertiary text
- **White 40%**: `rgba(255,255,255,0.4)` - Muted text

## Typography

### Font Family
- Primary: `Inter, -apple-system, BlinkMacSystemFont, sans-serif`

### Font Sizes
- **Hero Headline**: `80px` (text-[80px])
- **Section Titles**: `60px` (text-6xl)
- **Subsection**: `24px` (text-2xl)
- **Body Large**: `20px` (text-xl)
- **Body**: `16px` (text-base)
- **Small**: `14px` (text-sm)
- **Tiny**: `12px` (text-xs)

### Font Weights
- **Black**: `900` (font-black) - Headlines
- **Bold**: `700` (font-bold) - Subheadings
- **Semibold**: `600` (font-semibold) - Buttons
- **Medium**: `500` (font-medium) - Labels
- **Light**: `300` (font-light) - Body text

## Button Sizes

### Primary Buttons
- **Height**: `56px` (h-14)
- **Padding**: `40px horizontal` (px-10)
- **Font**: `16px bold` (text-base font-bold)
- **Border Radius**: `12px` (rounded-xl)

### Secondary Buttons
- **Height**: `56px` (h-14)
- **Padding**: `40px horizontal` (px-10)
- **Font**: `16px semibold` (text-base font-semibold)
- **Border Radius**: `12px` (rounded-xl)

### Small Buttons (Nav)
- **Height**: `44px` (h-11)
- **Padding**: `28px horizontal` (px-7)
- **Font**: `14px bold` (text-sm font-bold)
- **Border Radius**: `8px` (rounded-lg)

### Icon Buttons
- **Size**: `48px × 48px` (w-12 h-12)
- **Border Radius**: `12px` (rounded-xl)

## Spacing System

### Section Padding
- **Vertical**: `128px` (py-32)
- **Horizontal**: `32px` (px-8)

### Card Padding
- **Large**: `40px` (p-10)
- **Medium**: `32px` (p-8)
- **Small**: `24px` (p-6)

### Gaps
- **Large**: `80px` (gap-20)
- **Medium**: `32px` (gap-8)
- **Small**: `16px` (gap-4)
- **Tiny**: `12px` (gap-3)

## Border Radius

- **Extra Large**: `24px` (rounded-3xl) - Hero images
- **Large**: `16px` (rounded-2xl) - Cards
- **Medium**: `12px` (rounded-xl) - Buttons, inputs
- **Small**: `8px` (rounded-lg) - Tags, badges
- **Full**: `9999px` (rounded-full) - Pills

## Effects

### Gradients
- **Primary**: `linear-gradient(to right, #FF006B, #A855F7)`
- **Text**: `linear-gradient(135deg, #FF006B 0%, #FF4D8F 50%, #A855F7 100%)`

### Shadows
- **Glow Pink**: `0 0 40px rgba(255, 0, 107, 0.4)`
- **Glow Purple**: `0 0 40px rgba(168, 85, 247, 0.4)`

### Borders
- **Subtle**: `1px solid rgba(255,255,255,0.1)` (border-white/10)
- **Medium**: `1px solid rgba(255,255,255,0.2)` (border-white/20)

### Backdrop
- **Blur**: `backdrop-blur-xl` - Navigation
- **Blur Soft**: `backdrop-blur-sm` - Cards

## Component Specifications

### Navigation Bar
- Height: `80px` (h-20)
- Background: `rgba(0,0,0,0.6)` with `backdrop-blur-xl`
- Border: `1px solid rgba(255,255,255,0.05)`
- Position: Fixed top

### Hero Section
- Min Height: `100vh`
- Background: Image with gradient overlay
- Padding Top: `80px` (pt-20) - Account for nav

### Ticket Cards
- Background: `#18181b` (zinc-900)
- Border: `1px solid rgba(255,255,255,0.1)`
- Border Radius: `16px` (rounded-2xl)
- Padding: `40px` (p-10)
- Glow Effect: Gradient border with blur

### Price Display
- Font Size: `112px` (text-7xl)
- Font Weight: `900` (font-black)
- Color: White

### Feature Icons
- Size: `56px × 56px` (w-14 h-14)
- Background: Gradient
- Border Radius: `12px` (rounded-xl)
- Icon Size: `32px` (text-2xl)

## Interactions

### Hover States
- Buttons: `scale-105` or `scale-[1.02]`
- Cards: `bg-white/10` (from `bg-white/5`)
- Links: Color shift to lighter variant

### Transitions
- Default: `transition-all` or `transition-colors`
- Transform: `transition-transform`
- Opacity: `transition-opacity`

### Disabled States
- Opacity: `50%` (opacity-50)
- Cursor: `not-allowed` (cursor-not-allowed)

## Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)

### Max Width
- Container: `1400px` (max-w-[1400px])

## Accessibility

- All interactive elements have proper focus states
- Color contrast meets WCAG AA standards
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
