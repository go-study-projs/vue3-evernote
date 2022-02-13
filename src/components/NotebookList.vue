<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <i class="iconfont icon-plus"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            :key="notebook.id"
            :to="`note?notebookId=${notebook.id}`"
            class="notebook"
          >
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts || 0 }}</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">
                删除
              </span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">
                编辑
              </span>
              <span class="date">{{
                $filters.friendlyDate(notebook.createdAt)
              }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { getCurrentInstance, computed } from 'vue';

const { $confirm, $prompt } =
  getCurrentInstance().appContext.config.globalProperties;
const store = useStore();

// created
store.dispatch('getNotebooks');

const notebooks = computed(() => store.getters.notebooks);

// methods
const onCreate = () => {
  $prompt('请输入笔记本标题', '新建笔记本', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: '标题必须在1-30个字符之间',
  }).then(({ value }) => {
    store.dispatch('addNotebook', { title: value });
  });
};

const onEdit = (notebook) => {
  $prompt('请输入新的笔记本标题', '编辑笔记本', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputValue: notebook.title,
    inputErrorMessage: '标题必须在1-30个字符之间',
  }).then(({ value }) => {
    store.dispatch('updateNotebook', { notebookId: notebook.id, title: value });
  });
};

const onDelete = (notebook) => {
  $confirm(`是否删除笔记本 ${notebook.title} ?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then((_) => {
    store.dispatch('deleteNotebook', { notebookId: notebook.id });
  });
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
