import { Post as PostComponent, Container } from '../components'

function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostComponent />
      </Container>
    </div>
  )
}

export default AddPost