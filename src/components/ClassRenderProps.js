import React, { Component } from 'react'
import RESTClass from './RESTClass'


const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

export class ClassRenderProps extends Component {
    render() {
        return (
            <>
                <h1>With Render Props</h1>
                <RESTClass url={BASE_URL}>
                    {
                        ({error, isLoading, posts}) => {
                            if (error) {
                                return <p style={{ color: 'red' }}>{error.message}</p>
                            }
                            if (isLoading) {
                                return <p>Loading posts...</p>
                            }
                            return (
                                <div>
                                    <h1>App</h1>
                                    {
                                        posts.map((post) => (
                                            <>
                                                <h3>{post.title}</h3>
                                                <p>{post.body}</p>
                                            </>
                                        ))
                                    }
                                </div>
                            )
                        }
                    }
                </RESTClass>
            </>
        )
    }
}

export default ClassRenderProps
