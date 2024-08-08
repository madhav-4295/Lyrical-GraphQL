import React, {Component} from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreateForm";
import LyricList from "./LyricList";
class SongDetail extends Component {
    render(){
        const {song} = this.props.data;

        if(!song){ return <div>Loading...</div>}
        console.log(this.props)
        return(
            <div>
                <Link to ="/">Back</Link>
                <h3>{song.title.toUpperCase()}</h3>
                <LyricList lyrics = {song.lyrics}/>
                <LyricCreate songId={this.props.params.id}/>
            </div>
        )
    }
}

export default graphql(fetchSong,{
    options:(props)=>{return {variables:{id:props.params.id}}}
})(SongDetail);