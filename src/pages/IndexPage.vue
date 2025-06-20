<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-table
      title="Posts"
      :rows="posts"
      :columns="columns"
      no-data-label="Não tem nenhum dado para ser exibido!"
      row-key="id"
      :loading="loading"
      >
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
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import postService from 'src/services/posts';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const posts = ref([])
    const loading = ref(true) // Agora loading é declarado corretamente
    const { list } = postService()

    const columns = [
      { name: 'id', field: 'id', label: '#ID', align: 'center', sortable: true },
      { name: 'title', field: 'title', label: 'Título', align: 'center', sortable: true },
      { name: 'author', field: 'author', label: 'Autor', align: 'center', sortable: true }
    ]

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

    return {
      posts,
      columns,
      loading
    }
  }
})
</script>
