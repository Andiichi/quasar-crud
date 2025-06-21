<template>
    <q-page padding>
      <q-table 
      title="Postagens" 
      :rows="posts" 
      :columns="columns" 
      no-data-label="Não tem nenhum dado para ser exibido!"
      row-key="id" 
      :loading="loading"
      :pagination="initialPagination"
      >
      <template v-slot:top>
        <h5>Postagens</h5>
        <q-space />
      <q-btn push color="primary"  label="Novo post" icon="post_add" @click="safeNavigate('formPost')" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn class="q-mr-xs" push icon="visibility" color="primary" round size="sm" />
          <q-btn class="q-mr-xs" push icon="edit" color="green" round size="sm" />
          <q-btn push icon="delete" color="negative" round size="sm" @click="handleDeletePost(props.row.id)" />
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
        <!-- <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template> -->
      </q-table>
    </q-page>

</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

import postsService from 'src/services/posts'
import { useSafeRouter } from 'src/composables/useSafeRouter'


export default defineComponent({
  name: 'IndexPage',

  setup() {
    const posts = ref([])
    const loading = ref(true) // Agora loading é declarado corretamente
    const { list, remove } = postsService()

    const columns = [
      { name: 'id', field: 'id', label: '#ID', align: 'center', sortable: true },
      { name: 'title', field: 'title', label: 'Título', align: 'center', sortable: true },
      { name: 'author', field: 'author', label: 'Autor', align: 'center', sortable: true },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'center' }

    ]

    const initialPagination = {
      page: 1,
      rowsPerPage: 10
    }

    const $q = useQuasar()
    // validando rota por 'name'
    const { safeNavigate } = useSafeRouter()

    const getPosts = async () => {
      setTimeout(async () => {
        try {
          const data = await list()
          posts.value = data
        } catch (error) {
          console.error(error)
        } finally {
          loading.value = false
        }
      }, 3000)
    }

    onMounted(() => {
      getPosts()
    })

  const handleDeletePost = async (id) => {
    // pega o nome do post - title
  const post = posts.value.find(p => p.id === id)

  $q.dialog({
    title: `Deletar post "<strong><i>${post?.title || ''}</i></strong>" `,
    message: `Deseja mesmo deletar o post "<strong><i>${post?.title || ''}</i></strong>"?`,
    cancel: true,
    persistent: true,
    html: true // importante para interpretar o <strong> como HTML

  }).onOk(async () => {
    try {
      await remove(id)
      $q.notify({
        message: `Post <strong><i>${post?.title || ''}</i></strong> apagado com sucesso!`,
        icon: 'check',
        color: 'positive',
        html: true // importante para interpretar o <strong> como HTML
          
        })
        await getPosts()
    } catch (error) {
      $q.notify({
        message: error.message || 'Erro ao apagar post',
        icon: 'error',
        color: 'negative',
        html: true // importante para interpretar o <strong> como HTML

      })
    }
  })
}


    return {
      initialPagination,
      posts,
      columns,
      loading,
      handleDeletePost,
      safeNavigate
    }
  },
})
</script>
