declare interface IPegaWebembedWebPartStrings {
  PropertyPaneDescription: string;
  connectionGroupName: string;
  settingsGroupName: string;
 
  id_Label: string;
  action_Label: string;
  casetype_Label: string;
  casepage_Label: string;
  alias_Label: string;
  serverUrl_Label: string;
  authservice_Label: string;
  cliendId_Label: string;
  pageId_Label: string;
  assignmentId_Label: string;
  caseId_Label: string;

  action_createcase_Label: string;
  action_displaycase_Label: string;
  action_getnextwork_Label: string;
  action_openassignment_Label: string;
  action_opencase_Label: string;

  casepage_assignmentonly_Label: string;
  casepage_assignmentwithstages_Label: string;
  casepage_fullcase_Label: string;
}

declare module 'PegaWebembedWebPartStrings' {
  const strings: IPegaWebembedWebPartStrings;
  export = strings;
}
