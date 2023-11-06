import insertCaseNew from '@salesforce/apex/CreateCaseDemo.insertCaseNew';
import getAccountServices from '@salesforce/apex/CreateCaseDemo.getAccountServices';


export default class CaseService {

    insertCase(caseObj) {
       return  insertCaseNew({ caseObj:JSON.stringify(caseObj)});
    }

    getChildAccounts() {
        return getChildAccounts();
    }

    async getCases(acctId) {
        let services  = [];
        
        try {
            let data  = await getAccountServices({accountId:acctId})
            services = data.map( pCase => ({ label: pCase.Subject, value: pCase.Id}))
            return services;
        }
        catch(error) {
            throw new Error(''+error);
        }
        
    }
    

}