import React from 'react'
import useDataFetcher from '../custom_hooks/useDataFetcher'

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

function RESTFunction() {
    const {posts, isLoading, error} = useDataFetcher(BASE_URL)

    if (error) {
        return <p style={{ color: 'red' }}>{error.message}</p>
    }
    if (isLoading) {
        return <p>Loading posts...</p>
    }
    return (
        <div>
            <h1>With React Hooks</h1>
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

export default RESTFunction
