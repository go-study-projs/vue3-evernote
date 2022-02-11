<template>
  <div id="note" class="detail">
    <NoteSidebar v-model="notes"></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期: {{ $filters.friendlyDate(currentNote.createdAt) }}</span>
          <span>|</span>
          <span>更新日期: {{ $filters.friendlyDate(currentNote.updatedAt) }}</span>
          <span>|</span>
          <span class="save">{{ statusText }}</span>
          <span
              class="iconfont icon-fullscreen"
              @click="isShowPreview = !isShowPreview"
          ></span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
        </div>
        <div class="note-title">
          <input
              type="text"
              v-model="currentNote.title"
              @input="onUpdateNote"
              @keydown="statusText = '输入中...'"
              placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <textarea
              v-show="!isShowPreview"
              v-model="currentNote.content"
              @input="onUpdateNote"
              @keydown="statusText = '输入中...'"
              placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
              class="preview markdown-body"
              v-html="previewContent"
              v-show="isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NoteSidebar from '@/components/NoteSidebar'
import _ from 'lodash'
import {computed, ref, unref} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const store = useStore()
const router = useRouter()
const route = useRoute()

let statusText = ref('笔记未更新')
let isShowPreview = ref(false)
let currentNote = computed(() => store.getters.currentNote)
let notes = computed(() => store.getters.notes)
let previewContent = computed(() => md.render(unref(currentNote).content || ''))

const onUpdateNote = _.debounce(function () {
  const {id: noteId, title, content} = currentNote.value
  store.dispatch('updateNote', {noteId, title, content})
      .then(data => {
        statusText.value = '已保存'
      })
      .catch(data => {
        statusText.value = '保存出错'
      })
}, 300)

const onDeleteNote = () => {
  store.dispatch('deleteNote', {noteId: unref(currentNote).id}).then(data => {
    router.replace({
      path: '/note',
      query: {
        noteId: unref(currentNote).id
      }
    })
  })
}

onBeforeRouteUpdate(async (to, from, next) => {
  store.commit('setCurrentNoteId', {currentNoteId: to.query.noteId})
  next()
})
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  flex: 1;
  background-color: #fff;
}
</style>
