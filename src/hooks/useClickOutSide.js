// useClickOutside.js
import { ref, onMounted, onUnmounted } from 'vue';

const useClickOutside = (elementRef) => {
   const isClickOutside = ref(false);

   const handleClickOutside = (event) => {
      if (elementRef.value && !elementRef.value.contains(event.target)) {
         isClickOutside.value = true;
      } else {
         isClickOutside.value = false;
      }
   };

   onMounted(() => {
      document.addEventListener('click', handleClickOutside);
   });

   onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
   });

   return isClickOutside;
};

export default useClickOutside;
