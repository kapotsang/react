import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";

// const FILMS = [];

class ButtonClass extends React.Component {
  render() {
    const buttonText = this.props.MyButtonText;

    return <button onClick={this.props.onClick}>{buttonText}</button>;
  }
}

// class FilmRow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       film: film,
//     };
//   }

//   render() {
//     const film = this.props.film;
//     const title = film.props.title;
//     const film_id = film.film_id;
//     const lang = film.language_id;

//     return (
//       <tr>
//         <td>{film_id}</td>
//         <td>{title}</td>
//         <td>{lang}</td>
//       </tr>
//     );
//   }
// }

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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     top10Packages: [],
  //     totalPackages: null,
  //   };
  // }

  render() {
    // const rows = [];
    // this.state.top10Packages.forEach((filmEntry) => {
    //   rows.push(<FilmsAPI filmEntry={filmEntry} />);
    // });

    return (
      <div>
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

//   class AddFilm extends React.Component {
//   constructor(props) {
//   super(props);

//   this.state = {
//   postTitle: null,
//   };
//   }
// }

// class FilmTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       totalPackages: null,
//       FILMS: [],
//     };
//   }

//   componentDidMount() {
//     fetch("http://localhost:8080/allFilms")
//       .then((response) => response.json())
//       .then((jsonData) => {
//         this.setState({
//           films: FILMS,
//         });
//       });
//   }

//   render() {
//     const rows = [];
//     const filterText = this.props.filterText;
//     this.props.films.forEach((film) => {
//       if (film.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
//         return;
//       }
//       // || logical or
//       rows.push(<FilmRow film={film} key={film.title} />);
//     });
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Film ID</th>
//             <th>Title</th>
//             <th>Language ID</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//         <table> </table>
//       </table>
//     );
//   }
// }

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

// //class AddFilmForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       addTitle: "",
//       addFilmLangID: "",
//     };
//     this.handleChangeTitle = this.handleChangeTitle.bind(this);
//     this.handleChangeFilmID = this.handleChangeFilmLangID.bind(this);
//   }

//   handleChangeTitle(e) {
//     this.setState({ addTitle: e.target.value });
//   }
//   handleChangeFilmLangID(e) {
//     this.setState({ addFilmLangID: e.target.value });
//   }

//   render() {
//     //const addFilmText = this.props.addFilmAttributes;
//     const buttonAdd = "Add New Film";
//     return (
//       <form>
//         <input
//           type="text"
//           name="filmID"
//           required="required"
//           placeholder="New Film Language ID"
//           onChange={this.handleChangeFilmLangID}
//         />
//         <input
//           type="text"
//           name="title"
//           required="required"
//           placeholder="New Film Title"
//           onChange={this.handleChangeTitle}
//         />
//         <ButtonClass MyButtonText={buttonAdd} />
//       </form>
//     );
//   }
// }

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
//ALERT BOX?
// class AddFilmClass extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       AddTitle: "",
//       AddLangId: "",
//     };
//     this.handleAddNewTitle = this.handleAddNewTitle.bind(this);
//     this.handleAddLangId = this.handleAddLangId.bind(this);
//     this.handleAddNewFilm = this.handleAddNewFilm.bind(this);
//   }

//   handleAddTitle(event) {
//     this.setState({ AddTitle: event.target.value });
//   }
//   handleAddLangId(event) {
//     this.setState({ AddID: event.target.value });
//   }

//   handleAddNewFilm(event) {
//     event.preventDefault();
//     const title = this.state.AddTitle;
//     const lang_id = this.state.AddLangId;
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: title,
//         lang_id: 1,
//       }),
//     };
//     fetch("http://18.234.196.171:8080/newFilm", requestOptions).then(
//       (response) => response.json()
//     );
//   }
//   render() {
//     return (
//       <form
//         onSubmit={(e) => {
//           this.props.handleAddNewFilm(e);
//         }}
//       >
//         <input
//           type="text"
//           placeholder="New Title"
//           value={this.props.AddTitle}
//           onChange={this.handleAddNewFilm}
//         />
//         <input type="submit" value="Search" className="btn-info btn-sm m-2" />
//       </form>
//     );
//   }
// }

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
      <div>
        {" "}
        <h3> Search for a film</h3>
        <TitleInput
          searchFilm={this.state.searchFilm}
          onFilterTextChange={this.handleFilterTextChange}
          handleClick={this.handleClick}
        />
        <br />
        <h3> Add a new film</h3>
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
