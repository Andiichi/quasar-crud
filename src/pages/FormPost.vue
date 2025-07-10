<template>
  <q-page padding>
    <h3>Adicione uma postagem</h3>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm" spellcheck="true">
      <q-input outlined v-model="form.title" label="Título" lazy-rules class="col-md-6 col-xs-12"
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']" />

      <q-input outlined v-model="form.author" label="Autor" lazy-rules class="col-md-6 col-xs-12"
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']" />

      <div class="col-md-12 col-xs-12">
        <q-editor v-model="form.content" min-height="10rem" placeholder="Digite um texto..." :toolbar="[
          ['bold', 'italic', 'underline'],
          [{
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
          }]
        ]" />
        <span v-if="contentError" class="text-negative text-caption q-mt-xs text-bold">
          {{ contentError }}
        </span>
      </div>

      <div class="col-12 q-gutter-x-sm">
        <q-btn label="Salvar" color="primary" class="float-right" icon="save" push type="submit"></q-btn>
        <q-btn label="Cancelar" color="white" class="float-right" text-color="negative" push
          :to="{ name: 'home' }"></q-btn>

      </div>
    </q-form>

  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

import postsService from 'src/services/posts'

export default defineComponent({
  name: 'formPost',

  setup() {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const contentError = ref('')


    const form = ref({
      title: '',
      content: '',
      author: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id)
      }

    })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        $q.notify({
          message: error.message || 'Erro ao buscar post',
          icon: 'error',
          color: 'negative'
        })
      }
    }

    const onSubmit = async () => {
  try {
    // Validação do conteúdo (antes de salvar!)
    const content = form.value.content?.replace(/<[^>]*>/g, '').trim()
    if (!content) {
      contentError.value = 'O conteúdo é obrigatório!'
      return
    }
    contentError.value = ''

    if (form.value.id) {
      await update(form.value)
      $q.notify({
        message: `Post atualizado com sucesso!`,
        icon: 'check',
        color: 'positive'
      })
    } else {
      await post(form.value)
      $q.notify({
        message: `Post criado com sucesso!`,
        icon: 'check',
        color: 'positive'
      })
    }

    router.push({ name: 'home' })
  } catch (error) {
    $q.notify({
      message: error.message || 'Erro ao salvar o post',
      icon: 'error',
      color: 'negative'
    })
  }
}

    // Retorna os dados para o template
    return {
      form,
      onSubmit,
      contentError

    }
  }

})
</script>
