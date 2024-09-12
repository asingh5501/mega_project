import { useEffect, useState } from "react"
import authService from "../auth/authconfig"
import { PostCard, Container } from "../components"

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {

    }, [])
    authService.getPosts([])
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .catch()

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts