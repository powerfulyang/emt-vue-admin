export const storageKey = 'summary-setting-model:form-value';

export interface FormValue {
  is_correct_text?: boolean;
  identify_speakers?: boolean;
  speaker_summary_needed?: boolean;
}

export const getInitialValue = (): FormValue => {
  const str = localStorage.getItem(storageKey);
  if (str) {
    return JSON.parse(str);
  } else {
    return {
      is_correct_text: false,
      identify_speakers: false,
      speaker_summary_needed: false,
    };
  }
};
