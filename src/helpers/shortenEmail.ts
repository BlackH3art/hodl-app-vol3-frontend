export const shortenEmail = (givenEmail: string) => {

  const email = givenEmail.trim();

  const atIndex = email.indexOf("@");

  const firstPart = email[0] + email[1] + ".." + email[atIndex - 1];
  const secondPart =  email.slice(atIndex + 1, email.length).length <=  5 ? (
      email.slice(atIndex + 1)
  ) : (
      email[atIndex + 1] + ".." + email.slice(email.length - 5, email.length)
  );

  return `${firstPart}${email[atIndex]}${secondPart}`;
}