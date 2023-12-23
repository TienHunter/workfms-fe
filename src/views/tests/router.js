import UploadFileDemo from "./UploadFileDemo.vue";
const routerTest = [
   {
      path: "/test/upload-file",
      name: "UploadFile",
      meta: {
         layout: "default",
      },
      component: UploadFileDemo
   },
];
export default routerTest;
