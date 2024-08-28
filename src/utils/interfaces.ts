type ToastType = {
  SUCCESS: 'success';
  ERROR: 'error';
  FAIL: 'fail';
};
export interface ToastOptions {
  type: ToastType;
  position: 'top' | 'bottom';
  text1?: string;
  text2: string;
  visibilityTime: number;
  autoHide: boolean;
  topOffset: number;
  bottomOffset: number;
  onShow?: () => void;
  onHide?: () => void;
}
export interface User {
  id: number;
  name: string;
  email: string;
  // Add more properties as needed
}

export enum Role {
  User = 'user',
  Model = 'model',
}

export interface Message {
  text: string;
  role: Role;
  image?: string;
  loading?: boolean;
}