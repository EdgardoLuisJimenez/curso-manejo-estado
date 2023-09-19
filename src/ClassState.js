import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: true,
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

        this.setState({ loading: false });

        console.log("Terminando la validacion");
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name} </h2>
        <p>Por favor, escribe el codigo de seguridad</p>

        {this.state.error && <p>Error: El codigo es incorrecto</p>}

        {this.state.loading && <Loading />}

        <input placeholder="Codigo de Seguridad" />
        <button onClick={() => this.setState({ loading: !this.state.loading })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
