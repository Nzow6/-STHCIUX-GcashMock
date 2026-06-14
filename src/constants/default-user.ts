export interface UserCredentials {
  mobileNumber: string;
  pin: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
}

export const DEFAULT_USER: UserCredentials = {
  mobileNumber: '09171234567',
  pin: '1234',
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  email: 'juan.delacruz@email.com',
  balance: 500.00,
};
