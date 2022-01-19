import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Timer } from "../../../assets/Icons";
import { useAuth } from "../../../contexts/AuthContext";
import { Api } from "../../../services/api";
import { Container } from "./style";
// import './DataTableDemo.css';

function Movie() {
  return (
    <Container>
      <TableComponent {...{ url: "listaFilmes" }} />
    </Container>
  );
}

export default Movie;

const TableComponent = ({ url }) => {
  let emptyMovie = {
    id: 0,
    hierarchy : 0,
    name : "",
    password : "",
    image : "",
    extras : 0,
    active : null,
    created_at : "",
    hours: 0,
    minuts: 0
  };

  const [movies, setMovies] = useState([]);
  const [modalRegister, setModalRegister] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditExtra, setModalEditExtra] = useState(false);
  const [movie, setMovie] = useState(emptyMovie);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [image, setImage] = useState(null);
  const {user} = useAuth()

  useEffect(() => {
    async function loadData(){
      try {
        let response = await Api.get("/users");
        response.data && setMovies(response.data)
      } catch (e) {
        return null
      }
    }

    loadData()
  }, [submitted, url]);

  const newMovie = () => {
    setMovie(emptyMovie);
    setSubmitted(false);
    setModalRegister(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setModalRegister(false);
  };

  const hideModalEditExtra = () => {
    setModalEditExtra(false);
  };

  const hideModalDelete = () => {
    setModalDelete(false);
  };

  const saveFilme = async () => {
    setSubmitted(true);

    if (
      movie.name.trim() &&
      movie.password.trim() &&
      movie.image != null &&
      movie.hierarchy != null
    ) {
      let _movie = { ...movie };
      if (movie.id) {
        let res = await Api.post("/updateUser", {
          id:  _movie.id,
          name: _movie.name,
          image: _movie.image,
          password: _movie.password,
        });

        if (res.data && res.data.save === "true") {
          toast.current.show({
            severity: "success",
            summary: "Tudo certo!",
            detail: res.data.message ?? "Editado com sucesso!",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo deu errado!",
            detail: res.data.message ?? "Falha ao editar!",
            life: 3000,
          });
        }

        setSubmitted(false);
      } else {
        let res = await Api.post("/user", {
          name: _movie.name,
          image: _movie.image,
          password: _movie.password,
          hierarchy: _movie.hierarchy,
        });

        if (res.data && res.data.save === "true") {
          toast.current.show({
            severity: "success",
            summary: "Tudo certo!",
            detail: res.data.message ?? "Cadastrado com sucesso!",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Algo deu errado!",
            detail: res.data.message ?? "Falha ao cadastrar",
            life: 3000,
          });
        }
      }

      setSubmitted(false);
      setModalEditExtra(false);
      setMovie(emptyMovie);
    }
  };

  const saveExtra = async()=>{
    if (movie.hours == undefined) {
      movie.hours = 0
    }else{
      movie.hours = parseInt(movie.hours)
    }

    if (movie.minuts == undefined) {
      movie.minuts = 0
    }else{
      movie.minuts = parseInt(movie.minuts)
    }

    const response = await Api.post("/handleExtra", {id: user?.id, extra: movie.hours * 60 + movie.minuts})
        const data = response.data

        if (data.score) {
            toast.current.show({
                severity: "success",
                summary: "Tudo certo!",
                detail: data.message,
                life: 3000,
            });
        } else {
            toast.current.show({
                severity: "error",
                summary: "Algo deu errado!",
                detail: data.message,
                life: 3000,
            });
        }

        setSubmitted(false);
        setModalRegister(false);
        setMovie(emptyMovie);
  }

  const editExtra = (movie) => {
    setMovie({ ...movie });
    setModalEditExtra(true);
  };

  const editMovie = (movie) => {
    setMovie({ ...movie });
    setImage(movie.image);
    setModalRegister(true);
  };

  const confirmModalDelete = (movie) => {
    setMovie(movie);
    setModalDelete(true);
  };

  const deleteFilme = async () => {
    let res = await Api.delete(
      Api.defaults.baseURL + `/user/${movie.id}`
    );

    if (res.data && res.data.deleted === "true") {
      toast.current.show({
        severity: "success",
        summary: "Tudo certo!",
        detail: res.data.message ?? "Excluido com sucesso!",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Algo deu errado!",
        detail: res.data.message ?? "Falha ao excluir!",
        life: 3000,
      });
    }

    setSubmitted(!submitted);
    setModalDelete(false);
    setMovie(emptyMovie);
  };

  const converter = (minutos) => {
    console.log(minutos);
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    const textoHoras =`00${horas}`.slice(-2);
    const textoMinutos = `00${min}`.slice(-2);

    return {
      textoHoras,
      textoMinutos
    };
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    const _movie = { ...movie };

    console.log(e.target.getAttribute('id'));

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        _movie[`${name}`] = e.target.result;
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
        _movie[`${name}`] = val;
    }

    setMovie(_movie);
  };

  const RightToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={newMovie}
        />
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        style={{ width: "100px" }}
        src={`${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="movie-image"
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon={Timer}
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editExtra(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editMovie(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmModalDelete(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          autoComplete="off"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const modalRegisterFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveFilme}
      />
    </>
  );

  const modalEditExtraFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideModalEditExtra}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveExtra}
      />
    </>
  );

  const modalDeleteFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideModalDelete}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteFilme}
      />
    </>
  );

  const duracaoBodyTemplate = (rowData) => {
    return (
      <span
        style={{
          fontWeight: "bold",
          background: "#F77F00",
          padding: ".5em",
          borderRadius: "5%",
          color: "#fff",
        }}
      >
        {rowData.duracao}min
      </span>
    );
  };

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="p-mb-4"
          right={RightToolbarTemplate}
          left={header}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={movies}
          selection={selectedMovies}
          onSelectionChange={(e) => setSelectedMovies(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} movies"
          globalFilter={globalFilter}
          // header={header}
          responsiveLayout="scroll"
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column> */}
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          <Column field="name" header="Nome" sortable></Column>
          <Column
            field="password"
            header="Senha"
            sortable
            style={{ maxWidth: "22em", minWidth: "25em" }}
          ></Column>
          <Column body={actionBodyTemplate} exportable={false}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={modalRegister}
        style={{ minWidth: "fit-content", minHeight: "fit-content" }}
        header="Detalhes Filme"
        modal
        className="p-fluid"
        footer={modalRegisterFooter}
        onHide={hideDialog}
      >
        <form encType="multipart/form-data">
          <div className="previewImagem">
            {image && (
              <img
                style={{ maxWidth: "100%" }}
                src={`${movie.image}`}
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={movie.image}
                className="movie-image p-d-block p-m-auto p-pb-3"
              />
            )}
          </div>

          <div className="p-field">
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              accept=".png, .jpg, .jpeg"
              src={movie.image}
              onChange={(e) => onInputChange(e, "image")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !movie.image,
              })}
            />
            {submitted && !movie.image && (
              <small className="p-error">Image é obrigatorio.</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="name">Nome</label>
            <InputText
              id="name"
              autoComplete="off"
              value={movie.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !movie.name,
              })}
            />
            {submitted && !movie.name && (
              <small className="p-error">Nome é obrigatorio.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputTextarea
              id="password"
              autoComplete="off"
              maxLength={500}
              value={movie.password}
              onChange={(e) => onInputChange(e, "password")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !movie.password,
              })}
            />
            {submitted && !movie.password && (
              <small className="p-error">Password é obrigatoria.</small>
            )}
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={modalEditExtra}
        style={{ minWidth: "fit-content", minHeight: "fit-content" }}
        header="Horas Extras"
        modal
        className="p-fluid"
        footer={modalEditExtraFooter}
        onHide={hideModalEditExtra}
      >
        <div style={{display: "flex", padding: "1em 0em 0em 0em"}}>
          <div className="p-field">
          <InputText
              id="hours"
              type="number"
              value={movie.hours ?? converter(movie.extras).textoHoras}
              onChange={(e) => onInputChange(e, "hours")}
              required
              autoFocus
              placeholder="Horas"
              className={classNames({
                "p-invalid": submitted && !movie.name,
              })}
            />
          </div>
          <span style={{fontSize: "2em", padding:"0em .5em"}}>:</span>
          <div className="p-field">
          <InputText
              id="minuts"
              type="number"
              value={movie.minuts ?? converter(movie.extras).textoMinutos}
              onChange={(e) => onInputChange(e, "minuts")}
              required
              autoFocus
              placeholder="Minutos"
              className={classNames({
                "p-invalid": submitted && !movie.name,
              })}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={modalDelete}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={modalDeleteFooter}
        onHide={hideModalDelete}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {movie && (
            <span>
              Você tem certeza que deseja deletar <b>{movie.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
