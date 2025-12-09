# Design Philosophy: Dual Design System

## Vision

Menciptakan pengalaman web yang unik dengan menyediakan dua sistem desain yang berbeda secara fundamental, memberikan pengguna kebebasan untuk memilih preferensi visual mereka.

## Why Two Design Systems?

### 1. Menjangkau Pengalaman Pengguna yang Lebih Luas
- **Design System V1 (Blog Theme)**: Untuk pembaca yang menginginkan pengalaman membaca yang nyaman dan profesional
- **Design System V2 (Terminal Theme)**: Untuk enthusiast yang menyukai estetika minimal, retro, dan customizable

### 2. Memperkenalkan Dunia Geek kepada Awam
Banyak orang menganggap dunia Linux, terminal, dan tiling window manager sebagai sesuatu yang menakutkan atau terlalu teknis. Dengan Design System V2, kita:
- Mensimulasikan antarmuka sistem operasi minimal (i3/sway tiling window manager)
- Menampilkan estetika terminal retro yang customizable
- Membuktikan bahwa "geek world" sebenarnya accessible dan menyenangkan
- Memberikan playground untuk ricing (customization) tanpa perlu install Linux

### 3. Inspirasi dan Edukasi
Design System V2 berfungsi sebagai:
- **Simulator antarmuka sistem operasi**: Pengalaman i3wm/sway tanpa perlu install
- **Miniatur v0.dev**: Playground untuk eksperimen UI/UX
- **Showcase ricing**: Demonstrasi berbagai tema (Tokyo Night, Dracula, Gruvbox, Nord, Matrix)
- **Learning tool**: Memperkenalkan konsep tiling window manager, keyboard shortcuts, dan workflow minimal

## Implementation Strategy

### Default Experience
- **Design System V1** sebagai default untuk first-time visitors
- Clean, professional, dan familiar untuk mayoritas pengguna

### User Choice
- Toggle button untuk beralih ke Design System V2
- Preferensi tersimpan di browser localStorage
- Pengalaman konsisten di setiap kunjungan

### Technical Separation
- Attribute-based scoping: `data-theme-mode="blog"` vs `data-theme-mode="terminal"`
- Font isolation: Inter+Georgia untuk V1, Fira Code untuk V2
- CSS variable scoping untuk mencegah konflik
- Modular component architecture

## Target Audience

### Design System V1 Users
- Pembaca blog yang fokus pada konten
- Profesional yang mencari informasi
- Pengguna mobile yang menginginkan UX familiar

### Design System V2 Users
- Linux enthusiasts dan power users
- Developer yang suka customization
- Orang yang penasaran dengan tiling window manager
- Ricing community
- Siapa saja yang ingin pengalaman berbeda

## Philosophy in Action

> "Dunia geek tidak semenyeramkan yang dibayangkan. Dengan tools yang tepat dan interface yang approachable, siapa saja bisa menikmati estetika dan workflow minimal yang powerful."

Dengan dual design system ini, sandikodev.github.io menjadi:
1. **Blog profesional** untuk berbagi pengetahuan
2. **Playground interaktif** untuk eksplorasi UI/UX
3. **Educational tool** untuk memperkenalkan Linux/terminal culture
4. **Personal statement** tentang fleksibilitas dan user empowerment

## Future Possibilities

- Lebih banyak tema untuk Design System V2
- Custom theme builder (user-defined colors)
- Keyboard shortcut customization
- Window layout presets
- Integration dengan actual terminal commands (read-only)
- Community-contributed themes

---

**Kesimpulan**: Dual design system bukan hanya tentang estetika, tapi tentang memberikan pilihan, edukasi, dan membuka pintu ke dunia yang mungkin belum pernah dijelajahi pengguna sebelumnya.
