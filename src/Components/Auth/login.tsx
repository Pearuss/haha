import React from 'react';

import { TextField, Typography } from '@material-ui/core';
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
        // backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
        backgroundImage: `url(https://jobs.hybrid-technologies.vn/wp-content/uploads/2021/08/1.png)`,
      }}
      className="relative h-screen bg-cover bg-no-repeat bg-center"
    >
      <div
        style={{
          background: `rgba(0, 0, 0, 0.4)`,
          backgroundImage: `linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0,
          rgba(0, 0, 0, 0) 60%,
          rgba(0, 0, 0, 0.8) 100%
        )`,
        }}
        className="flex items-center justify-center w-full h-full"
      >
        {/* <div className="login__logo">
      <img src="/netflix_logo.png" alt="" />
    </div> */}
        <form
          onSubmit={handleSubmit(submit)}
          className="w-[500px] h-[660px] box-border bg-lightBlack px-16 py-14 rounded-md"
        >
          <h1 className="text-3xl p-2 text-white w-full font-bold">Sign In</h1>
          <div>{errorForm}</div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  inputProps={{ style: { color: 'white' } }}
                  className="loginPlaceholder bg-lightGray rounded-md !mt-6 !text-white "
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
                inputProps={{ style: { color: 'white' } }}
                className="placeholder-white bg-lightGray rounded-md !mt-6"
                type="password"
                variant="filled"
                label={errors.password?.message || 'Password'}
                placeholder="Enter your password"
                size="medium"
                color="primary"
                error={!!errors.password}
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
            className="w-full mt-8 p-3 bg-darkRed !text-white font-medium"
            messageLoading="Processing..."
            isLoading={isLoading}
            variant="contained"
            type="submit"
          >
            Sign in
          </ButtonLoading>

          <p className="flex items-center justify-center mt-12">
            <span className="text-grayText">Join as a client? </span>
            <Link href="/">
              <a className="no-underline ml-2 font-semibold text-white">Join now</a>
            </Link>
          </p>
          <button
            onClick={handleLoginSSO}
            type="button"
            className="bg-lightGray text-grayText w-full mx-auto rounded-full font-medium py-3 px-3 mt-12"
          >
            Login with Gate
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
