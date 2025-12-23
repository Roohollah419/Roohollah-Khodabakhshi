// Example production environment configuration
// Copy this file to 'environment.ts' and fill in your actual API keys

export const environment = {
  production: true,
  emailjs: {
    // Get these from https://www.emailjs.com/ after creating an account
    serviceId: 'YOUR_SERVICE_ID',        // Example: 'service_abc123'
    templateId: 'YOUR_TEMPLATE_ID',      // Example: 'template_xyz789'
    publicKey: 'YOUR_PUBLIC_KEY'         // Example: 'abcd1234efgh5678'
  },
  recaptcha: {
    // Get this from https://www.google.com/recaptcha/admin
    // Use reCAPTCHA v3 and add your domain: your-cv.github.io
    siteKey: 'YOUR_RECAPTCHA_SITE_KEY'   // Example: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  }
};
