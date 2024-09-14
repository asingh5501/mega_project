import appwriteService from '../auth/authconfig'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full rounded-xl p-4 bg-gray-400'>
        <div className='w-full justify-center mb-4'>
          <img src={appwriteService.getFilePreview(featuredimage)} alt={title} className='rounded-xl h-[250px] object-cover' />
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard