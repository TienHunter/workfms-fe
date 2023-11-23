const hepler = {
   deepClone(value) {
      if (value === undefined) {
         value = null;
      }
      return JSON.parse(JSON.stringify(value));
   }
};
export default hepler;