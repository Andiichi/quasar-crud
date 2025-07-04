import useApi from 'src/composables/UseApi'

export default function postService() {
  const { list, post, update, remove } = useApi('posts')

  return {
    list,
    post,
    update,
    remove,
  }
}
