# Design Guidelines: AI-Powered Note-Taking App

## Design Approach
**System-Based Approach**: Using a clean, productivity-focused design system similar to Notion and Linear. This utility-focused application prioritizes efficiency, learnability, and information hierarchy over visual flair.

## Core Design Principles
- **Clarity First**: Clean, distraction-free interface that promotes focus
- **Information Hierarchy**: Clear visual distinction between content types
- **Consistent Spacing**: Uniform spacing system for predictable layouts
- **Minimal Cognitive Load**: Intuitive navigation and organized information architecture

## Color Palette
**Light Mode:**
- Primary: 219 39% 11% (deep blue-gray for text and key elements)
- Secondary: 219 14% 71% (medium gray for secondary text)
- Background: 0 0% 100% (pure white)
- Surface: 219 13% 97% (subtle gray for cards and panels)
- Accent: 217 91% 60% (vibrant blue for CTAs and highlights)
- Success: 142 71% 45% (green for positive actions)
- Warning: 38 92% 50% (amber for attention)

**Dark Mode:**
- Primary: 219 39% 89% (light blue-gray for text)
- Secondary: 219 14% 65% (medium gray for secondary text)
- Background: 219 28% 9% (dark blue-gray)
- Surface: 219 25% 12% (slightly lighter for elevation)
- Accent: 217 91% 60% (same vibrant blue)
- Success: 142 71% 45% (same green)
- Warning: 38 92% 50% (same amber)

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, readable sans-serif
- **Monospace**: JetBrains Mono (Google Fonts) - for code snippets if needed
- **Hierarchy**: 
  - Headers: font-semibold, sizes from text-3xl to text-lg
  - Body: font-normal, text-base and text-sm
  - Captions: font-medium, text-xs

## Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, and 12
- **Micro spacing**: p-2, m-2 for tight elements
- **Standard spacing**: p-4, m-4 for general component spacing
- **Section spacing**: p-6, p-8 for larger containers
- **Page spacing**: p-12 for main content areas

## Component Library

### Navigation
- **Sidebar**: Fixed left navigation with folders and recent notes
- **Breadcrumbs**: Clear path indication for nested content
- **Search Bar**: Prominent search with keyboard shortcuts

### Note Interface
- **Editor**: Clean rich text editor with minimal toolbar
- **Note Cards**: Subtle borders, rounded corners, hover states
- **Folder Structure**: Tree-like organization with expand/collapse

### AI Study Tools
- **AI Panels**: Distinct visual treatment with subtle background tint
- **Flashcards**: Card-flip interactions with clean typography
- **Quiz Interface**: Question/answer format with progress indicators
- **Summary Blocks**: Highlighted sections with icon indicators

### Forms & Inputs
- **Text Inputs**: Clean borders, focus states with accent color
- **Buttons**: Primary (filled), secondary (outline), and ghost variants
- **Dropdowns**: Consistent with input styling

### Data Display
- **Note List**: Grid or list view with metadata (date, tags)
- **Progress Indicators**: For study sessions and quiz completion
- **Tags**: Rounded pills with muted colors

## Key Interactions
- **Hover States**: Subtle elevation and color changes
- **Focus States**: Clear accent color borders
- **Loading States**: Skeleton screens for AI processing
- **Empty States**: Helpful illustrations and clear CTAs

## Accessibility Features
- **Consistent Dark Mode**: All inputs and components maintain dark theme
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Meet WCAG guidelines for text contrast
- **Screen Reader**: Proper ARIA labels and semantic HTML

This design system creates a professional, focused environment optimized for learning and productivity while maintaining visual appeal through thoughtful use of color and typography.