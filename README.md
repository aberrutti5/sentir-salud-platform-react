# Sentir Salud — Plataforma Web

Plataforma web de **Sentir Salud Capacitación**, un centro de formación y terapias holísticas especializado en Biodescodificación. Permite a los visitantes conocer los servicios, explorar cursos, leer artículos temáticos y contactar directamente por WhatsApp.

---

## Tecnologías

| Categoría | Tecnología |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Estilos | Tailwind CSS |
| Componentes UI | React Bootstrap, Lucide React |
| Animaciones | Framer Motion, React Spring |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
| Pagos | PayPal (react-paypal-js) |
| Analytics | Vercel Analytics |
| Deploy | Vercel |
| Tipografías | REM, Montserrat, Shanti (Google Fonts) |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── BlurText/          # Componente de animación de texto
│   ├── WhatsAppButton.tsx # Botón flotante de WhatsApp
│   └── WhatsAppButton.css
├── lib/
│   └── supabase.ts        # Cliente y tipos de Supabase
├── pages/
│   ├── HomePage.tsx           # Landing principal
│   ├── BioInfoPage.tsx        # Qué es la Biodescodificación
│   ├── BioSessionsPage.tsx    # Sesiones personalizadas
│   ├── CiatalgiaPage.tsx      # Artículo: Ciatalgia y Biodescodificación
│   ├── CoursePage.tsx         # Detalle de curso individual
│   ├── myCoursesPage.tsx      # Mis cursos (usuarios autenticados)
│   ├── ebookLandingPage.tsx   # Landing del ebook
│   ├── GraciasEbookPage.tsx   # Página de confirmación post-compra ebook
│   ├── OctubreSeminarioPage.tsx # Landing seminario de octubre
│   ├── LoginPage.tsx          # Inicio de sesión
│   ├── RegisterPage.tsx       # Registro de usuarios
│   ├── AdminPage.tsx          # Panel de administración
│   ├── AdminRoute.tsx         # Protección de ruta admin
│   ├── PrivateRoute.tsx       # Protección de rutas privadas
│   └── PaymentSuccessPage.tsx # Confirmación de pago
├── App.tsx   # Router principal
├── main.tsx  # Punto de entrada
└── index.css # Estilos globales y animaciones
```

---

## Rutas

| Ruta | Página | Acceso |
|---|---|---|
| `/` | HomePage | Público |
| `/bioinfo` | BioInfoPage | Público |
| `/sesionesbio` | BioSessionsPage | Público |
| `/ciatalgia` | CiatalgiaPage | Público |
| `/ebook` | ebookLandingPage | Público |
| `/ebook/gracias` | GraciasEbookPage | Público |
| `/octubreseminario` | OctubreSeminarioPage | Público |
| `/login` | LoginPage | Público |
| `/register` | RegisterPage | Público |
| `/miscursos` | myCoursesPage | Autenticado |
| `/sesionesbio` | BioSessionsPage | Autenticado |
| `/courses/:id` | CoursePage | Autenticado |
| `/admin` | AdminPage | Admin |

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables (nunca commitear este archivo):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Los valores se encuentran en el dashboard de Supabase → **Project Settings → API**.

> Sin estas variables la app igual funciona en desarrollo, mostrando datos estáticos de fallback.

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Verificar errores de TypeScript
npx tsc --noEmit

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Base de datos (Supabase)

### Tabla `carousel_slides`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | number | ID único |
| `title` | string? | Título del slide |
| `subtitle` | string? | Subtítulo |
| `image_url` | string | URL de imagen desktop |
| `mobile_image_url` | string? | URL de imagen mobile |
| `link` | string? | Enlace al hacer clic (interno o externo) |
| `show_overlay` | boolean? | Muestra degradado oscuro sobre la imagen |
| `orden` | number | Orden de aparición |

> Actualmente el carrusel usa slides estáticos definidos en `HomePage.tsx` como fallback. El primer slide no muestra texto superpuesto porque la imagen ya lo incluye.

---

## Notas de desarrollo

- **Cursos**: Los cursos disponibles ("Formación en Biodescodificación 2026" y "Maestría en Biodescodificación") están definidos estáticamente en `HomePage.tsx`. Al hacer clic abren WhatsApp con un mensaje pre-cargado al `+598 96611764`.
- **WhatsApp flotante**: El componente `WhatsAppButton` aparece en todas las páginas vía `App.tsx`.
- **Animaciones**: Las secciones usan `IntersectionObserver` (hook `useInView`) para animaciones de entrada al hacer scroll. Los fondos de la sección Servicios usan gradientes radiales animados con CSS.
- **Tipografía**: La fuente **REM** (Google Fonts) se aplica en títulos y navegación. Los textos descriptivos usan la fuente sans-serif del sistema para contraste.
