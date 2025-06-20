import { api } from 'boot/axios'

export default function useApi(url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new error(error)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new error(error)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new error(error)
    }
  }

  const remove = async (form) => {
    try {
      const { data } = await api.delete(`${url}/${form.id}`)
      return data
    } catch (error) {
      throw new error(error)
    }
  }

  return {
    list,
    post,
    update,
    remove
  }
}
