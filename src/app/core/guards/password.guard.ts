import { CanActivateFn } from '@angular/router';
import { environment } from '../../../environments/environment';

export const passwordGuard: CanActivateFn = (route, state) => {
  // Check if password has already been verified in this session
  const isAuthenticated = sessionStorage.getItem('lucky_number_auth') === 'true';

  if (isAuthenticated) {
    return true;
  }

  // Prompt user for password
  const userPassword = prompt('Enter 4-digit password to access Lucky Number:');

  if (userPassword === environment.luckyNumberPassword) {
    // Store authentication in session storage
    sessionStorage.setItem('lucky_number_auth', 'true');
    return true;
  }

  alert('Incorrect password. Access denied.');
  return false;
};
