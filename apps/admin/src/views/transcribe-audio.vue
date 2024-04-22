<script setup lang="ts">
  import { ArchiveOutline } from '@vicons/ionicons5';
  import type { FileInfo, OnChange } from 'naive-ui/es/upload/src/interface';
  import { ref } from 'vue';

  const fileList = ref<FileInfo[]>([]);

  const uploadChange: OnChange = (file) => {
    fileList.value = file.fileList;
  };
  const formSubmit = async () => {};
</script>

<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="音频内容转写"> 会议音频转写助手 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard" title="请上传需要转写的音频文件">
      <n-upload :multiple="false" directory-dnd :max="1" accept=".wav,.mp3" @change="uploadChange">
        <n-upload-dragger>
          <n-row class="space-x-4" align-items="center" justify-content="center">
            <n-icon size="48" :depth="3">
              <archive-outline />
            </n-icon>
            <div>
              <n-text style="font-size: 16px"> Click or drag a file to this area to upload </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0"> Limit 2GB per file WAV, MP3 </n-p>
            </div>
          </n-row>
        </n-upload-dragger>
      </n-upload>
      <n-space class="mt-4">
        <n-button type="primary" @click="formSubmit">开始转写</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped lang="scss"></style>
