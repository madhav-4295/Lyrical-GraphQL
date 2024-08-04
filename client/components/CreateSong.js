import React, {Component} from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs"
class SongCreate extends Component {
    constructor(props){
        super(props);
        this.state = {title:''}
    }

onSubmit(event){
    event.preventDefault();
    console.log(this.props)

    //link to backend server. 
    this.props.mutate({
        variables:{
            title:this.state.title
        },
        refetchQueries:[{query:query}]
    }).then(()=> hashHistory.push('/'));
}
    render(){
        return (
            <div>
                <Link to ="/">Back</Link>
                <h2>Create a New Song</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input type="text" value={this.state.title} onChange={event=>{this.setState({title:event.target.value})}} />
                </form>
            </div>
        )
    }
}

const mutation = gql`
        mutation AddSong($title:String){
            addSong(title: $title){
                id
                title
            }
        }
    `
    ;
export default graphql(mutation)(SongCreate);

