<template>
    <q-page padding>
        <h3>Adicione uma postagem</h3>
        <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm" spellcheck="true">
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
import { defineComponent, ref } from "vue";
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

import postsService from 'src/services/posts'

export default defineComponent({
    name: 'formPost',

    setup() {
        const { post } = postsService()
        const $q = useQuasar()
        const router = useRouter()
        const contentError = ref('')


        const form = ref({
            title: '',
            content: '',
            author: ''
        })

        const onSubmit = async () => {
            const content = form.value.content?.replace(/<[^>]*>/g, '').trim() // remove tags HTML

            if (!content) {
                contentError.value = 'O conteúdo é obrigatório!'
                return
            }

            try { 
                contentError.value = '' // limpa erro se válido
                await post(form.value)
                router.push({ name: 'home' })
                $q.notify({
                    message: `Post criado com sucesso!`,
                    icon: 'check',
                    color: 'positive'
                })
            } catch (error) {
                $q.notify({
                    message: error.message || 'Erro ao criar post',
                    icon: 'error',
                    color: 'negative'
                })
            }
        }

        // const ValidContent = () => {
        //     form.value = {
        //         content: ''
        //     }
        // }

        return {
            form,
            onSubmit,
            contentError

        }
    }

})
</script>
