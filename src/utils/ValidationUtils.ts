import validate from 'validate.js';
import Message from './MessageUtils';

interface Constraints {
  [key: string]: {
    presence?: {
      message: string;
    };
    numericality?: {
      notValid: string;
    };
    length?: {
      minimum?: number;
      maximum?: number;
      tooShort?: string;
      tooLong?: string;
    };
    format?: {
      pattern: RegExp;
      message: string;
    };
    equality?: {
      attribute: string;
      message: string;
    };
  };
}

const constraints: Constraints = {
  phoneNo: {
    presence: {
      message: `${Message.Errors.phoneBlank}\n${Message.Errors.phonenumberLength}`,
    },
    numericality: {
      notValid: Message.Errors.phoneInvalid,
    },
    length: {
      minimum: 6,
      maximum: 15,
      tooShort: `${Message.Errors.phoneTooShort}\n${Message.Errors.phonenumberLength}`,
      tooLong: `${Message.Errors.phoneTooLong}\n${Message.Errors.phonenumberLength}`,
    },
  },

  email: {
    presence: {
      message: Message.Errors.emailBlank,
    },
    format: {
      pattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: Message.Errors.emailValidity,
    },
  },

  firstName: {
    presence: {
      message: Message.Errors.firstNameBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.firstNameLength,
    },
    format: {
      pattern: /^[a-zA-Z\s]*$/,
      message: Message.Errors.firstNameInvalid,
    },
  },

  lastName: {
    presence: {
      message: Message.Errors.lastNameBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.lastNameLength,
    },
    format: {
      pattern: /^[a-zA-Z\s]*$/,
      message: Message.Errors.lastNameInvalid,
    },
  },

  discountCode: {
    presence: {
      message: Message.Errors.discountCodeBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.discountCodeLength,
    },
  },

  voucherCode: {
    presence: {
      message: Message.Errors.voucherCodeBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.voucherCodeLength,
    },
  },

  voucherMessage: {
    presence: {
      message: Message.Errors.voucherMessageBlank,
    },
    length: {
      maximum: 120,
      tooLong: Message.Errors.voucherMessageLength,
    },
  },

  accountName: {
    presence: {
      message: Message.Errors.accountNameBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.accountNameTooLong,
    },
  },

  bsbNo: {
    presence: {
      message: Message.Errors.bsbNoBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.bsbNoTooLong,
    },
  },

  accountNo: {
    presence: {
      message: Message.Errors.accountNoBlank,
    },
    length: {
      maximum: 30,
      tooLong: Message.Errors.accountNoTooLong,
    },
  },

  title: {
    presence: {
      message: Message.Errors.titleError,
    },
  },

  description: {
    presence: {
      message: Message.Errors.descError,
    },
  },

  vehicleMake: {
    presence: {
      message: Message.Errors.vehicleMakeError,
    },
  },

  vehicleModel: {
    presence: {
      message: Message.Errors.vehicleModelError,
    },
  },

  vehicleYear: {
    presence: {
      message: Message.Errors.vehicleYearError,
    },
  },

  vehicleRegNumber: {
    presence: {
      message: Message.Errors.vehicleRegNumberError,
    },
  },
};

/* export function validation(fieldName: string, value: any): string | null {
  const formValues: Record<string, any> = {};
  formValues[fieldName] = value === '' ? null : value;

  const formFields: Record<string, any> = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validate(formValues, formFields, {fullMessages: false});

  if (result) {
    return result[fieldName][0];
  }
  return null;
} */

interface Password_Constraints {
  confirmPassword?: {
    equality?: {
      attribute: string;
      message: string;
    };
  };
}

const PasswordConstraints: Password_Constraints = {
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: Message.Errors.pwdMisMatch,
    },
  },
};

/**
 * @return {null}
 */
export function PasswordValidate(
  password: string,
  confirmPassword: string,
): string | null {
  const result1 = validate(
    {
      password,
      confirmPassword,
    },
    PasswordConstraints,
    {fullMessages: false},
  );

  if (result1 !== null && result1 !== undefined) {
    if (result1.confirmPassword !== undefined) {
      return result1.confirmPassword[0];
    }
  }
  return null;
}
