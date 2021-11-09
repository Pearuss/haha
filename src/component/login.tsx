// import React from 'react';

// import { TextField, Typography } from '@material-ui/core';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Controller } from 'react-hook-form';
// import { FormStoreContainer } from 'pages/auth/login';
// import ButtonLoading from '../common/ButtonLoading';

// export default function Index({ submit, errorForm }) {
//   const {
//     isLoading,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = FormStoreContainer.useContainer();

//   return (
//     <div className="bg-gradient-to-r from-white via-blue-300  to-blue-200 h-full w-full flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit(submit)}
//         className="rounded-xl flex flex-col bg-white shadow-lg max-w-[30rem] md:h-full "
//       >
//         <div
//           className="rounded-xl py-8 px-7 md:rounded-none"
//           style={{ boxShadow: 'inset 0 5px 0 0 #3F85F6' }}
//         >
//           <Link href="#">
//             <div className="w-max mx-auto cursor-pointer">
//               <Image src="/assets/logo-company.jpg" width="168" height="84" priority />
//             </div>
//           </Link>

//           <Typography align="center" variant="h6" className="mt-3">
//             Sign In to your account
//           </Typography>
//           <Typography align="center" className="text-primary">
//             {errorForm}
//           </Typography>
//           <Controller
//             name="email"
//             control={control}
//             defaultValue=""
//             render={({ field }) => ({
//               return (
//                 <TextField
//                   error={!!errors.email}
//                   variant="outlined"
//                   label={errors.email?.message || 'email'}
//                   placeholder="Enter your email"
//                   size="small"
//                   className="mt-5"
//                   fullWidth
//                   {...field}
//                 />
//               );
//             })}
//           />

//           <Controller
//             name="password"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 type="password"
//                 variant="outlined"
//                 label={errors.password?.message || 'password'}
//                 placeholder="Enter your password"
//                 size="small"
//                 error={!!errors.password}
//                 className="mt-5"
//                 fullWidth
//                 {...field}
//               />
//             )}
//           />

//           <Link href="/auth/forgot-password">
//             <Typography
//               variant="h6"
//               component="span"
//               align="right"
//               className="flex ml-auto w-max mt-6 text-base cursor-pointer font-normal text-darkBlueCustom"
//             >
//               Forgot your password?
//             </Typography>
//           </Link>

//           <ButtonLoading
//             messageLoading="Processing..."
//             isLoading={isLoading}
//             variant="contained"
//             type="submit"
//             className="rounded-3xl block mx-auto mt-5 px-5 bg-blueCustom text-white active:animate-jelly hover:animate-jelly"
//           >
//             Login
//           </ButtonLoading>

//           <p className="flex justify-center mt-12">
//             <span className="text-darkBlueCustom">You don&apos;t have an account?</span>
//             <Link href="/auth/register">
//               <a className="no-underline ml-1 font-semibold text-blueCustom">Sign up</a>
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { ReactElement } from 'react';

// interface Props {}

function login(): ReactElement {
  return <div>test</div>;
}

export default login;
