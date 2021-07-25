import { onBeforeUnmount, onMounted } from 'vue';

const useWindowEvent = <K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => {
  onMounted(() => {
    window.addEventListener(type, listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener(type, listener);
  });
}

export default useWindowEvent
