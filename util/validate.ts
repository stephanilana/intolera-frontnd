export const emailValidate = (values: string) => {
  let errors = '';
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexTwo = /@/;

  if (values.length === 0) {
    errors = 'Email é obrigatório!';
  } else if (!regexTwo.test(values)) {
    errors = 'O caractere "@" é necessário em email!';
  } else if (!regex.test(values)) {
    errors = 'Por favor use um e-mail válido!';
  } else if (values.length > 30) {
    errors = 'O e-mail não pode ser maior que 30 caracteres!';
  }
  return errors;
};

export const passwordValidate = (values: string) => {
  let errors = '';
  const regexLetters = /^(?=.*[a-z])(?=.*[A-Z])/;
  const regexNumbers = /^(?=.*[0-9])/;

  if (values.length === 0) {
    errors = 'Senha é obrigatório!';
  } else if (!regexLetters.test(values)) {
    errors = 'Senha precisa conter ao menos 1 caractere minúsculo e 1 maiúsculo!';
  } else if (!regexNumbers.test(values)) {
    errors = 'Senha precisa conter ao menos 1 número!';
  } else if (values.length < 8) {
    errors = 'Senha precisar conter no mínimo 8 caracteres!';
  } else if (values.length > 30) {
    errors = 'Senha não pode conter mais de 30 caracteres!';
  }

  return errors;
};

export const usernameValidate = (values: string) => {
  let errors = '';
  const regexLetters = /^[a-zA-Z]+$/;

  if (values.length === 0) {
    errors = 'Usuário é obrigatório!';
  } else if (!regexLetters.test(values)) {
    errors =
      'Usuário precisa conter no mínimo 1 letra minúscula, 1 maiúscula e comente caracteres alfabéticos!';
  } else if (values.length < 5) {
    errors = 'Senha precisa conter no mínimo 5 caracteres!';
  } else if (values.length > 13) {
    errors = 'Senha não pode conter mais de 13 caracteres!';
  }

  return errors;
};
