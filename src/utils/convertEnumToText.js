import Enums from "../enums";


export const getAccessibleWorkspace = (key) => {
   switch (key) {
      case Enums.WorkspaceType.Private:
         return "Riêng tư";
      case Enums.WorkspaceType.Public:
         return "Công khai";
      default:
         return "";
   }
}
