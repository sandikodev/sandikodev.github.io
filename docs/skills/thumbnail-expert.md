# Skill: Thumbnail & Featured Image Expert

Standard for creating high-quality, informative, and technical thumbnails for the Sandikodev blog.

## 1. Core Principles

- **No AI Slop**: Absolutely avoid generic, over-stylized AI art (plastic skin, excessive neon, nonsensical details).
- **YouTube-Style Informativeness**: The image must act as a visual hook that clearly communicates the article's value proposition.
- **Authenticity**: Use real-world technical assets (screenshots, hardware, code) as the foundation.
- **Compositional Hierarchy**: Clear focal point + bold typography.

## 2. Visual Guidelines

### Typography

- **Fonts**: Use bold, modern sans-serif fonts (e.g., Inter, Montserrat, JetBrains Mono).
- **Scale**: Extremely large for the main hook. Should be readable at 10% zoom.
- **Contrast**: Use high-contrast colors (White on Dark, Black on Bright Yellow/Orange).
- **Wording**: Max 4 words. Use power words or technical terms.

### Imagery Style

- **Product/Tech Photography**: Clean, photorealistic, moody lighting (Chiaroscuro).
- **Minimalist Vector**: Flat design with subtle gradients.
- **Technical Blueprints**: Schematic-style illustrations with thin lines.
- **UI/UX Elements**: Beautiful code snippets, terminal prompts, or window frames.

### Color Palette (Sandikodev Brand)

- **Primary**: Deep Blue (#0078d4), System Gray (#1f1f1f), Pure White (#ffffff).
- **Accents**: Ubuntu Orange (#e95420), Svelte Red (#ff3e00), Terminal Green (#51cf66).

## 3. Composition Patterns

| Pattern                  | Use Case                  | Description                                             |
| :----------------------- | :------------------------ | :------------------------------------------------------ |
| **Split Comparison**     | X vs Y articles           | 50/50 split with a clear vs symbol in the middle.       |
| **The Focal Object**     | Hardware/Software reviews | One high-res object in the center with floating labels. |
| **Action Screenshot**    | Tutorials/Workflow        | A browser/terminal window showing a successful output.  |
| **Conceptual Blueprint** | Architecture/Philosophy   | A technical diagram simplified for visual clarity.      |

## 4. Prompt Engineering for Base Visuals (Anti-Slop)

When using AI generation tools, use these modifiers:

- `Photorealistic product photography of [object], cinematic lighting, shallow depth of field, 8k resolution, minimalist background.`
- `Clean technical illustration of [concept], flat design, vector art style, muted color palette, high contrast.`
- `Isometric view of [system], blueprint style, thin lines, cyan and white color scheme.`
- `EXCLUDE: glowing particles, neon cityscapes, generic robots, plastic textures, messy details.`

## 5. Execution Steps

1.  **Analyze Content**: Identify the core technical conflict or value.
2.  **Select Pattern**: Choose between Comparison, Focal Object, or Action.
3.  **Generate/Select Base**: Use real assets or high-quality AI-generated photography (not slop).
4.  **Overlay Text**: Add bold, punchy headings following the Hierarchy rules.
5.  **Export**: Optimize for web (webp/png) and place in `public/images/blog/`.
