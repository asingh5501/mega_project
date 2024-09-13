import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import authService from '../../auth/authconfig'
import { useNavigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? authService.uploadFile(data.image[0]) : null
            if (file) {
                authService.deleteFile(post.featuredImage)
            }
            const dbPost = await authService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file?.$id : '',
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await authService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredimage = fileId
                data.content = 'Hello how are you'
                const dbPost = await authService.createPost({
                    ...data,
                    userid: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTrasform = useCallback(
        (value) => {
            if (value && typeof value === 'string') {
                return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-')
            } else {
                return ''
            }
        },
        [],
    )

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTrasform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTrasform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title: "
                    placeholder='Title'
                    className='mb-4'
                    {...register("title", {
                        required: true
                    })}
                />

                <Input
                    label="Slug: "
                    placeholder='Slug'
                    className='mb-4'
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue('slug', slugTrasform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <dir className='w-1/3'>
                <Input
                    label="Featured Image :"
                    type="file"
                    className='mb-4'
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    {...register('image', {
                        required: !post
                    })}
                />

                {post && (
                    <div>
                        <img src={authService.getFilePreview(post.featuredImage)} alt="post image" className='rounded-lg' />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label={'Status'}
                    className='mb-4'
                    {...register('status', {
                        required: true
                    })}
                />

                <Button
                    type='submit'
                    bgColor={post ? 'bg-green-500' : ''}
                    className='w-full hover:bg-blue-300 bg-gray-600'
                >{post ? 'Update' : 'Submit'}</Button>

            </dir>
        </form>
    )
}

export default PostForm