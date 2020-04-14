import React from 'react'


const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

function useDataFetcher(url) {
    const [posts, setPosts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setIsLoading(true)
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Error fetching posts!')
                }
            })
            .then(posts => {
                // console.log(posts)
                setPosts(posts)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
            })
    }, [url])

    return {posts, isLoading, error}
}

export default useDataFetcher
