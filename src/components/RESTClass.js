
import React, { Component } from 'react'


export class RESTClass extends Component {
    state = {
        isLoading: false,
        error: null,
        posts: []
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch(this.props.url)
        .then(res => {
            if (res.ok){
                return res.json()
            }else{
                throw Error('Error fetching posts!')
            }
        })
        .then(posts => {
            // console.log(posts)
            this.setState({posts, isLoading: false})
        })
        .catch(error => this.setState({error}))
    }

    render() {
        // const {error, isLoading, posts} = this.state
        return this.props.children(this.state)
    }
}

export default RESTClass
