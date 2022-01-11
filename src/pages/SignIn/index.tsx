import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import { signIn } from "../../services/auth";
import {
  ContainerLogin,
  HeaderLogin,
  Login,
  MainLogin,
  SectionLogin
} from "./style";

const SignIn = () => {
  const { signed } = useContext(AuthContext);
  const toast: any = useRef(null);

  type handleSubmitProps = {
    email: string, senha: string
  }

  async function handleSubmit(data: handleSubmitProps) {
    try {
      let dataSubmit = {
        username: "marcos",
        password: "vinicius"
      }
      signIn(dataSubmit)
      // const res = await Api.post(Api.defaults.baseURL + "autenticaUsuario", {
      //   email: data.email,
      //   senha: data.senha,
      // });

      // if (res.status === 200 && res.data.authenticate === "true") {

      // if (data?.email === "admin@admin.com" && data.senha === "admin") {
      //   const dataUser = {
      //     name: "admin",
      //     email: data.email,
      //   };
      //   localStorage.setItem("@app::user", JSON.stringify(dataUser));
      // } else {
      //   toast.current.show({
      //     severity: "error",
      //     summary: "Falha na Autenticação",
      //     detail: "Email ou Senha incorreta.",
      //     life: 3000,
      //   });
      // }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SectionLogin>
      <Toast ref={toast} />
      {signed ? <Redirect to={"/app/filmes"} /> : null}
      <MainLogin>
        <ContainerLogin>
          <HeaderLogin>
            <h1 className="font white-text suave active">
              Cinemac
              <div className="divider white"></div>
            </h1>
            <p className="white-text suave condesed active">
              O gerenciador de cinemas feito para você!
            </p>
          </HeaderLogin>
          <Login>
            <FormikFormLogin onSubmit={(data: any) => handleSubmit(data)} />
          </Login>
        </ContainerLogin>
      </MainLogin>
    </SectionLogin>
  );
};

const FormikFormLogin = ({ onSubmit }: any) => {
  // const [formData, setFormData] = useState({});

  const formik: any = useFormik({
    initialValues: {
      email: "",
      senha: "",
      accept: false,
    },
    validate: (data) => {
      let errors: any = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.senha) {
        errors.senha = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      onSubmit(data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: any) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="form-demo">
      <div className="p-d-flex p-jc-center">
        <div className="card">
          <div className="loginHeader">
            {/* <img src={Logo} alt="logo cinemac" /> */}
            <h3>LOGIN</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email"),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email"),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Password
                  id="senha"
                  name="senha"
                  value={formik.values.senha}
                  onChange={formik.handleChange}
                  feedback={false}
                  toggleMask
                />
                <label
                  htmlFor="senha"
                  className={classNames({
                    "p-error": isFormFieldValid("senha"),
                  })}
                >
                  Senha*
                </label>
              </span>
              {getFormErrorMessage("senha")}
            </div>

            <Button type="submit" label="Submit" className="btn-login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
