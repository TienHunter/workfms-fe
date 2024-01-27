
import Enums from "../enums";

export const getAccessibleWorkspace = (key) => {
   switch (key) {
      case Enums.WorkspaceType.Private:
         return t('common.Private');
      case Enums.WorkspaceType.Public:
         return t('common.Public');
      default:
         return "";
   }
}
