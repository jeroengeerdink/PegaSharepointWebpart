// https://pegasystems.sharepoint.com/sites/SP-DACHAll/_layouts/15/workbench.aspx


import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import * as strings from 'PegaWebembedWebPartStrings';

import styles from './PegaWebembedWebPart.module.scss';

export interface IPegaWebembedWebPartProps {
  action: string;
  casetype: string;
  casepage: string;
  alias: string;
  serverUrl: string;
  authservice: string;
  clientId: string;
  pageId: string;
  assignmentId: string;
  caseId: string;
  active: boolean;
  advanced: boolean;
  selectedServer: string;

  servers: {
    alias: string;
    label: string;
    serverUrl: string;
    authservice: string;
    clientId: string;
  }[];
}

export default class PegaWebembedWebPart extends BaseClientSideWebPart<IPegaWebembedWebPartProps> {

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    this.render();
  }

  protected onInit(): Promise<void> {
    let x = super.onInit();
    alert(JSON.stringify(this.properties));
    return x;
  }

  public render(): void {
    if (this.properties.action.length > 5 
      && this.properties.serverUrl != undefined 
      && this.properties.serverUrl.length > 0
      && this.properties.alias != undefined
      && this.properties.clientId != undefined
      && this.properties.authservice != undefined
      && this.properties.alias.length > 0
      && this.properties.clientId.length > 0
      && this.properties.authservice.length > 0
      ){
      this.domElement.innerHTML = 
      `<pega-embed 
          id='theEmbed' 
          action='${this.properties.action}' 
          caseTypeID='${this.properties.casetype}' 
          casePage='${this.properties.casepage}' 
          appAlias='${this.properties.alias}' 
          pegaServerUrl='${this.properties.serverUrl}' 
          staticContentUrl='https://prod.constellation.pega.io/c11n/' 
          authService='${this.properties.authservice}' 
          clientId='${this.properties.clientId}'
          assignmentId='${this.properties.assignmentId}'
          pageId='${this.properties.pageId}'
          caseId='${this.properties.caseId}'
          style='width:100%'>
      </pega-embed>`;
      const script = document.createElement("script");
      script.src = "https://prod.constellation.pega.io/c11n/pega-embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
    else {
      this.domElement.innerHTML = "Please apply settings first";
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    var options = [];
    var serverOptions = [];

    
    if (this.properties.action == "createCase") {
      options.push( PropertyPaneTextField('casetype', {
        label: strings.casetype_Label
      }));
    }

    if (this.properties.action == "openPage") {
      options.push( PropertyPaneTextField('pageId', {
        label: strings.pageId_Label
      }));
    }

    if (this.properties.action == "openAssignment") {
      options.push( PropertyPaneTextField('assignmentId', {
        label: strings.assignmentId_Label
      }));
    }

    if (this.properties.action == "openCase") {
      options.push( PropertyPaneTextField('caseId', {
        label: strings.caseId_Label
      }));
    }

    if (this.properties.advanced) {
      serverOptions = [
        PropertyPaneTextField('serverUrl', {
          label: strings.serverUrl_Label
        }),
        PropertyPaneTextField('alias', {
          label: strings.alias_Label
        }),
        PropertyPaneTextField('clientId', {
          label: strings.cliendId_Label
        }),
        PropertyPaneTextField('authservice', {
          label: strings.authservice_Label,
          
        })
      ];
    }
    else if (typeof this.properties.servers != "undefined"){
      var serverNames = [];
      this.properties.servers.forEach ((item) => {
        serverNames.push({
          key: item.serverUrl,
          text: (item.label != undefined)?item.label:item.serverUrl
        });
      });
      serverOptions = [
        PropertyPaneDropdown('selectedServer', {
          label: strings.action_Label,
          options: serverNames
        })
      ];

      this.properties.servers.forEach((item) => {
        if (item.serverUrl == this.properties.selectedServer){
          this.properties.authservice = item.authservice;
          this.properties.clientId = item.clientId;
          this.properties.alias = item.alias;
        }
      });
    }





    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.connectionGroupName,
              groupFields: serverOptions
            },
            {
              groupName: strings.settingsGroupName,
              groupFields: [
                PropertyPaneDropdown('action', {
                  label: strings.action_Label,
                  options: [{
                    key: 'createCase',
                    text: strings.action_createcase_Label
                  },
                  {
                    key: 'openPage',
                    text: strings.action_displaycase_Label
                  },
                  {
                    key: 'getNextWork',
                    text: strings.action_getnextwork_Label
                  },
                  {
                    key: 'openAssignment',
                    text: strings.action_openassignment_Label
                  },
                  {
                    key: 'openCase',
                    text: strings.action_opencase_Label
                  }]
                }),
                PropertyPaneDropdown('casepage', {
                  label: strings.casepage_Label,
                  options: [{
                    key: '',
                    text: strings.casepage_assignmentonly_Label
                  },
                  {
                    key: 'assignmentWithStages',
                    text: strings.casepage_assignmentwithstages_Label
                  },
                  {
                    key: 'full',
                    text: strings.casepage_fullcase_Label
                  }]
                })
              ].concat(options)
            }
          ]
        }
      ]
    };
  }
}
