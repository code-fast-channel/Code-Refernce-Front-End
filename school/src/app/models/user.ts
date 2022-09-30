export interface IUser{
     
     personalInfo: PersonalInfo;
     contact: Contact
}

interface PersonalInfo {
     orgId: any;
     userId: any;
     firstName: string;
     lastName: string;
     gender: number;
     picPath: string;
}

interface Address {
     countryId: any;
     countryName: string;
     stateId: any;
     stateName: string;
     cityId: any;
     cityName: string;
     address: string
}

interface Contact {
     mobNumber: string;
     landLineNumber: string;
     emailId: string
}