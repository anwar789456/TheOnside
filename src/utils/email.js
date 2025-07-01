export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name);
  // return nameRegex.test(name) && name.trim().length > 0;
};