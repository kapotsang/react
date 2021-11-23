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

class FilmsAPI extends React.Component {
  render() {
    const reactPackage = this.props.reactPackage;

    return (
      <tr>
        <td>{reactPackage.film_id}</td>
        <td>{reactPackage.title}</td>
        <td>{reactPackage.language_id}</td>
      </tr>
    );
  }
}

class ReactPackages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10Packages: [],
      totalPackages: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/allFilms")
      .then((response) => response.json())
      .then((jsonData) => {
        const packages = jsonData.slice(0, 50);
        this.setState({
          top10Packages: packages,
          totalPackages: jsonData.total,
        });
      });
  }

  render() {
    const rows = [];
    this.state.top10Packages.forEach((reactPackage) => {
      rows.push(<FilmsAPI reactPackage={reactPackage} />);
    });

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
        <tbody>{rows}</tbody>
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
          value={searchFilm}
          onChange={this.handleFilterTextChange}
        />
        <input type="submit" value="Submit" className="btn-info btn-sm m-2" />
      </form>
    );
  }
}

class AddFilmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTitle: "",
      addFilmLangID: "",
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeFilmID = this.handleChangeFilmLangID.bind(this);
  }

  handleChangeTitle(e) {
    this.setState({ addTitle: e.target.value });
  }
  handleChangeFilmLangID(e) {
    this.setState({ addFilmLangID: e.target.value });
  }

  render() {
    //const addFilmText = this.props.addFilmAttributes;
    const buttonAdd = "Add New Film";
    return (
      <form>
        <input
          type="text"
          name="filmID"
          required="required"
          placeholder="New Film Language ID"
          onChange={this.handleChangeFilmLangID}
        />
        <input
          type="text"
          name="title"
          required="required"
          placeholder="New Film Title"
          onChange={this.handleChangeTitle}
        />
        <ButtonClass MyButtonText={buttonAdd} />
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

class DatabaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilms: "",
      films: [],
      rows: [],
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleFilterTextChange(searchFilms) {
    this.setState({
      searchFilms: searchFilms,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const searchFilms = this.state.searchFilms;

    const rows = [];
    const film = this.state.top10Packages;

    film.forEach((film) => {
      if (film.title.toLowerCase().indexOf(searchFilms.toLowerCase()) === -1) {
        return;
        rows.push(film);
      }
    });
    this.setState({
      rows: rows,
    });
  }

  render() {
    return (
      <div>
        {" "}
        <h3> Search for a film</h3>
        <TitleInput
          searchFilm={this.state.searchFilms}
          onSearchFilms={this.handleFilterTextChange}
          handleClick={this.handleClick}
        />
        <br />
        <h3> Add a new film</h3>
        <AddFilmForm />
        <h3> Delete a film</h3>
        <DeleteFilmForm />
        <br />
        <ReactPackages />
        <br />
      </div>
    );
  }
}

ReactDOM.render(<DatabaseTable />, document.getElementById("root"));

// const FILMS = [
//   { title: "Magic Mike", film_id: "1", language_id: "1" },
//   { title: "Magical Michael", film_id: "2", language_id: "1" },
//   { title: "Magnificant Mystical Michael", film_id: "3", language_id: "1" },
//   { title: "Mega Mecha Michael", film_id: "4", language_id: "1" },
// ];

// class DeleteSection extends React.Component{
//     render(){
//         const deleteInput = "Delete Film ID"
//         const buttonDelete = "Delete"
//             return(
//                 <DeleteFilmForm deleteFilmID = {deleteInput}/>
//                 <ButtonClass MyButtonText = {buttonDelete}/>

//             )
//     }
// }
