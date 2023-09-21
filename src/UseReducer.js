import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE)
          dispatch({
            type: actionTypes.CONFIRM,
          });
        else
          dispatch({
            type: actionTypes.ERROR,
          });

        console.log("Terminando la validacion");
      }, 3000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>

        {state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}

        {state.loading && <p>Cargando...</p>}

        <input
          placeholder="Codigo de Seguridad"
          value={state.value}
          onChange={(event) => {
            dispatch({
              type: actionTypes.WRITE,
              payload: event.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            dispatch({
              type: actionTypes.CHECK,
            });
          }}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Pedimos confirmacion. ¿Tas seguro?</p>

        <button
          onClick={() => {
            dispatch({
              type: actionTypes.DELETE,
            });
          }}>
          Si, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({
              type: actionTypes.RESET,
            });
          }}>
          Nop, me arrepenti
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito</p>

        <button
          onClick={() => {
            dispatch({
              type: actionTypes.RESET,
            });
          }}>
          Resetear, volver atras
        </button>
      </>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  CONFIRM: "CONFIRM",
  ERROR: "ERROR",
  WRITE: "WRITE",
  CHECK: "CHECK",
  DELETE: "DELETE",
  RESET: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload,
  },
  [actionTypes.CHECK]: {
    ...state,
    loading: true,
  },
  [actionTypes.DELETE]: {
    ...state,
    deleted: true,
  },
  [actionTypes.RESET]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { UseReducer };
