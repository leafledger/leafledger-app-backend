import validator from 'validator';

// Function to sanitize user input
export function sanitizeInput(input: string): string {
  //  Remove any leading or trailing whitespace
  let sanitized = input.trim();

  // Sanitize potentially dangerous characters
  sanitized = validator.escape(sanitized);

  return sanitized;
}

//Sanitize Function to sanitize user object
export function sanitizeUserInput(userData: any): any {
  const sanitizedData: any = { ...userData };

  if (sanitizedData.user_name) {
    sanitizedData.user_name = sanitizeInput(sanitizedData.user_name);
  }

  if (sanitizedData.email) {
    sanitizedData.email = sanitizeInput(sanitizedData.email).toLowerCase();
  }

  if (sanitizedData.contact_no) {
    sanitizedData.contact_no = sanitizeInput(sanitizedData.contact_no);
  }

  if (sanitizedData.name) {
    sanitizedData.name = sanitizeInput(sanitizedData.name);
  }

  if (sanitizedData.store) {
    sanitizedData.store = sanitizeInput(sanitizedData.store);
  }

  if (sanitizedData.city) {
    sanitizedData.city = sanitizeInput(sanitizedData.city);
  }

  if (sanitizedData.address) {
    sanitizedData.address = sanitizeInput(sanitizedData.address);
  }

  return sanitizedData;
}
