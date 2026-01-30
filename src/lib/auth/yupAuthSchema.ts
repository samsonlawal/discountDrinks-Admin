import * as Yup from 'yup';

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  username: string;
  agreement?: boolean;
}

export const authInitialValues: Record<string, any> = {
  signIn: {
    email: '',
    password: '',
    rememberMe: false,
  },
  signUp: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    agreement: false,
  },
  newPassword: {
    password: '',
    confirmPassword: '',
  },
  resetPassword: {
    email: '',
  },
  otp: {
    otp: '',
  },
};
export const authSchema = {
  signIn: Yup.object({
    email: Yup.string().email('Invalid email format').required('Please enter your email'),
    password: Yup.string().required('Invalid password'),
    rememberMe: Yup.boolean().optional(),
  }),
  signUp: Yup.object({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    password: Yup.string().required('Invalid password'),
    agreement: Yup.boolean().required(),
  }),
  newPassword: Yup.object({
    password: Yup.string().required('Invalid password'),
    confirmPassword: Yup.string().required('Password does not match'),
  }),
  resetPassword: Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
  }),
  otp: Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]*$/, 'Only digits are allowed')
      .required('Please fill in all OTP fields before submitting')
      .length(4, `OTP must be exactly 4 characters long`),
  }),
};
