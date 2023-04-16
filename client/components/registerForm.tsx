import { Formik, FormikHelpers } from "formik";
import ErrorMassage from "./ui/errorMassage";
import * as yup from "yup";
import axios from "axios";
import { useAppDispatch } from "../state/hooks/hooks";
import { useRouter } from "next/router";
import { setUser } from "../state/features";
import Link from "next/link";
import { myError } from "../lib/error";
import { useState } from "react";

const Schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  token: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  password: "",
};

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  password: string;
}

export default function RegisterForm() {
  const [showpass, setShowPass] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
        try {
          const savedUser = await axios.post(
            `https://query-management-system.vercel.app/auth/register`,
            values
          );
          dispatch(setUser(savedUser.data));
          setSubmitting(false);
          router.push("/");
        } catch (error: any) {
          myError({ error });
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden h-full bg-white lg:grid lg:grid-cols-2"
        >
          <img
            src="/falcone-logocolor.png"
            className="w-[250px] absolute top-4 left-4"
            alt=""
          />
          <div className="flex flex-col justify-center py-14">
            <div className="w-2/3 py-5 mx-auto">
              <h1 className="text-5xl font-bold mb-2">Register Form</h1>
            </div>
            <div className="w-2/3 py-5 mx-auto">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                      errors.firstName && touched.firstName && "border-red-500"
                    }`}
                  />
                  {errors.firstName && touched.firstName && (
                    <ErrorMassage>{errors.firstName}</ErrorMassage>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                      errors.lastName && touched.lastName && "border-red-500"
                    }`}
                  />
                  {errors.lastName && touched.lastName && (
                    <ErrorMassage>{errors.lastName}</ErrorMassage>
                  )}
                </div>

                <div className="col-span-6">
                  <input
                    type="text"
                    name="token"
                    id="token"
                    autoComplete="token"
                    placeholder="Your Token"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.token}
                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                      errors.token && touched.token && "border-red-500"
                    }`}
                  />
                  {errors.token && touched.token && (
                    <ErrorMassage>{errors.token}</ErrorMassage>
                  )}
                </div>

                <div className="col-span-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                      errors.email && touched.email && "border-red-500"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <ErrorMassage>{errors.email}</ErrorMassage>
                  )}
                </div>

                <div className="col-span-6 relative flex items-center justify-center">
                  <input
                    type={showpass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                      errors.password && touched.password && "border-red-500"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <ErrorMassage>{errors.password}</ErrorMassage>
                  )}
                  <div
                    onClick={() => setShowPass(!showpass)}
                    className="absolute right-0 mt-2 mr-3 cursor-pointer"
                  >
                    <div id="show">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                          fill="#71717A"
                        />
                      </svg>
                    </div>
                    <div id="hide" className="hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-eye-off"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#27272A"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={3} y1={3} x2={21} y2={21} />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 text-right w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center w-full py-2 bg-slate-900 text-slate-50 ${
                    isSubmitting && "bg-slate-600"
                  }`}
                >
                  Submit
                </button>
              </div>
              <div className="w-2/3 mx-auto text-center">
                <Link href="/login" className="font-bold text-center">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-800">
            <img
              className="h-full w-full"
              src="assets/img/loginimg.jpg"
              alt=""
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
