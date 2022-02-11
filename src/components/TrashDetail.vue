<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ $filters.friendlyDate(note.updatedAt) }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="currentTrashNote.id">
        <span>创建日期: {{ $filters.friendlyDate(currentTrashNote.createdAt) }}</span>
        <span>|</span>
        <span>更新日期: {{ $filters.friendlyDate(currentTrashNote.updatedAt) }}</span>
        <span>|</span>
        <span>所属笔记本:{{ belongTo }}</span>
        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ currentTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import {useStore} from 'vuex'
import { useRouter, useRoute,onBeforeRouteUpdate } from 'vue-router'
import {computed, getCurrentInstance} from 'vue'

const md = new MarkdownIt()

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const {$confirm} = getCurrentInstance().appContext.config.globalProperties

    const currentTrashNote = computed(() => store.getters.currentTrashNote)
    const trashNotes = computed(() => store.getters.trashNotes)
    const belongTo = computed(() => store.getters.belongTo)

    // created
    store.dispatch('getNotebooks')
    store.dispatch('getTrashNotes').then(_ => {
      const {noteId} = route.query
      const currentTrashNoteId = noteId ? +noteId : null
      store.commit('setCurrentTrashNoteId',{currentTrashNoteId})
      router.replace({
        path: '/trash',
        query: {
          noteId: currentTrashNote.value.id
        }
      })
    })

    // methods
    const onDelete = () => {
      const note = currentTrashNote
      $confirm(`删除笔记 ${note.value.title} 后将无法恢复`, '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(_ => {
            return store.dispatch('deleteTrashNote',{noteId: note.value.id})
          })
          .then(_ => {
            store.commit('setCurrentTrashNoteId')
            router.replace({
              path: '/trash',
              query: {
                noteId: currentTrashNote.value.id
              }
            })
          })
          .catch(err => {
            console.error(err)
          })
    }
    const onRevert = () => {
      store.dispatch('revertTrashNote',{noteId: currentTrashNote.value.id}).then(_ => {
        store.commit('setCurrentTrashNoteId')
        router.replace({
          path: '/trash',
          query: {
            noteId: currentTrashNote.value.id
          }
        })
      })
    }

    // computed
    const compiledMarkdown = computed(()=>md.render(currentTrashNote.value.content || ''))

    onBeforeRouteUpdate((to, from, next) => {
      store.commit('setCurrentTrashNoteId',{currentTrashNoteId: to.query.noteId})
      next()
    })

    return {
      currentTrashNote,
      trashNotes,
      belongTo,
      onDelete,
      onRevert,
      compiledMarkdown
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    span:last-of-type {
      flex: 1;
    }

    .action {
      margin-right: 10px;
      padding: 2px 4px;
      font-size: 12px;

      &:last-child {
        margin-right: 20px;
      }
    }
  }

  .note-title {
    padding: 10px 20px;
  }
}
</style>
