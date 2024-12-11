import { Routes } from '@angular/router';
import AboutMeComponent from './features/about-me/about-me.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent,
    children: [
      {
        path: '',
        title: 'About Me',
        loadComponent: async () =>
          await import('./features/about-me/about-me.component'),
      },
    ],
  },
];
