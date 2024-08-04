import React, { Component } from "react";
import query from "../queries/fetchSongs"
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

class SongList extends Component {
  renderSong() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className="collection-tiem">
          {song.title}
        </li>
      );
    });
  }
  render() {
    console.log(this.props);
    return (
        <div>
            <ul className="collection">{this.renderSong()}</ul>
            <Link to="/song/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
            </Link>

        </div>
      
    );
  }
}
;

export default graphql(query)(SongList);
