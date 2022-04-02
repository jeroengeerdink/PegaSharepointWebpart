import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './PegaWebembedWebPart.module.scss';

export interface IPegaWebembedWebPartProps {
}

export default class PegaWebembedWebPart extends BaseClientSideWebPart<IPegaWebembedWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.pegaWebembed }">XXXXXXX</div>`;

    /*"<script src='https://prod.constellation.pega.io/c11n/pega-embed.js' ></script>"
    +"<pega-embed id='theEmbed' action='createCase' caseTypeID='OC7LNP-Concierge-Work-ExcelCase' casePage='' appAlias='concierge' pegaServerUrl='https://87.pegatsdemo.com/prweb/' staticContentUrl='https://prod.constellation.pega.io/c11n/' authService='pega' clientId='33444740565190151670' style='width:100%'>"
    +"</pega-embed>";*/

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
