import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'About Me',
        loadComponent: async () =>
          await import('./features/about-me/about-me.component'),
      },
      {
        path: 'skills',
        title: 'My Skills',
        loadComponent: async () =>
          await import('./features/skills/skills.component'),
      },
      {
        path: 'services',
        title: 'Services',
        loadComponent: async () =>
          await import('./features/services/services.component'),
      },
      {
        path: 'works',
        title: 'My Works',
        loadComponent: async () =>
          await import('./features/works/works.component'),
      },
      {
        path: 'testimonials',
        title: 'Testimonials',
        loadComponent: async () =>
          await import('./features/testimonials/testimonials.component'),
      },
      {
        path: 'contact',
        title: 'Contact Me',
        loadComponent: async () =>
          await import('./features/contact/contact.component'),
      },
      {
        path: 'education',
        title: 'Education',
        loadComponent: async () =>
          await import('./features/education/education.component'),
      },
      {
        path: 'language',
        title: 'Languages',
        loadComponent: async () =>
          await import('./features/language/language.component'),
      },
    ],
  },
];
