import { api } from 'boot/axios'

export default function useApi(url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar dados')
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error.message || 'Erro ao cadastrar')
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar')
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error.message || 'Erro ao remover')
    }
  }

  return {
    list,
    post,
    update,
    remove,
  }
}
