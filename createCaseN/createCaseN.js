/* eslint-disable no-unused-vars */
import insertCaseNew from "@salesforce/apex/CreateCaseDemo.insertCaseNew";
import validateLoginPassword from "@salesforce/apex/CreateCaseDemo.validatePassword";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { LightningElement, track } from "lwc";

// DropDown Options
// const STATUS_OPTIONS = [
//   { label: 'New', value: 'New' },
//   { label: 'In Progress', value: 'In Progress' },
//   { label: 'Missing information', value: 'Missing information' },
//   { label: 'On Hold', value: 'On Hold' },
//   { label: 'Escalated', value: 'Escalated' },
//   { label: 'Completed', value: 'Completed' },
//   { label: 'Request Sent', value: 'Request Sent' },
//   { label: 'Verification Code Pending', value: 'Verification Code Pending' },
//   { label: 'Request Approved', value: 'Request Approved' },
//   { label: 'Cancelled', value: 'Cancelled' },
//   { label: 'No Access', value: 'No Access' },
//   { label: 'Missing Survey', value: 'Missing Survey' },
// ];

// const ORIGIN_OPTIONS = [
//   { label: 'Email', value: 'Email' },
//   { label: 'Phone', value: 'Phone' },
//   { label: 'Web', value: 'Web' },
//   { label: 'Internal', value: 'Internal' },
//   { label: 'Post Save', value: 'Post Save' },
//   { label: 'Renewal', value: 'Renewal' },
// ];

const IS_CURRENT_CUSTOMER_OPTIONS = [
  { label: "NO", value: "NO" },
  { label: "YES", value: "YES" }
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const caseObject = {
  AccountName: "",
  FirstName: "",
  LastName: "",
  Subject: "",
  Status: "",
  Origin: "",
  Description: "",
  PracticeWebsite: "",
  RequestedBy: "",
  PracticeNoOfLocation: 0,
  PracticPhone: "",
  isCurrentCustomer: "",
  Email: ""
};
export default class CreateCaseN extends LightningElement {
  @track showSpinner = false;
  //@track message='';
  @track caseObj = caseObject;
  @track services = [];
  @track invite = "";
  @track activeTabValue = "";
  @track selectedValue = "";
  @track tabContent = "";
  @track customerPicklistValue = false;
  extractedWord;

  //Custom Login Variables
  @track isLoggedIn = false;
  @track loginPassword = "";
  @track errorMessage = "";

  connectedCallback() {
    // Get the current Url and find the object name.
    const BASE_URL = window.location.href;
    const basePath = "/deardochome/s/";

    // Check if the URL ends with the base path
    if (BASE_URL.endsWith(basePath)) {
      this.extractedWord = "PrescriptionPR";
      console.log("this.extractedWord", this.extractedWord);
    }
  }

  //Get the value from password field
  handleInputPassword(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  //Validate password on click
  async validatePassword() {
    //Show loading Spinner
    this.showSpinner = true;

    if (this.loginPassword) {
      try {
        const result = await validateLoginPassword({ x: this.loginPassword });
        switch (result) {
          case "Success":
            // Hide the loading Spinner
            this.showSpinner = false;

            // Display the create case component
            this.isLoggedIn = true;

            break;

          case "Password does not match":
            // Hide the loading Spinner
            this.showSpinner = false;

            //Show Error Message
            this.errorMessage = result;

            //Clear the password field
            this.loginPassword = "";
            break;

          default:
            // Hide the loading Spinner
            this.showSpinner = false;
            break;
        }
      } catch (error) {
        // Show a Toast Message
        this.showToast(
          `Error Code ${error.status}`,
          `${error.statusText}`,
          "error"
        );

        //Hide the loading Spinner
        this.showSpinner = false;

        //Throw Error
        throw new Error(error);
      } finally {
        //Hide the loading Spinner
        this.showSpinner = false;
      }
    } else {
      this.showToast(`Enter a valid password`, ``, `error`);
      // Hide the loading Spinner
      this.showSpinner = false;
    }
  }

  get isCurrentCustomersOptions() {
    return [
      { label: "NO", value: "NO" },
      { label: "YES", value: "YES" }
    ];
  }

  handleAccountName = (event) => {
    this.caseObj = { ...this.caseObj, AccountName: event.target.value };
  };

  handleFirstName = (event) => {
    this.caseObj = { ...this.caseObj, FirstName: event.target.value };
  };

  handleLastName = (event) => {
    this.caseObj = { ...this.caseObj, LastName: event.target.value };
  };

  handleSubject = (event) => {
    this.caseObj = { ...this.caseObj, Subject: event.target.value };
  };
  handleEmail = (event) => {
    this.caseObj = { ...this.caseObj, Email: event.target.value };
  };
  handleDescription = (event) => {
    this.caseObj = { ...this.caseObj, Description: event.target.value };
  };

  handlePracticeWebsite = (event) => {
    this.caseObj = { ...this.caseObj, PracticeWebsite: event.target.value };
  };

  handleRequestedBy = (event) => {
    this.caseObj = { ...this.caseObj, RequestedBy: event.target.value };
  };

  handlePracticeNoOfLocation = (event) => {
    this.caseObj = {
      ...this.caseObj,
      PracticeNoOfLocation: event.target.value
    };
  };

  handlePracticPhone = (event) => {
    this.caseObj = { ...this.caseObj, PracticPhone: event.target.value };
  };

  handleIsCurrentCustomers = (event) => {
    this.caseObj = { ...this.caseObj, isCurrentCustomer: event.target.value };
    this.selectedValue = this.caseObj.isCurrentCustomer;
    console.log("log this.caseObj.isCurrentCustomer:::", this.selectedValue);
    if (this.selectedValue === "YES") {
      this.customerPicklistValue = true;
      // handleClick();
      //const tab2 = this.template.querySelector("[data-id='tab2']");
      this.template.querySelector("lightning-tabset").activeTabValue = "tab2";
    }
    if (this.selectedValue === "NO") {
      this.customerPicklistValue = false;
    }
  };

  handleActive(event) {
    const tab = event.target.value;
    console.log("tab: ", tab);
    this.tabContent = `Tab ${event.target.value} is now active`;
  }

  handleReset = () => {
    this.caseObj = caseObject;
    console.log("Accounts>>>>>>>>>", this.accounts);
  };

  handleSubmit = () => {
    //Show Spinner
    this.isLoaded = true;

    let allValid = true;
    // Get all required fields by name attribute
    const requiredFields1 = this.template.querySelectorAll(
      "lightning-input, lightning-combobox"
    ); //("lightning-combobox","lightning-input");//lightning-input
    // Validate required fields
    requiredFields1.forEach((field) => {
      if (!field.value) {
        allValid = false;

        // Show a toast message with the label of the required field
        const fieldName = field.label;
        console.log("log:: field", fieldName);

        //Show Spinner
        this.isLoaded = false;
        const toastEvent = new ShowToastEvent({
          title: "Error",
          message: `${fieldName} is required`,
          variant: "error"
        });
        this.dispatchEvent(toastEvent);
      }
    });
    if (allValid) {
      insertCaseNew({
        caseObj: JSON.stringify(this.caseObj),
        parentAccount: "PrescriptionPR"
      })
        .then((result) => {
          this.isLoaded = false;
          this.caseObj = caseObject;
          this.showToast(
            "Success",
            "Thank you for your query. We will get back to you.",
            "success"
          );
          console.log("result: ", result);
        })
        .catch((error) => {
          this.isLoaded = false;
          this.showToast("Error ", error, "error");
          console.log("test error on save>>", error);
        });
      // Submit form code here
    }
    // Submit form if all required fields are valid
    //    if (allValid) {
    //     insertCaseNew({ caseObj: JSON.stringify(this.caseObj) })
    //             .then(result => {
    //                 this.isLoaded = false;
    //                 this.caseObj = caseObject;
    //                 this.showToast('Success', 'Thank you for your query. We will get back to you.', 'success');
    //                 console.log('result: ', result);
    //             })
    //             .catch(error => {
    //                 this.isLoaded = false;
    //                 this.showToast('Error ', error, 'error');
    //                 console.log('test error on save>>', error);
    //             });
    //     // Submit form code here
    //   }
    // this.isLoaded = true;
    // const requiredFields = ['AccountName', 'FirstName', 'LastName', 'Subject', 'Description','isCurrentCustomer'];
    // const missingFields = requiredFields.filter(field => !this.caseObj[field]);

    // if (missingFields.length) {
    //     this.isLoaded = false;
    //     missingFields.forEach(field => {
    //         const message = `Please enter ${field}`;
    //         this.showToast('Error', message, 'error');
    //     });
    // } else {
    // insertCaseNew({ caseObj: JSON.stringify(this.caseObj) })
    //     .then(result => {
    //         this.isLoaded = false;
    //         this.caseObj = caseObject;
    //         this.showToast('Success', 'Thank you for your query. We will get back to you.', 'success');
    //         console.log('result: ', result);
    //     })
    //     .catch(error => {
    //         this.isLoaded = false;
    //         this.showToast('Error ', error, 'error');
    //         console.log('test error on save>>', error);
    //     });
  };

  showToast = (title, message, variant) => {
    const event = new ShowToastEvent({
      title,
      message,
      variant
    });
    this.dispatchEvent(event);
  };
}