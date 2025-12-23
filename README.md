# Roohollah Khodabakhshi - Portfolio

A modern, responsive portfolio website built with Angular 17, featuring a dynamic contact form with email integration and comprehensive spam prevention.

## Features

- 🎨 Modern, responsive design with Bootstrap 5
- 📧 Contact form with email integration (EmailJS)
- 🤖 Multi-layer spam prevention (reCAPTCHA v3 + Honeypot + Rate Limiting)
- 🎯 Skills showcase with circular progress indicators
- 💼 Services carousel with technology tags
- 📱 Mobile-first responsive design
- ⚡ Lazy-loaded routes for optimal performance
- 🎭 Smooth animations and transitions

## Tech Stack

- **Framework**: Angular 17.3.0 (Standalone Components)
- **UI Library**: Bootstrap 5.3.3
- **Email Service**: EmailJS 4.4.1
- **Carousel**: ngx-owl-carousel-o
- **Icons**: Bootstrap Icons 1.11.3
- **Spam Prevention**: Google reCAPTCHA v3
- **Deployment**: GitHub Pages

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Angular CLI](https://angular.io/cli) (v17.3.4)

```bash
npm install -g @angular/cli@17.3.4
```

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Roohollah419/Roohollah-Khodabakhshi.git
cd Roohollah-Khodabakhshi
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment files** (see next section)

## Environment Configuration

The contact form requires API keys from EmailJS and Google reCAPTCHA. Follow these steps to set up:

### Step 1: Create Environment Files

Copy the example environment files:

```bash
# For production
cp src/environments/environment.example.ts src/environments/environment.ts

# For development
cp src/environments/environment.development.example.ts src/environments/environment.development.ts
```

### Step 2: Set Up EmailJS

1. **Create an EmailJS account**:
   - Visit [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (200 emails/month)

2. **Connect your Gmail account**:
   - Go to "Email Services" → "Add New Service"
   - Select Gmail
   - Connect your Gmail account (roohollah419@gmail.com or your own)

3. **Create an email template**:
   - Go to "Email Templates" → "Create New Template"
   - Use these template variables:
     ```
     From: {{from_name}} ({{from_email}})

     Message:
     {{message}}
     ```
   - Save the template

4. **Get your credentials**:
   - **Service ID**: Found in "Email Services" section
   - **Template ID**: Found in "Email Templates" section
   - **Public Key**: Found in "Account" → "General"

5. **Update environment files**:
   - Open `src/environments/environment.ts`
   - Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY` with your actual values

### Step 3: Set Up Google reCAPTCHA v3

1. **Register your site**:
   - Visit [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
   - Click "+" to create a new site
   - **Label**: "Portfolio Contact Form" (or any name)
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `roohollah-khodabakhshi.github.io` (for production)
     - `localhost` (for development)
   - Accept terms and submit

2. **Get your Site Key**:
   - After registration, copy your **Site Key**

3. **Update environment files**:
   - Open `src/environments/environment.ts`
   - Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual Site Key

4. **Update index.html**:
   - Open `src/index.html` (line 9)
   - Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual Site Key:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=YOUR_ACTUAL_SITE_KEY"></script>
   ```

### Environment File Structure

After configuration, your environment files should look like this:

```typescript
export const environment = {
  production: true,  // or false for development
  emailjs: {
    serviceId: 'service_abc123',      // Your actual Service ID
    templateId: 'template_xyz789',    // Your actual Template ID
    publicKey: 'abcd1234efgh5678'     // Your actual Public Key
  },
  recaptcha: {
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'  // Your actual Site Key
  }
};
```

⚠️ **Security Note**: Never commit your actual API keys to Git. The environment files are ignored in `.gitignore`.

## Development Server

Run the development server:

```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any source files.

## Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment to GitHub Pages

Deploy to GitHub Pages using the included script:

```bash
npm run publish
```

This command:
1. Builds the project with production configuration
2. Deploys to GitHub Pages using `angular-cli-ghpages`
3. Sets the correct base href for GitHub Pages

Your site will be available at: `https://roohollah419.github.io/Roohollah-Khodabakhshi/`

## Contact Form Features

The contact form includes multiple layers of spam prevention:

1. **Google reCAPTCHA v3**:
   - Invisible bot detection (no user interaction required)
   - Analyzes user behavior to determine if they're human

2. **Honeypot Field**:
   - Hidden field that bots typically fill out
   - Silent fail for suspected bot submissions

3. **Rate Limiting**:
   - Client-side throttling: 1 message per minute per user
   - Prevents abuse and spam flooding

4. **Enhanced Validation**:
   - Full name: Minimum 2 characters
   - Email: Valid email format with regex pattern
   - Message: Minimum 10 characters

5. **UI Feedback**:
   - Loading spinner during submission
   - Success message (auto-dismisses after 5 seconds)
   - Error messages with helpful details
   - Form reset after successful submission

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       ├── email.service.ts          # EmailJS integration
│   │       ├── recaptcha.service.ts      # reCAPTCHA v3 integration
│   │       └── rate-limiter.service.ts   # Spam prevention
│   ├── features/
│   │   ├── about-me/                     # About section
│   │   ├── contact/                      # Contact form
│   │   ├── services/                     # Services showcase
│   │   ├── skills/                       # Skills with progress indicators
│   │   ├── testimonials/                 # Client testimonials
│   │   └── works/                        # Portfolio works
│   ├── shared/
│   │   └── components/
│   │       └── main-layout/              # Main layout with navigation
│   ├── app.component.ts                  # Root component
│   ├── app.config.ts                     # App configuration
│   └── app.routes.ts                     # Routing configuration
├── environments/
│   ├── environment.ts                    # Production config (gitignored)
│   ├── environment.development.ts        # Development config (gitignored)
│   ├── environment.example.ts            # Example production template
│   └── environment.development.example.ts # Example development template
├── assets/                               # Images, videos, static files
├── index.html                            # Main HTML file
├── main.ts                               # Application entry point
└── styles.css                            # Global styles
```

## Running Tests

Run unit tests:

```bash
ng test
```

Run end-to-end tests:

```bash
ng e2e
```

## Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

For more Angular CLI commands, see [Angular CLI Overview](https://angular.io/cli).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Roohollah Khodabakhshi
- 📧 Email: roohollah419@gmail.com
- 🌍 Location: Istanbul, Turkey
- 📱 Phone: +989138970651

## Acknowledgments

- Built with [Angular](https://angular.io/)
- Styled with [Bootstrap](https://getbootstrap.com/)
- Email service by [EmailJS](https://www.emailjs.com/)
- Spam protection by [Google reCAPTCHA](https://www.google.com/recaptcha/)
