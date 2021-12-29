/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import LoginComponent from '../Components/Auth/login';
import ThemeWrapper from '../container/themeWrapper';
import { useAuth } from '../hooks';
import adminTheme from '../styles/theme/materialClient';

// import Swal from "sweetalert2";
// import { StatusCode } from "status-code-enum";f

const schema = yup.object().shape({
  email: yup.string().required().email('Please enter a valid email'),
  password: yup.string().min(8).max(20).required(),
});

const Login = () => {
  // const { login, profile, firstLoading } = useAuth({
  //   revalidateOnMount: false,
  // });
  const { login, profile, firstLoading } = useAuth();
  // const [isLogin, setIsLogin] = useState(false);

  //   const dispatch = useDispatch();
  // console.log(isLogin);

  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && !profile?.data) {
      // setIsLogin(false);
    } else if (profile?.data) {
      router.replace('/');
    }
  }, [profile, firstLoading]);

  const { handleSubmit, control, formState } = useForm({
    mode: 'all',
    // criteriaMode: 'firstError',
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const [errorFormLogin, setErrorFormLogin] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  //   useEffect(() => {
  //     if (localStorage.getItem("token")) {
  //       const userToken = localStorage.getItem("token");
  //       const tokenObj = JSON.parse(userToken);
  //       if (!tokenObj.expiresIn) {
  //         tokenObj.expiresIn = 0;
  //       }
  //       if (new Date().getTime() >= tokenObj.expiresIn) {
  //         localStorage.removeItem("token");
  //         dispatch(actions.authentication.logout());
  //       }
  //       dispatch(actions.authentication.setAuthenticated());
  //     }
  //   }, []);

  const handleLoginSSO = () => {
    router.push(
      'https://sso.hybrid-technologies.co.jp/auth/realms/eas/protocol/openid-connect/auth?response_type=code&redirect_uri=http://localhost:9500/loginsso/&client_id=skh-dev&scope=openid%20profile'
    );
  };

  const submit = async (data: any, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoadingForm(true);
      await login(data);
      localStorage.setItem('isView', 'true');
      setIsLoadingForm(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      setErrorFormLogin('error');
    }
    // try {
    //   setLoading(true);
    //   const userData = await useFetch(`${api_url.apiEndpoint}/auth/login`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //   });
    //   setLoading(false);
    //   if (userData.message === StatusCode.SuccessOK) {
    //     if (!userData.data.accessToken) {
    //       router.push("/auth/login");
    //       Swal.fire("Token Error");
    //     } else {
    //       const { accessToken, tokenType, expiresIn } = userData.data;
    //       let tokenObj = {
    //         accessToken,
    //         tokenType,
    //         expiresIn,
    //       };
    //       const tokenObjStr = JSON.stringify(tokenObj);
    //       localStorage.setItem("token", tokenObjStr);
    //       dispatch(actions.authentication.setAuthenticated());
    //     }
    //   } else {
    //     serErrorFormLogin("Invalid account: email / password");
    //   }
    // } catch (err) {
    //   Swal.fire(`Server Error!`);
    // }
  };

  return (
    <ThemeWrapper theme={adminTheme}>
      <LoginComponent
        submit={submit}
        handleSubmit={handleSubmit}
        handleLoginSSO={handleLoginSSO}
        control={control}
        formState={formState}
        errorForm={errorFormLogin}
        isLoading={isLoadingForm}
      />
    </ThemeWrapper>
  );
};

export default Login;
