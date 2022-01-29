import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ContainerLogin,
  HeaderLogin,
  Login,
  MainLogin,
  SectionLogin
} from "./style";

type handleSubmitProps = {
  nome: string, senha: string
}

const SignIn = () => {
  const { signed, signIn } = useAuth();
  const toast = useRef<any>(null);

  async function handleSubmit(data: handleSubmitProps) {
    try {
      await signIn(data.nome, data.senha)

      if (!signed) {
        toast.current.show({
          severity: "error",
          summary: "Falha na Autenticação",
          detail: "Nome ou senha incorretos.",
          life: 3000,
        });
      }

    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Falha na Autenticação",
        detail: "Nome ou senha incorretos.",
        life: 3000,
      });
    }
  }

  return (
    <SectionLogin>
      {signed && <Redirect to="/admin/dashboard" />}
      <Toast ref={toast} />
      <MainLogin>
        <ContainerLogin>
          <HeaderLogin>
            <h1 className="font white-text suave active">
              PH Motos
              <div className="divider white"></div>
            </h1>
            <p className="white-text suave condesed active">
              Sistema de pontos online
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
      nome: "",
      senha: "",
      accept: false,
    },
    validate: (data) => {
      let errors: any = {};

      // if (!data.nome) {
      //   errors.nome = "Email is required.";
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.nome)
      // ) {
      //   errors.nome = "Invalid email address. E.g. example@email.com";
      // }

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
            {/* <img src={LogoFundo} alt="logo ponto" /> */}
            <h3>LOGIN</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="nome"
                  name="nome"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("nome"),
                  })}
                />
                <label
                  htmlFor="nome"
                  className={classNames({
                    "p-error": isFormFieldValid("nome"),
                  })}
                >
                  nome*
                </label>
              </span>
              {getFormErrorMessage("nome")}
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
