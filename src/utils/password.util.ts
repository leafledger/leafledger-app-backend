// Password utility functions
export function validatePasswordComplexity(password: string): {
  isValid: boolean;
  message?: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long',
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: 'Password must be less than 128 characters',
    };
  }

  //TODO :
  // We can make it more stricter in future . Something like below to handle like (at least one uppercase, lowercase, number, special char)
  /*
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return { 
      isValid: false, 
      message: "Password must contain uppercase, lowercase, number, and special character" 
    };
  }
  */

  return { isValid: true };
}
