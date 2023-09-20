import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  // componentWillMount
  // UNSAFE_componentWillMount() {
  //   console.log("ComponentWillMount");
  // }
  // componentDidMount() {
  //   console.log("ComponentDidUnmount");
  // }

  componentDidUpdate() {
    console.log("Actualizacion");

    if (this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }

        console.log("Terminando la validacion");
      }, 3000);
    }
  }

  render() {
    const { error, loading, value } = this.state;
    return (
      <div>
        <h2>Eliminar {this.props.name} </h2>
        <p>Por favor, escribe el codigo de seguridad</p>

        {error && !loading &&<p>Error: El codigo es incorrecto</p>}

        {loading && <Loading />}

        <input
          placeholder="Codigo de Seguridad"
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ loading: !this.state.loading })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
