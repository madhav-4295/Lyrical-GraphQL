import React, { Component } from "react";
import query from "../queries/fetchSongs";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

class SongList extends Component {
  deletSong(id) {
    this.props
      .mutate({
        variables: { id: id },
      })
      .then(() => this.props.data.refetch());
  }
  renderSong() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/song/${id}`}> {title}</Link>
          <i className="material-icons" onClick={() => this.deletSong(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>SONGS FOR YOU</h3>
        <ul className="collection">{this.renderSong()}</ul>
        <Link to="/song/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
