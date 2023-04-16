import { Formik, FormikHelpers } from "formik";
import ErrorMassage from "./ui/errorMassage";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppSelector } from "../state/hooks/hooks";
import { myError } from "../lib/error";

const Schema = yup.object().shape({
  token: yup.string().required("Required"),
  message: yup.string().required("Required"),
  content: yup.string().required("Required"),
  driveLink: yup.string().required("Required"),
  logo: yup.string().required("Required"),
});

const initialValues = {
  token: "",
  message: "",
  content: "",
  driveLink: "",
  logo: "",
};

interface Values {
  token: string;
  message: string;
  content: string;
  driveLink: string;
  logo: string;
}

export default function QueryForm({ templateId }: any) {
  const router = useRouter();
  const user: any = useAppSelector((state) => state.global.user);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
          try {
            await axios.post(
              `https://query-management-system.vercel.app/query/add`,
              {
                templateId,
                userId: user.user._id,
                ...values,
              }
            );
            setSubmitting(false);
            router.push(`/thank-you-page`);
          } catch (error) {
            myError({ error });
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6 mb-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Token
                </label>
                <input
                  type="text"
                  name="token"
                  id="token"
                  autoComplete="token"
                  placeholder="Your Token"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.token}
                  className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                    errors.token && touched.token && "border-red-500"
                  }`}
                />
                {errors.token && touched.token && (
                  <ErrorMassage>{errors.token}</ErrorMassage>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="text-sm font-medium flex flex-col text-gray-700"
                >
                  Drive Link
                  <span className="font-normal">
                    <span className="text-red-500 font-extrabold">* </span>{" "}
                    upload all your content to drive and paste the link here.
                  </span>
                </label>
                <input
                  type="link"
                  name="driveLink"
                  id="driveLink"
                  autoComplete="driveLink"
                  placeholder="Your Drive Link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.driveLink}
                  className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                    errors.driveLink && touched.driveLink && "border-red-500"
                  }`}
                />
                {errors.driveLink && touched.driveLink && (
                  <ErrorMassage>{errors.driveLink}</ErrorMassage>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Layout and Pages
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  placeholder="Provide some details about how many pages you will have to create, pages name and content etc."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                    errors.message && touched.message && "border-red-500"
                  }`}
                ></textarea>
                {errors.message && touched.message && (
                  <ErrorMassage>{errors.message}</ErrorMassage>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your content in the web-site
                </label>
                <textarea
                  name="content"
                  id="content"
                  rows={5}
                  placeholder="This includes text, images, videos, and any other media that will be displayed on the website. You will need to know what the user wants to include on each page of the website and in what format"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                    errors.content && touched.content && "border-red-500"
                  }`}
                ></textarea>
                {errors.content && touched.content && (
                  <ErrorMassage>{errors.content}</ErrorMassage>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  logo and image
                </label>
                <textarea
                  name="logo"
                  id="logo"
                  rows={5}
                  placeholder="if you have any logo or any prefrence for it please tell me into the detail and send the driver link and you don't have we will create for you"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.logo}
                  className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                    errors.logo && touched.logo && "border-red-500"
                  }`}
                ></textarea>
                {errors.logo && touched.logo && (
                  <ErrorMassage>{errors.logo}</ErrorMassage>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center px-7 py-2 bg-slate-900 text-slate-50 ${
                  isSubmitting && "bg-slate-600"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
