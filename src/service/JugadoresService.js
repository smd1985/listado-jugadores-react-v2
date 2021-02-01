import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



export default class JugadoresService extends Component {

  API_URI = 'http://localhost:3000/api';

  getJugadores() {
    
    return axios.get(`${this.API_URI}/jugadores`);
  }

  getJugador(id) {
    return axios.get(`${this.API_URI}/jugadores/${id}`);
  }

  deleteJugador(id) {
    
    
    return axios.delete(`http://localhost:3000/api/jugadores/${id}`);
  }

   saveJugador(jugador) {  

    return axios.post('http://localhost:3000/api/jugadores',jugador);
   
  }

  updateJugador(id, updatedJugador) {
    
    
    return axios.put(`http://localhost:3000/api/jugadores/${id}`, updatedJugador);
  }

}