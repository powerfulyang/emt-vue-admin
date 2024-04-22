<script setup lang="ts">
  import { aiToolsProxy } from '@/request';
  import { aiToolsUpload } from '@/utils/aiToolsUpload.ts';
  import { generateDocx } from '@/utils/generateDocx.ts';
  import { useMutation } from '@tanstack/vue-query';
  import { SettingOutlined } from '@vicons/antd';
  import type { FormInst } from 'naive-ui';
  import type { OnChange } from 'naive-ui/es/upload/src/interface';
  import { stringify } from 'qs';
  import { ref, toRaw } from 'vue';

  const formRef = ref<FormInst>(null!);
  const generateDefaultFormValues = () => {
    return {
      // 是否语篇规整
      is_correct_text: false,
      // 是否区分发言人
      identify_speakers: false,
      // 是否需要发言人总结
      speaker_summary_needed: false,
    };
  };
  const formValue = ref(generateDefaultFormValues());
  const rules = {};

  const meetingSummary = ref('');
  const meetingIntro = ref('');
  const meetingContent = ref('');
  const detailContent = ref('');

  const { mutate: getIntro, isPending: isPendingGetIntro } = useMutation({
    mutationFn: async (file: File) => {
      const res = await aiToolsUpload<{
        content: string;
      }>({
        file,
        url: '/file-content',
      });
      return res.content;
    },
    onSuccess(data) {
      meetingIntro.value = data;
    },
  });

  const { mutate: getContent, isPending: isPendingGetContent } = useMutation({
    mutationFn: async (file: File) => {
      const params = toRaw(formValue.value);
      const res = await aiToolsUpload<{
        transcription_text: string;
      }>({
        file,
        url: `/transcribe-audio/?${stringify(params)}`,
      });
      return res.transcription_text;
    },
    onSuccess(data) {
      meetingContent.value = data;
    },
  });

  const uploadAudio: OnChange = async (file) => {
    const f = file.fileList[0];
    if (f?.file) {
      getContent(f.file);
    }
  };

  const uploadIntro: OnChange = async (file) => {
    const f = file.fileList[0];
    if (f?.file) {
      getIntro(f.file);
    }
  };

  const { isPending: isPendingSummary, mutate: summary } = useMutation({
    mutationFn: async () => {
      // 基于 intro 和 content 生成会议纪要
      let intro = '';
      if (meetingIntro.value) {
        const introRes = await aiToolsProxy<{
          intro_paragraph: {
            result: string;
          };
        }>(
          `/generate-intro-paragraph/?${stringify({
            meeting_agenda: meetingIntro.value,
          })}`,
          {
            method: 'post',
          }
        );
        intro = introRes.intro_paragraph.result;
      }
      const contentRes = await aiToolsProxy<{
        final_summary: string;
        speaker_summary?: string;
        detailed_summary?: string;
      }>(
        `/summarize-text/?${stringify({
          text_data: meetingContent.value,
        })}`,
        {
          method: 'post',
        }
      );
      return {
        intro,
        ...contentRes,
      };
    },
    onMutate() {
      meetingSummary.value = '';
      detailContent.value = '';
    },
    onSuccess(data) {
      const { intro, final_summary, speaker_summary, detailed_summary } = data;
      meetingSummary.value = [intro, final_summary, speaker_summary].filter(Boolean).join('\n\t');
      if (detailed_summary) {
        detailContent.value = detailed_summary;
      }
    },
  });

  const formSubmit = async () => {
    summary();
  };

  const showSettingModal = ref(false);
</script>

<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="会议纪要生成">
        会议纪要助手，通过填写会议信息，上传会议议程或通知，上传会议音频文件，生成会议纪要。
        <template #header-extra v-if="false">
          <setting-outlined class="w-5 cursor-pointer" @click="showSettingModal = true" />
        </template>
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard" title="控制台">
      <n-form :label-width="90" :model="formValue" :rules="rules" ref="formRef">
        <n-row class="mt-4" gutter="20">
          <n-col span="12">
            <n-form-item label="会议议程或通知" path="meeting-intro">
              <n-spin class="w-full" :show="isPendingGetIntro" description="会议议程读取中">
                <n-input
                  :rows="10"
                  type="textarea"
                  v-model:value="meetingIntro"
                  placeholder="请输入会议议程或通知"
                />
              </n-spin>
            </n-form-item>
            <n-upload
              :multiple="false"
              directory-dnd
              :max="1"
              accept=".pdf,.docx,.txt"
              @change="uploadIntro"
              @click="showSettingModal = true"
            >
              <n-upload-dragger>
                <n-row class="space-x-4" align-items="center" justify-content="center">
                  <n-text> 点击或拖拽会议议程或通知文件到此区域将自动识别内容 </n-text>
                  <n-p depth="3"> 限制2GB每个文件 PDF, DOCX, TXT </n-p>
                </n-row>
              </n-upload-dragger>
            </n-upload>
          </n-col>
          <n-col span="12">
            <n-form-item label="会议记录" path="meeting-content">
              <n-spin class="w-full" :show="isPendingGetContent" description="音频转译中">
                <n-input
                  :rows="10"
                  type="textarea"
                  v-model:value="meetingContent"
                  placeholder="请输入会议记录"
                />
              </n-spin>
            </n-form-item>
            <n-flex>
              <n-form-item label="是否语篇规整" path="is_correct_text">
                <n-switch v-model:value="formValue.is_correct_text" />
              </n-form-item>
              <n-form-item label="是否区分发言人" path="identify_speakers">
                <n-switch v-model:value="formValue.identify_speakers" />
              </n-form-item>
              <n-form-item
                v-show="formValue.identify_speakers"
                label="是否需要发言人总结"
                path="speaker_summary_needed"
              >
                <n-switch v-model:value="formValue.speaker_summary_needed" />
              </n-form-item>
            </n-flex>
            <n-upload
              :multiple="false"
              directory-dnd
              :max="1"
              accept=".wav,.mp3"
              @change="uploadAudio"
            >
              <n-upload-dragger>
                <n-row class="space-x-4" align-items="center" justify-content="center">
                  <n-text> 点击或拖拽会议音频文件到此区域将自动识别内容 </n-text>
                  <n-p depth="3"> 限制2GB每个文件 WAV, MP3 </n-p>
                </n-row>
              </n-upload-dragger>
            </n-upload>
          </n-col>
        </n-row>

        <n-space class="mt-4">
          <n-button :loading="isPendingSummary" type="error" @click="formSubmit"
            >生成会议纪要</n-button
          >
          <n-button
            v-if="meetingSummary"
            type="primary"
            @click="
              () => {
                generateDocx('hhh', meetingSummary);
              }
            "
            >下载会议纪要</n-button
          >
          <n-button
            v-if="detailContent"
            type="primary"
            @click="
              () => {
                generateDocx('hhh', detailContent);
              }
            "
            >下载会议纪要详情</n-button
          >
        </n-space>

        <n-row gutter="20">
          <n-col span="12">
            <n-form-item v-if="meetingSummary" class="mt-4" label="会议纪要">
              <n-input :rows="10" type="textarea" v-model:value="meetingSummary" />
            </n-form-item>
          </n-col>
          <n-col span="12">
            <n-form-item v-if="detailContent" class="mt-4" label="会议纪要详情">
              <n-input :rows="10" type="textarea" v-model:value="detailContent" />
            </n-form-item>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped lang="scss"></style>
