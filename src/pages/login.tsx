import { useState } from 'react';
// import UseForm from "../hooks/useFormHook";

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { authApi } from '../api-client';
import LoginComponent from '../common/Auth/login';
import ThemeWrapper from '../container/themeWrapper';
import adminTheme from '../styles/theme/materialClient';

// import Swal from "sweetalert2";
// import { StatusCode } from "status-code-enum";f

const schema = yup.object().shape({
  email: yup.string().required().email('Please enter a valid email'),
  password: yup.string().min(8).max(20).required(),
});

const Login = () => {
  //   const dispatch = useDispatch();
  const router = useRouter();
  const { handleSubmit, control, formState } = useForm({
    mode: 'onTouched',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [errorFormLogin, serErrorFormLogin] = useState(null);
  //   const { setLoading } = FormStoreContainer.useContainer();

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

  const submit = async (data: any, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      username: data.email,
      password: data.password,
    };
    try {
      const response = await authApi.login(userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.push('/user/profile');

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
        control={control}
        formState={formState}
        errorForm={errorFormLogin}
      />
    </ThemeWrapper>
  );
};

export default Login;

// export default withAuthentication(WithFormProvider);
