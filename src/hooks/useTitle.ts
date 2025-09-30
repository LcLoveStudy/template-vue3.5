import { ref, watch, type Ref } from 'vue'
const title = ref('')
watch(
  () => title.value,
  (newValue, oldValue) => {
    if (document && newValue !== oldValue) {
      document.title = newValue
    }
  },
  {
    immediate: true
  }
)

export const useTitle = (initValue: string): Ref<string> => {
  title.value = initValue
  return title
}
