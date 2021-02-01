import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Link,Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  JugadoresService  from '../service/JugadoresService';
import Jugadores from '../components/Jugadores';
import ReactDOM from 'react-dom'
import history from './history';
import './Jugadores.css';

export default class AddJugad extends Component {

  //fotos
  photoSelected;
  file;
  //finfotos
  editar=false;
  cambioimagen=false;
    constructor(props){
        super(props)

        this.state={
            jugadores: {
                id:'',
                nombre:'',
                equipo:'',
                nacionalidad: '',
                posicion:'',
                imagen:''
            },
            edit:false

        }
        this.handleInput = this.handleInput.bind(this)
        this.guardarJugador = this.guardarJugador.bind(this)
        this.actualizarJugador = this.actualizarJugador.bind(this)
        this.onPhotoSelected = this.onPhotoSelected.bind(this)
        this.photoSelected = this.state.jugadores.imagen
    }

    handleInput(e){

        
         console.log("value"+e.target.value)
        console.log("name", e.target.name);
        //para escribir datos en el estado
        const { value, name } = e.target;

        this.setState({
            jugadores: {
                ...this.state.jugadores,
                [name]:value
            }
        })
        console.log(JSON.stringify(this.state))
    }


    async componentDidMount() {
        console.log("hola añadir jugador")
        const id = this.props.id;
        console.log("el id que llega es:"+ id)
        const aid = localStorage.getItem("id")
        console.log("aid es:"+aid)
        console.log("state es:"+JSON.stringify(this.props.location.state))
        if(this.props.location.state != undefined){
            this.editar=true;
            console.log("aaa"+this.props.location.state.id)
            let jugadoresService = new JugadoresService();
            jugadoresService.getJugador(this.props.location.state.id)
            .then(
                res => {
                    console.log("state actual"+JSON.stringify(this.state))
                  console.log("resultado es"+JSON.stringify(res));
                  this.setState({
                    jugadores: {
                        nombre:res.data.nombre,
                        equipo:res.data.equipo,
                        nacionalidad:res.data.nacionalidad,
                        posicion:res.data.posicion,
                        imagen:res.data.imagen
                    },
                    edit:true
                  })  
                  console.log("state despues actual"+JSON.stringify(this.state))
                },
                err => {
                    console.log("ERROR: ")
                    console.error(err)
                }
            )
        }else{
            console.log("bbb")
        }
        // const state = this.props.location.state.id

        

    }

    onPhotoSelected(event) {
        console.log("evento es:"+event)
        console.log("state es:"+this.state)
        if (event.target.files && event.target.files[0]) {
            console.log("onphotoselected")
          this.file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          console.log("foto es222: "+JSON.stringify(this.file))
          reader.readAsDataURL(this.file);
        }
        this.cambioimagen=true;
    }


    guardarJugador(e) {
        e.preventDefault();

        console.log("en guardar js")
        let jugadoresService = new JugadoresService();

        const fd = new FormData();
        fd.append('nombre',this.state.jugadores.nombre);
        fd.append('equipo',this.state.jugadores.equipo);
        fd.append('posicion',this.state.jugadores.posicion);
        fd.append('nacionalidad',this.state.jugadores.nacionalidad);
        fd.append('imagen',this.file)

        console.log("state es:"+JSON.stringify(this.state))
        console.log("fd es:"+JSON.stringify(fd))
        console.log("fdddd es:"+fd.get('nombre'))
        console.log("fdddd2222 es:"+fd.get('imagen'))

        jugadoresService.saveJugador(fd)
          .then(
            res => {
                
              console.log("resulñtado es"+JSON.stringify(res));

              this.props.history.push('/jugadores')
            },
            err => {
                console.log("ERROR: ")
                console.error(err)
            }
        )
    }

    prueba(){
        console.log("state es:"+this.state)
    }

    actualizarJugador(e) {
        e.preventDefault();

        console.log("en actualizar js")
         console.log("state en actualizar es: "+this.state)
        let jugadoresService = new JugadoresService();

        console.log("this.file"+this.file)

        const fd = new FormData();
        fd.append('nombre',this.state.jugadores.nombre);
        fd.append('equipo',this.state.jugadores.equipo);
        fd.append('posicion',this.state.jugadores.posicion);
        fd.append('nacionalidad',this.state.jugadores.nacionalidad);
        if(this.cambioimagen){
            fd.append('imagen',this.file)
          }
        

        console.log("id es:"+this.props.location.state.id)
        // console.log("state es:"+JSON.stringify(this.state))
        // console.log("fd es:"+JSON.stringify(fd))
        // console.log("fdddd es:"+fd.get('nombre'))
        // console.log("fdddd2222 es:"+fd.get('imagen'))

        jugadoresService.updateJugador(this.props.location.state.id,fd)
          .then(
            res => {
                
              console.log("resulñtado es"+JSON.stringify(res));

              this.props.history.push('/jugadores')
            },
            err => {
                console.log("ERROR: ")
                console.error(err)
            }
        )
    }

    render() {

        const nombre = this.state.jugadores.nombre;
        
        const jugadores = this.state;
        return <div className="col-md-4 offset-md-2">
            
            <div className="card">
                <div className="card-body">
                    
                    
                    <form action="" onSubmit={this.state.edit ? this.actualizarJugador : this.guardarJugador}>

                    
                        <div className="form-group">
                            <input type="text" name="nombre" value={this.state.jugadores.nombre}  placeholder="Nombre" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="equipo" value={this.state.jugadores.equipo} placeholder="Equipo" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>    
                        <div className="form-group">
                            <input type="text" name="nacionalidad" value={this.state.jugadores.nacionalidad} placeholder="Nacionalidad" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>    
                        <div className="form-group">
                            <input type="text" name="posicion" value={this.state.jugadores.posicion} placeholder="Posicion" className="form-control" onChange={this.handleInput} autoFocus/>
                        </div>

                        <div className="form-group">
                            <img src={"http://localhost:3000/"+this.state.jugadores.imagen} alt="logo" width="350" height="250"></img>
                        </div>

                        <div>
                            <span>Seleccionar imagen: </span>
                            <input type="file" name="imagen" onChange={this.onPhotoSelected} value={jugadores.imagen}/>
                           
                            
                        </div>
                        <br></br>
                        <div>
                            <button className="btn btn-success btn-block" >
                            Guardar jugador
                            </button>   
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>

        
    }

}