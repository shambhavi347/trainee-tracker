export const validEmail = new RegExp(
  // "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  "/.+@..+\..[A-Za-z]+$/"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validPhone = new RegExp("/^[6-9]d{9}$/gi");
