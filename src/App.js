import React from "react";
import Calificacion from './calificacion'
import './App.css';


export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: null
    };

    this.showNewStory = this.showNewStory.bind(this);
  }

  componentDidMount() {
    this.showNewStory();
  }

  showNewStory() {
    console.log("start");
    this.setState({ isLoading: true });
    const random = parseInt(Math.random() * 2000 + 1);

    fetch(`https://xkcd.com/${random}/info.0.json`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data, isLoading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, data } = this.state;

    if (isLoading || !data) {
      return <p>Loading ...</p>;
    }

    
    return (
      <div className="contenido">
        <img id="img" src={data.img}  />
        <p> {data.title} </p>
        <Calificacion/>
        <button onClick={this.showNewStory}>Generar comic aleatorio</button>
      </div>
    );
  }
}
