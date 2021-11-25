import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import './style.css';

class ButtonClass extends React.Component {
  render() {
    const buttonText = this.props.MyButtonText;

    return <button onClick={this.props.onClick}>{buttonText}</button>;
  }
}

class FilmRow extends React.Component {
  render() {
    const film = this.props.film;

    return (
      <tr>
        <td>{film.film_id}</td>
        <td>{film.title}</td>
        <td>{film.language_id}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  render() {


    return (
      <div id="film-table">
        <thead style={{ textAlign: "" }}>
          <tr>
            <td>
              <b>Film ID</b>
            </td>
            <td>
              <b>Title</b>
            </td>

            <td>
              <b>Language ID</b>
            </td>
          </tr>
        </thead>
        <tbody>{this.props.rows}</tbody>
      </div>
    );
  }
}

class TitleInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  render() {
    const searchFilm = this.props.searchFilm;
    return (
      <form
        onSubmit={(e) => {
          this.props.handleClick(e);
        }}
      >
        <input
          type="text"
          placeholder="Search Film Title"
          value={this.props.searchFilm}
          onChange={this.handleFilterTextChange}
        />
        <input type="submit" value="Search" className="btn-info btn-sm m-2" />
      </form>
    );
  }
}

class DeleteFilmForm extends React.Component {
  render() {
    const buttonDelete = "Delete";
    const deleteFilmText = this.props.deleteFilmID;

    return (
      <div>
        <form>
          <input type="text" required="required" placeholder="Delete ID" />

          <ButtonClass MyButtonText={buttonDelete} />
        </form>
      </div>
    );
  }
}

class NewFilmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AddTitle: "",
      AddLangID: "",
    };
    this.handleAddTitle = this.handleAddTitle.bind(this);
    this.handleAddLangID = this.handleAddLangID.bind(this);
    this.handleAddNewFilmEntry = this.handleAddNewFilmEntry.bind(this);
  }
  handleAddTitle(event) {
    this.setState({ AddTitle: event.target.value });
  }
  handleAddLangID(event) {
    this.setState({ AddLangID: event.target.value });
  }
  handleAddNewFilmEntry(event) {
    alert("weee");
    // console.log("help");
    event.preventDefault();
    const newTitle = this.state.AddTitle;
    const newLangID = this.state.AddLangID;
    // console.log(newTitle);
    // console.log(newLangID);
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        language_id: newLangID,
      }),
    };

    fetch("http://localhost:8080/newFilm", requestOptions);
  }
  render() {
    return (
      <form
        onSubmit={(event) => {
          this.handleAddNewFilmEntry(event);
        }}
      >
        Title:
        <input
          type="text"
          placeholder="New Title"
          value={this.state.AddTitle}
          onChange={this.handleAddTitle}
        />
        Language ID:
        <input
          type="text"
          placeholder="New Language ID"
          value={this.state.AddLangID}
          onChange={this.handleAddLangID}
        />
        <input type="submit" value="Add New Entry" />
      </form>
    );
  }
}

class DatabaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilm: "",
      films: [],
      rows: [],
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/allFilms")
      // fetch("http://18.234.196.171:8080/allFilms")
      .then((response) => response.json())
      .then((jsonData) => {
        const packages = jsonData;
        //.slice(0, 50);
        this.setState({
          films: packages,
          rows: packages,
        });
      });
  }

  handleFilterTextChange(searchFilm) {
    this.setState({
      searchFilm: searchFilm,
    });
  }

  handleClick(event) {
    alert("You searched for" + this.state.searchFilm);
    event.preventDefault();
    const searchFilm = this.state.searchFilm;

    const rows = [];
    const films = this.state.films;

    films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(searchFilm.toLowerCase()) === -1) {
        return;
      }
      rows.push(film);
    });
    this.setState({
      rows: rows,
    });
  }

  render() {
    const renderRows = [];
    this.state.rows.forEach((film) => {
      renderRows.push(<FilmRow film={film} key={film.title} />);
    });
    return (
      <div id ="filmtable">
        {" "}
        <h3> Search for a film</h3>
        <TitleInput
          searchFilm={this.state.searchFilm}
          onFilterTextChange={this.handleFilterTextChange}
          handleClick={this.handleClick}
        />
        <br />
        <h3> Add a new film</h3>
        <NewFilmForm />
        <h3> Delete a film</h3>
        <DeleteFilmForm />
        <br />
        <FilmTable
          film={this.state.films}
          searchFilm={this.state.searchFilm}
          rows={renderRows}
        />
        <br />
      </div>
    );
  }
}

ReactDOM.render(<DatabaseTable />, document.getElementById("root"));
