import prismadb from "../../lib/prismadb";

async function isLoginTokenUnique(token: string) {
  try {
    const existingUser = await prismadb.user.findFirst({
      where: {
        loginToken: token,
      },
    });

    return !existingUser;
  } catch (error) {
    console.error("Error checking loginToken uniqueness:", error);
    throw error;
  }
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.toLowerCase());
};

const validatePassword = (password: string): boolean => {
  const lengthValid = password.length >= 8 && password.length <= 40;
  const uppercaseValid = /[A-Z]/.test(password);
  const lowercaseValid = /[a-z]/.test(password);
  const symbolValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return lengthValid && uppercaseValid && lowercaseValid && symbolValid;
};

const validateUsername = (username: string): boolean => {
  const lengthValid = username.length >= 4 && username.length <= 20;

  return lengthValid;
};

const removeWhitespace = (value: string): string =>
  value.toString().replace(/\s/g, "");

export {
  isLoginTokenUnique,
  validateEmail,
  removeWhitespace,
  validateUsername,
  validatePassword,
};
