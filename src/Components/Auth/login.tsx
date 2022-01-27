import React from 'react';

import { TextField, Typography } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

import ButtonLoading from '../../common/ButtonLoading';

// // eslint-disable-next-line react/jsx-props-no-spreading
// /* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */

function login({
  submit,
  errorForm,
  handleSubmit,
  handleLoginSSO,
  control,
  formState,
  isLoading,
}: any) {
  const { errors } = formState;
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/bg_login_page.jpg)`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* <div className="login__logo">
      <img src="/netflix_logo.png" alt="" />
    </div> */}
        <form
          onSubmit={handleSubmit(submit)}
          style={{
            background: `#D3E2E3`,
            backgroundImage: `linear-gradient(
          to top,
          rgba(211, 226, 227, 0.8) 0,
          rgba(211, 226, 227, 0) 60%,
          rgba(211, 226, 227, 0.8) 100%
        )`,
          }}
          className="w-[500px] h-[660px] box-border bg-transparent px-16 py-10 rounded-md"
        >
          <Link href="/">
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/logo_login2.png`
              }
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads/static/images/logo_login2.png`}
              alt="Logo login"
              width={360}
              height={85}
              priority
            />
          </Link>
          <div className="text-warning ml-2 mt-8">{errorForm}</div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  // inputProps={{ style: { color: 'white' } }}
                  className="loginPlaceholder bg-transparent rounded !mt-6  "
                  type={'email'}
                  error={!!errors.email}
                  variant="filled"
                  label={errors.email?.message || 'Email'}
                  placeholder="Enter your email"
                  color="primary"
                  size="medium"
                  fullWidth
                  {...field}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                // inputProps={{ style: { color: 'white' } }}
                className="placeholder-white bg-transparent rounded !mt-6"
                type="password"
                variant="filled"
                label={errors.password?.message || 'Password'}
                placeholder="Enter your password"
                color="primary"
                error={!!errors.password}
                size="medium"
                fullWidth
                {...field}
              />
            )}
          />

          <Link href="/auth/forgot-password">
            <Typography
              variant="h6"
              component="span"
              align="right"
              className="flex ml-auto w-max mt-2 text-sm tracking-wider cursor-pointer text-grayLightText"
            >
              Need help?
            </Typography>
          </Link>

          <ButtonLoading
            className="w-full mt-8 shadow-customLogin font-medium !text-white  !bg-blueRice  mx-auto rounded-full py-3 px-3 tracking-wider active:animate-jelly"
            messageLoading="Processing..."
            isLoading={isLoading}
            variant="contained"
            type="submit"
          >
            Sign in
          </ButtonLoading>

          <p className="flex items-center justify-center mt-12">
            <span className="text-grayLightText">Join as a client? </span>
            <Link href="/">
              <a className="no-underline ml-2 font-semibold text-blueRice">Join now</a>
            </Link>
          </p>
          <button
            onClick={handleLoginSSO}
            type="button"
            className="bg-blueRice uppercase text-sm text-white shadow-customLogin  w-full mx-auto rounded-full font-medium py-3 px-3 mt-12 active:animate-jelly"
          >
            Login with Gate
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
