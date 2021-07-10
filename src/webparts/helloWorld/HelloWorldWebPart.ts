import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

 

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import { PropertyPaneDescription } from 'HelloWorldWebPartStrings';

 

export interface IHelloWorldFromSpFxWebPartProps {
  description: string;
  productname: string;
  productdescription: string;
  productcost: number;
  quantity: number;
  billamount: number;
  discount: number;
  netbillamount: number;

 

  currentTime:Date,
  IsCertified:boolean,
  rating:number
}

 

export default class HelloWorldFromSpFxWebPart extends BaseClientSideWebPart<IHelloWorldFromSpFxWebPartProps> {

 

  protected onInit():Promise<void>{
    return new Promise<void>((resolve,_reject)=>{
      this.properties.productname="Mouse";
      this.properties.productdescription="Mouse Description";
      this.properties.quantity=500;
      this.properties.productcost=300;
      resolve(undefined);
    });
  }
  protected get disableReactivePropertyChanges():boolean{
    return true;
  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">

 

<table>
<tr>
<td>Product Name</td>
<td>${this.properties.productname}</td>
</tr>
<tr>
<td>Description</td>
<td>${this.properties.productdescription}</td>
</tr>
<tr>
<td>Product Cost</td>
<td>${this.properties.productcost}</td>
</tr>
<tr>
<td>Product Quantity</td>
<td>${this.properties.quantity}</td>
</tr>
<tr>
<td>Bill Amount</td>
<td>${this.properties.billamount=this.properties.productcost*this.properties.quantity}</td>
</tr>
<tr>
<td>Discount</td>
<td>${this.properties.discount=this.properties.billamount*10/100}</td>
</tr>
<tr>
<td>Net Bill Amount</td>
<td>${this.properties.netbillamount=this.properties.billamount-this.properties.discount}</td>
</tr>
<tr>
<td>Is Certfied?</td>
<td>${this.properties.IsCertified}</td>
</tr>
</table>

 

            </div>
          </div>
        </div>
      </div>`;
  }

 

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

 

  //   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //     return {
  //       pages: [
  //         {
  //           header: {
  //             description: strings.PropertyPaneDescription
  //           },
  //           groups: [
  //             {
  //               groupName: strings.BasicGroupName,
  //               groupFields: [
  //                 PropertyPaneTextField('description', {
  //                   label: strings.DescriptionFieldLabel
  //                 })
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     };
  //   }
  // }

 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [{
            groupName: "Product Details",
            groupFields: [
              PropertyPaneTextField('productname', {
                label: "Product Name",
                multiline: false,
                resizable: false,
                deferredValidationTime: 5000,
                placeholder: "Please enter product name", "description": "Name property field"
              }),
              PropertyPaneTextField('productdescription', {
                label: "Product Description",
                multiline: true,
                resizable: false,
                deferredValidationTime: 5000,
                placeholder: "Please enter product Desciption", "description": "Name property field"
              }),
              PropertyPaneTextField('productcost', {
                label: "Product Cost",
                multiline: false,
                resizable: false,
                deferredValidationTime: 5000,
                placeholder: "Please enter product cost", "description": "Number property field"
              }),
              PropertyPaneTextField('quantity', {
                label: "Quantity",
                multiline: false,
                resizable: false,
                deferredValidationTime: 5000,
                placeholder: "Please enter Quantity", "description": "Number property field"
              }),
           

 

              PropertyPaneSlider('Rating', {
                label: "select your rating",
                min: 1,
                max: 10,
                step:1,
                showValue: true,
                value: 1
              }),

 

            ]
          },
        {
          groupName: "Vendor Details 2",
          groupFields:[
            PropertyPaneToggle("IsCertified",{
              key:"IsCertified",
              label:"Is it Certified?",
              onText:"ISI Certified",
              offText:"Not an ISI Certified Product"
            }),
          ]
        }
        ],
        displayGroupsAsAccordion:true
        }
      ]
    }
  }
}