<template>
  <div class="note-sidebar">
    <el-button size="small" round class="add-note" @click="onAddNote"> 添加笔记</el-button>
    <el-dropdown class="notebook-title" placement="bottom" @command="handleCommand" >
      <span class="el-dropdown-link">
        {{ currentNotebook.title }}
        <i class="iconfont icon-down"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id" >
            {{ notebook.title }}
          </el-dropdown-item>
          <el-dropdown-item command="trash">回收站</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link
          :to="`/note?notebookId=${currentNotebook.id}&noteId=${note.id}`"
        >
          <span class="date">{{ $filters.friendlyDate(note.updatedAt) }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  setup(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // computed
    // todo computed 得到的ref解构
    let currentNotebook = computed(() => store.getters.currentNotebook)
    let currentNote = computed(() => store.getters.currentNote)
    let notebooks = computed(() => store.getters.notebooks)
    let notes = computed(() => store.getters.notes)

    // created
    store.dispatch('getNotebooks')
        .then(_ => {
          store.commit('setCurrentBookId',{
            currentNotebookId: route.query.notebookId
          })
          return store.dispatch('getNotes',{ notebookId: currentNotebook.value.id })
        })
        .then(_ => {
          store.commit('setCurrentNoteId',{ currentNoteId: route.query.noteId })
          router.replace({
            path: '/note',
            query: {
              notebookId: currentNotebook.value.id,
              noteId: currentNote.value.id
            }
          })
        })

    // methods
    const onAddNote = () => {
      store.dispatch('addNote',{ notebookId: currentNotebook.value.id }).then(noteId => {
        store.commit('setCurrentNoteId',{ currentNoteId: noteId })
      })
    }

    const handleCommand = (notebookId) => {
      if (notebookId === 'trash') {
        return router.push({ path: '/trash' })
      }
      store.commit('setCurrentBookId',{ currentNotebookId: notebookId })
      store.dispatch('getNotes',{ notebookId }).then(_ => {
        store.commit('setCurrentNoteId')
        router.replace({
          path: '/note',
          query: {
            notebookId: currentNotebook.value.id,
            noteId: currentNote.value.id
          }
        })
      })
    }
    return {
      onAddNote,
      handleCommand,
      currentNotebook,
      currentNote,
      notebooks,
      notes
    }
  },
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>
