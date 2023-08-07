
const creditCardValidation = {
  creditCardNumber: {
    custom: {
      isValid: (value) => {
        return (isValidString(value.replaceAll(' ', '')).length === 16);},
      message: 'Digite um número de cartão válido',
    },
  },
  creditCardName: { 
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },
  creditCardDate: {
    custom: {
      isValid: (value) => {
        if (value.length===0) return false;
        const [month, year] = value.split('/');
        if (new Date(`20${year}/${month}`) < new Date()) {
          return false;
        } 
        return true;
      },
      message: 'Digite uma data de expiração válida',
    },
  },
  creditCardCvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: 'Digite um cvc válido',
    },
  },

};
export default creditCardValidation;

function isValidString(value) {
  return value || value?.trim();
}
