import { useEffect, useState } from 'react'
import { Container, PostFrom } from '../components'
import authService from '../auth/authconfig'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            authService.getPost(slug)
                .then(post => {
                    if (post) {
                        setPost(post)
                    } else {
                        navigate('/')
                    }
                })
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostFrom post={post} />
            </Container>
        </div>) : <></>
}

export default EditPost