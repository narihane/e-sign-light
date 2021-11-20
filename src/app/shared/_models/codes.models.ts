export interface CodeSearch {
  codeUsageRequestID: number;
  codeTypeName: string;
  codeID: string;
  itemCode: string;
  codeNamePrimaryLang: string;
  codeNameSecondaryLang: string;
  descriptionPrimaryLang: string;
  descriptionSecondaryLang: string;
  parentCodeID: number;
  parentItemCode: string;
  parentCodeNamePrimaryLang: number;
  parentCodeNameSecondaryLang: string;
  parentLevelName: string;
  levelName: string;
  requestCreationDateTimeUtc: string;
  codeCreationDateTimeUtc: string;
  activeFrom: string;
  activeTo: string;
  active: number;
  status: string;
  statusReason: string;
  ownerTaxpayer: {
    rin:string;
    name:string;
    nameAr:string
  };
  requesterTaxpayer: {
    rin:string;
    name:string;
    nameAr:string
  };
  codeCategorization: {
    level1:subCategorization;
    level2:subCategorization;
    level3:subCategorization;
    level4:subCategorization;
  };
}

export interface subCategorization{
  id:number;
  name:string;
  nameAr:string;
}

export interface codesResult{
  result:CodeSearch[];
  metadata:{
    totalPages:number;
    totalCount:number;
  }
}
