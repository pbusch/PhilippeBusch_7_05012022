export interface User {
  isSelected?: boolean;
  id?: number;
  name: string;
  email: string;
  level?: number;
  isEdit?: boolean;
}

// Utilisé pour la tables des utilisateurs (menu admin)
export const UserSchema = {
  isSelected: 'isSelected',
  name: 'text',
  email: 'text',
  level: 'text',
  isEdit: 'isEdit',
};
