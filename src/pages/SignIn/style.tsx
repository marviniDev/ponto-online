import styled from "styled-components";

export const SectionLogin = styled.section`
  min-height: 100vh;
  overflow: hidden;
`;
export const MainLogin = styled.main`
  min-height: 100vh;

  ::before,
  ::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  ::before {
    background-color: #000000;
    opacity: 0.3;
    z-index: 2;
  }

  ::after {
    /* background-image: url(); */
    background-position: center right;
    background-size: cover;
    z-index: 1;
    opacity: 1;
    /* filter: grayscale(1); */
  }
`;
export const ContainerLogin = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
`;
export const Login = styled.div`
  max-width: 35vh;
  background-color: white;
  z-index: 3;
  border-radius: 0.5em;
  align-items: center;
  position: relative;
  padding: 1em;
  -webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
  -moz-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
  box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);

  #loading {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
  }

  .loginHeader {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    align-items: center;
    margin: 1em 0em;
    margin-bottom: 3em;

    img {
      width: 25%;
    }
  }

  .form-demo .card {
    min-width: 100%;
  }

  .btn-login {
    background-color: #5d9fd6 !important;
  }

  .form-demo .card .p-field {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 960px) {
    .form-demo .card {
      width: 80%;
    }
  }

  @media screen and (max-width: 640px) {
    .form-demo .card {
      width: 100%;
      min-width: 0;
    }
  }
`;
export const HeaderLogin = styled.div`
  color: #ffffff;
  z-index: 3;
  display: none;
  margin-bottom: 3em;
  font-size: 2em;

  h1 {
    margin-bottom: 0.5em;
    width: fit-content;
    position: relative;

    ::after {
      content: "";
      position: absolute;
      width: 50%;
      height: 15%;
      background-color: #ffffff;
      border-radius: 1em;
    }
  }

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;
export const FormLogin = styled.form`
  z-index: 3;

  .input-fild {
    margin-bottom: 1em;
  }

  .input-fild label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    line-height: 0.875em;
    color: var(--main-fn-color1);
    padding: 0 0 0.5em 0;
  }

  .button {
    button {
      background: linear-gradient(180deg, #25c8bc 0%, #0383c4 100%);
    }
  }
`;
