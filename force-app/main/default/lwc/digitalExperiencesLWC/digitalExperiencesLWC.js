import { LightningElement } from 'lwc';
import linkedinBanner from '@salesforce/resourceUrl/linkedin_banner';

export default class DigitalExperiencesLWC extends LightningElement {

    title = 'Salesforce Developer & Integration Specialist';
    subtitle = 'Experience Cloud · LWC · Integraciones · Financial Services Cloud';
    submitted = false;
    bannerUrl = linkedinBanner;

    handleSubmit(event) {
        event.preventDefault();
        const form = this.template.querySelector('form');
        if (!form) return;
        const data = new FormData(form);
        const payload = {};
        data.forEach((v,k) => { payload[k] = v; });
        this.submitted = true;
        form.reset();
        setTimeout(() => { this.submitted = false; }, 3500);
    }

    resetForm() {
        const form = this.template.querySelector('form');
        if (form) form.reset();
    }

}