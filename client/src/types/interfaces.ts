export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  isLoggedIn?: boolean;
  userEntered?: boolean;
}
