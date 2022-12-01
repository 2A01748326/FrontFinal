import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import './App.css';
import * as ReactDOM from 'react-dom';
const x = new URL("../images/diabetes.png", import.meta.url)



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      embarazos: '',
      glucosa: '',
      presion: '',
      grosorPiel: '',
      insulina: '',
      bmi: '',
      dpf: '',
      edad: '',
      resultado: '',
      resultado2: '',
      registro: '',
      lista: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.obtRegistro = this.obtRegistro.bind(this);
    this.crearRegistro = this.crearRegistro.bind(this);
    this.eliminarRegistro = this.eliminarRegistro.bind(this);
    this.predecir = this.predecir.bind(this);
    this.entrenarModelo = this.entrenarModelo.bind(this);
    this.displayTable = this.displayTable.bind(this);

  }
  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })

  }
  displayTable(props){
        return (
        <div>
          <h1>Simple Inventory Table</h1>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Unit Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                props.table.map((item) => (
                  <tr key={item.id}>
                    <td>{item.embarazos}</td>
                    <td>{item.glucosa}</td>
                    <td>{item.presion}</td>
                    <td>{item.grosorPiel}</td>
                    <td>{item.insulina}</td>
                    <td>{item.bmi}</td>
                    <td>{item.dpf}</td>
                    <td>{item.edad}</td>
                    <td>{item.resultado}</td>
                    <td />
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        );
  }
  handleSubmit() {

    //console.log("HOLA");
    fetch('http://3.89.118.80:8080/base/consultarRegistros',
      {
        method: "get"
      }).then(res => res.json()).then(result => {
        console.info(result);

        this.setState({ resultado: JSON.stringify(result) })
      }
      );
      const root = ReactDOM.createRoot(document.getElementById('TABLA'));
      const element = <this.displayTable table = {this.resultado}/>
      root.render(element);
  }
  obtRegistro() {
    //console.log("HOLA");
    fetch('http://3.89.118.80:8080/base/consultarRegistro', {
      method: "post",
      body: JSON.stringify({
        id: this.state.registro
      }),
      headers: { 'Content-type': 'application/json' }

    })
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ resultado: JSON.stringify(data) })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  eliminarRegistro() {
    //console.log("HOLA");
    fetch('http://3.89.118.80:8080/base/eliminarRegistro', {
      method: "post",
      body: JSON.stringify({
        id: this.state.registro
      }),
      headers: { 'Content-type': 'application/json' }

    })
      .then(async response => {
        const data = await response.text();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ resultado: JSON.stringify(data) })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  crearRegistro() {
    //console.log("HOLA");
    fetch('http://3.89.118.80:8080/base/crearRegistro', {
      method: "post",
      body: JSON.stringify({
        embarazos: this.state.embarazos,
        glucosa: this.state.glucosa,
        presion: this.state.presion,
        grosorPiel: this.state.grosorPiel,
        insulina: this.state.insulina,
        bmi: this.state.bmi,
        dpf: this.state.dpf,
        edad: this.state.edad,
        resultado: this.state.resultado2
      }),
      headers: { 'Content-type': 'application/json' }

    })
      .then(async response => {
        const data = await response.text();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ resultado: data })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  predecir() {
    //console.log("HOLA");
    fetch('http://3.89.118.80:8081/modelo/prediccion', {
      method: "post",
      mode: 'cors',
      body: JSON.stringify({
        embarazos: this.state.embarazos,
        glucosa: this.state.glucosa,
        presion: this.state.presion,
        grosorPiel: this.state.grosorPiel,
        insulina: this.state.insulina,
        bmi: this.state.bmi,
        dpf: this.state.dpf,
        edad: this.state.edad,
      }),
      headers: { 'Content-type': 'application/json' }

    })
      .then(async response => {
        const data = await response.text();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ resultado: data })
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }


  entrenarModelo() {
    //console.log("HOLA");
    fetch('http://3.89.118.80:8080/base/consultarRegistros',
      {
        method: "get"
      }).then(res => res.json()).then(result => {
        console.info(result);
        fetch('http://3.89.118.80:8081/modelo/reentrenar', {
          method: "post",
          body: JSON.stringify({
            DB: result
          }),
          headers: { 'Content-type': 'application/json' }

        })
          .then(async response => {
            const data = await response.text();
            this.setState({ resultado: JSON.stringify(data) })
          })
        //this.setState({ resultado: JSON.stringify(result) })
      }
      );
  }

  render() {
    console.log(this.state);
    return (


      <div className="App">
        <div className="card">

          <div className="card-header">
            <img src={x} />
            <p>Abajo se pueden agregar objetos a clasificar para la predicción de la Diabetes.</p>
            <p>Abajo en las opciones se pueden notar las caracteristicas que se deben colocar.</p>
            <p>Introduce tus datos</p>
          </div>

          <div className="row">

            <div className="column">

              <div className="card-body">

                <form>

                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} name="embarazos" placeholder="Embarazos" />
                  </div>


                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="glucosa" name="glucosa" placeholder="Glucosa" />
                  </div>

                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="presion" name="presion" placeholder="Presion" />
                  </div>


                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="grosorPiel" name="grosorPiel" placeholder="Grosor de Piel" />
                  </div>


                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="insulina" name="insulina" placeholder="Insulina" />
                  </div>


                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="bmi" name="bmi" placeholder="BMI" />
                  </div>


                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="dpf" name="dpf" placeholder="DPF" />
                  </div>

                  <div className="form-group">
                    <input type="text" onChange={this.handleInput} id="edad" name="edad" placeholder="Edad" />
                  </div>



                </form>
                <button onClick={this.predecir}>Enviar</button>
              </div>

            </div>

            <div className="column">

              <div>
                <input type="text" onChange={this.handleInput} id="registro" name="registro" placeholder="ID del Registro" />
              </div>
              <div>
                <button onClick={this.obtRegistro}>Obtener por ID</button>
              </div>

              <div>
                <button onClick={this.eliminarRegistro}>Borrar Registro por ID</button>
              </div>

              <div>
                <button onClick={this.handleSubmit}>Obtener todo</button>
              </div>

              <div>
                <label>¿Diabético? </label>
                <select name="resultado2" id="resultado2" onChange={this.handleInput} >
                  <option value='0'>No</option>
                  <option value='1'>Si</option>
                </select>
              </div>
              <div>
                <button onClick={this.crearRegistro}>Crear registro (También llena el form)</button>
              </div>

              <div>
                <button onClick={this.entrenarModelo}>Reentrenar el modelo</button>
              </div>


            </div>

          </div>

        </div>

        <div>
          <div id="TABLA"></div>
        </div>

      </div>
    )
  }
}

export default App;