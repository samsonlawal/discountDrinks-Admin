// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Formik, Form } from "formik";
// import {
//   FormFieldEmail,
//   FormFieldPassword,
// } from "@/components/layouts/auth/reusables/FormFields";
// import { FormAuthButton } from "@/components/layouts/auth/reusables/FormAuthButton";
// import { FormFieldCheckBox } from "@/components/layouts/auth/reusables/FormFields/FormFieldCheckBox";
// import {
//   authSchema,
//   authInitialValues,
//   SignInFormValues,
// } from "@/lib/auth/yupAuthSchema";
// import AuthService from "@/services/auth";
// import { useLoginUser } from "@/hooks/api/auth";

// export const SignInPageForm = () => {
//   const router = useRouter();

//   const { loading, onLogin } = useLoginUser({ Service: AuthService });
//   const submit = ({ email, password, rememberMe }: SignInFormValues) => {
//     onLogin({
//       payload: { email, password },
//       successCallback: () => router.replace("/dashboard"),
//     });
//   };

//   return (
//     <div className="mt-12 md:w-[510px] md:mx-auto">
//       <div>
//         <Formik
//           initialValues={authInitialValues.signIn}
//           validationSchema={authSchema.signIn}
//           onSubmit={submit}
//         >
//           {({ isValid }) => (
//             <Form name="signUpForm" className="flex flex-col">
//               <div className="flex flex-col gap-y-4">
//                 <FormFieldEmail
//                   fieldName="email"
//                   fieldLabel="Email Address"
//                   autoComplete="off"
//                   classInput="peer/email"
//                   classInputFocus="peer-focus/email:top-0 peer-focus/email:-translate-y-1/2 peer-focus/email:scale-75 peer-placeholder-shown/email:top-1/2 peer-placeholder-shown/email:-translate-y-1/2 peer-placeholder-shown/email:scale-100"
//                   type="email"
//                 />

//                 <FormFieldPassword
//                   fieldName="password"
//                   fieldLabel="Password"
//                   classInput="peer/password"
//                   classInputFocus="peer-focus/password:top-0 peer-focus/password:-translate-y-1/2 peer-focus/password:scale-75 peer-placeholder-shown/password:top-1/2 peer-placeholder-shown/password:-translate-y-1/2 peer-placeholder-shown/password:scale-100"
//                   type="password"
//                 />
//               </div>
//               <div className="mt-6 flex flex-col gap-y-6">
//                 <div className="flex justify-between">
//                   <FormFieldCheckBox
//                     name="rememberMe"
//                     id="rememberMe"
//                     label="Remember me"
//                   />
//                   <Link
//                     href="/auth/reset-password"
//                     className="text-base lg:text-sm font-medium font-gordita leading-[22px] text-[#111111] dark:text-white"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </div>
//                 <FormAuthButton
//                   type="submit"
//                   label="Sign In"
//                   id="signinFormButton"
//                   disabled={!isValid || loading}
//                   loading={loading}
//                 />
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

import { useLoginUser } from "@/hooks/api/auth";
import AuthService from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const SignInPageForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { loading: authLoading, onLogin } = useLoginUser({
    Service: AuthService,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

    // Basic validation
    let hasErrors = false;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    onLogin({
      payload: { email, password },
      successCallback: () => router.replace("/dashboard"),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Minimal Header */}
      {/* <header className="py-5 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <a href="index.html" className="inline-block">
            <img
              src="./assets/images/logo.svg"
              alt="Discount Drinks logo"
              width="130"
              height="31"
            />
          </a>
        </div>
      </header> */}

      {/* Main Auth Section */}
      <main className="flex-1 flex items-center py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-[1100px] mx-auto items-center">
            {/* Sign In Card */}
            <div className="bg-white rounded-2xl p-12 shadow-xl max-w-[480px] w-full mx-auto lg:mx-0">
              {/* Header */}
              <div className="text-center mb-9">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2.5">
                  Welcome Back
                </h1>
                <p className="text-gray-500 text-base leading-relaxed">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Alert Messages */}
              {alert.show && (
                <div
                  className={`flex items-center gap-3 px-5 py-4 rounded-lg mb-6 text-sm font-medium animate-slideDown ${
                    alert.type === "error"
                      ? "bg-red-50 text-red-600 border border-red-600"
                      : alert.type === "success"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-600"
                        : "bg-blue-50 text-blue-600 border border-blue-400"
                  }`}
                >
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{alert.message}</span>
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                {/* Email Field */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-900 text-sm font-medium mb-2"
                  >
                    Email Address
                    <span className="text-red-500 ml-0.5" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full h-[52px] px-12 border-2 rounded-lg text-base text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:border-teal-600 ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby="email-error"
                    />
                  </div>
                  {errors.email && (
                    <span
                      className="text-red-500 text-xs mt-1.5 font-medium block"
                      id="email-error"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-900 text-sm font-medium mb-2"
                  >
                    Password
                    <span className="text-red-500 ml-0.5" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <svg
                      className="absolute left-4 w-5 h-5 text-gray-500 pointer-events-none z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full h-[52px] px-12 border-2 rounded-lg text-base text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:border-teal-600 ${
                        errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      aria-required="true"
                      aria-describedby="password-error"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 bg-transparent border-none text-gray-500 text-xl cursor-pointer p-2 flex items-center justify-center transition-all duration-200 hover:text-gray-900 focus:outline-teal-600 focus:outline-2 focus:outline-offset-2 rounded z-10"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span
                      className="text-red-500 text-xs mt-1.5 font-medium block"
                      id="password-error"
                    >
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-900 select-none">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-[18px] h-[18px] cursor-pointer accent-teal-600"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-teal-600 text-sm font-medium no-underline transition-all duration-200 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full h-[54px] cursor-pointer text-base bg-teal-600 text-white font-medium rounded-lg transition-all duration-200 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed relative"
                >
                  {authLoading ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* Demo Credentials Info */}
              {/* <div className="bg-yellow-50 border border-yellow-400 rounded-lg px-4 py-4 mb-5">
                <p className="text-sm font-semibold text-yellow-800 mb-2">
                  Demo Credentials:
                </p>
                <p className="text-xs text-yellow-700 mb-1">
                  Email: <strong>demo@discountdrinks.com</strong>
                </p>
                <p className="text-xs text-yellow-700">
                  Password: <strong>Demo123!</strong>
                </p>
              </div> */}

              {/* Divider */}
              {/* <div className="relative text-center my-8">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
                <span className="relative bg-white px-4 text-gray-500 text-sm">
                  or
                </span>
              </div> */}

              {/* Sign Up Link */}
              {/* <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="signup.html"
                    className="text-teal-600 font-semibold no-underline transition-all duration-200 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div> */}

              {/* Security Notice */}
              {/* <div className="flex items-center justify-center gap-2 px-3 py-3 bg-gray-100 rounded-lg text-xs text-gray-500">
                <svg
                  className="w-[18px] h-[18px] text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Your information is secure and encrypted</span>
              </div> */}
            </div>

            {/* Side Image/Info (Optional) */}
            <div className="hidden lg:block">
              <div className="p-12 rounded-2xl text-gray-900 h-full">
                <h2 className="text-3xl mb-5 font-semibold">
                  Discount Drinks Admin Dashboard
                </h2>
                <p className="text-base leading-relaxed mb-10 opacity-90">
                  Track sales, monitor customers, and manage your data with
                  ease.
                </p>

                <ul className="flex flex-col gap-5">
                  <li className="flex items-center gap-3.5 text-base">
                    <svg
                      className="w-6 h-6 text-teal-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Manage Data</span>
                  </li>
                  <li className="flex items-center gap-3.5 text-base">
                    <svg
                      className="w-6 h-6 text-teal-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Track Sales</span>
                  </li>
                  <li className="flex items-center gap-3.5 text-base">
                    <svg
                      className="w-6 h-6 text-teal-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Monitor Customers</span>
                  </li>
                  <li className="flex items-center gap-3.5 text-base">
                    <svg
                      className="w-6 h-6 text-teal-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Manage Inventory</span>
                  </li>
                </ul>
              </div>

              {/* Footer */}
              <footer className="py-4 px-8 text-start bg-white">
                <div className="container mx-auto px-4">
                  <p className="text-gray-500 text-xs mb-3">
                    © 2026 Discount Drinks Dashboard. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  );
};

// export default SignIn;
