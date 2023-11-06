import { ShowToastEvent } from "lightning/platformShowToastEvent";

export const caseObject = {
  AccountName: "",
  FirsName: "",
  LastName: "",
  Subject: "",
  Status: "",
  Origin: "",
  Description: "",
  PracticeWebsite: "",
  PracticeNoOfLocation: 0,
  PracticePhoneNumber: "",
  isCurrentCustomer: "",
  //InvitationLink:''
};

export class CaseHelper {
  // DropDown Options
  status = [
    { label: "New", value: "New" },
    { label: "In Progress", value: "In Progress" },
    { label: "Missing information", value: "Missing information" },
    { label: "On Hold", value: "On Hold" },
    { label: "Escalated", value: "Escalated" },
    { label: "Completed", value: "Completed" },
    { label: "Request Sent", value: "Request Sent" },
    { label: "Verification Code Pending", value: "Verification Code Pending" },
    { label: "Request Approved", value: "Request Approved" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "No Access", value: "No Access" },
    { label: "Missing Survey", value: "Missing Survey" },
  ];

  orgins = [
    { label: "Email", value: "Email" },
    { label: "Phone", value: "Phone" },
    { label: "Web", value: "Web" },
    { label: "Internal", value: "Internal" },
    { label: "Post Save", value: "Post Save" },
    { label: "Renewal", value: "Renewal" },
  ];

  isCurrentCustomers = [
    { label: "NO", value: "NO" },
    { label: "YES", value: "YES" },
  ];

  validateFields(obj) {
    let massages = [];
    if (typeof obj === "object") {
      if (this.isValueEmpty(obj.AccountName)) massages.push({ massage: ` Practice Name is required. ` });
      if (this.isValueEmpty(obj.FirsName)) massages.push({ massage: ` Doctors FirstName is required.` });
      if (this.isValueEmpty(obj.LastName)) massages.push({ massage: ` Doctors LastName is required.` });
      if (this.isValueEmpty(obj.Subject)) massages.push({ massage: ` Subject is required.` });
      // if(this.isValueEmpty(obj.Origin)) massages.push({massage: ` Origin is required.`})
      if (this.isValueEmpty(obj.PracticeWebsite)) massages.push({ massage: ` Practice Website is required.` });
      if (this.isValueEmpty(obj.PracticePhoneNumber)) massages.push({ massage: ` Phone Number is required.` });

      return massages;
    }
    return massages;
  }

  emptyFields = (obj) => {
    if (typeof obj === "object" && obj !== null) Object.keys(obj).forEach((key) => (obj[key] = ""));
  };

  /** if value doesn't exist return false, otherwise true. */
  isValueEmpty = (value) => (value ? false : true);

  showMassage = (title, msg, variant, dispatchObj) => {
    const e = new ShowToastEvent({ title: title, message: msg, variant: variant });
    dispatchObj.dispatchEvent(e);
  };
}