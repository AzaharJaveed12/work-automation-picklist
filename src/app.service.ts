import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  convertXMLtoJSON(data: any) {
    const parsingString = xml2js.parseString;
    let jsonData = null;
    parsingString(data, (err, result) => {
      // console.log(JSON.stringify(result));
      jsonData = result;
    });
    return jsonData;
  }

  sendXML(body: any): any {
    const jsonData = this.convertXMLtoJSON(body as string);
    fs.writeFileSync('./foo.json', JSON.stringify(jsonData));
    return jsonData;
  }

  mapDataAndCreateFile(data: any) {
    const mappedData = [];
    const version = 7377;
    //  console.log(data);
    data.forEach((item, index) => {
      //console.log(item);
      const requiredData = {
        version: version + index,
        packageIdentifiers: [
          {
            type: '1',
            value: item.$.UPC,
          },
        ],
        longDescription: {
          values: [
            {
              locale: 'en-US',
              value: item.Languages[0].Language.filter((language) => {
                return language.$.LCID == '0409';
              })[0].Description[0],
            },

            {
              locale: 'en-GB',

              value: item.Languages[0].Language.filter((language) => {
                return language.$.LCID == '0409';
              })[0].Description[0],
            },
          ],
        },

        shortDescription: {
          values: [
            {
              locale: 'en-US',

              value: item.Languages[0].Language.filter((language) => {
                return language.$.LCID == '0409';
              })[0].Description[0],
            },

            {
              locale: 'en-GB',

              value: item.Languages[0].Language.filter((language) => {
                return language.$.LCID == '0409';
              })[0].Description[0],
            },
          ],
        },

        merchandiseCategory: {
          nodeId: '1-1-2F-002-001-023',
        },

        alternateCategories: [],

        status: 'ACTIVE',

        departmentId: item.Department[0],

        nonMerchandise: false,

        familyCode: '1',

        referenceId: item.$.UPC,

        externalIdentifiers: [],

        dynamicAttributes: [
          {
            type: 'retail-item',

            attributes: [
              {
                key: 'ITEM_TYPE_CODE',

                value: '16',
              },
            ],
          },
        ],

        itemId: {
          itemCode: item.$.UPC,
        },
      };
      const itemCategory = item.Languages[0].Language.categories[0];
      fs.appendFileSync(
        `./categories//${{ itemCategory }}.json`,
        JSON.stringify(requiredData),
      );
      mappedData.push(requiredData);
    });
    //fs.writeFileSync('./fooMapped.json', JSON.stringify(mappedData));
    fs.writeFileSync('./fooMapped.json', JSON.stringify(mappedData));
    return mappedData;
  }

  getMappedData() {
    const file = fs.readFileSync('./foo.json', 'utf-8');
    // console.log(JSON.parse(orginalData));
    const jsonData = JSON.parse(file);
    //  console.log(jsonData);
    this.mapDataAndCreateFile(jsonData.PickList.Items[0].Item);
    return jsonData;
  }
}
