import { LightningElement } from 'lwc';

export default class DigitalExperiencesLWC extends LightningElement {

    title = 'Salesforce Developer & Integration Specialist';
    subtitle = 'Experience Cloud · LWC · Integraciones · Financial Services Cloud';
    contactUrl = '/contact';

    submitted = false;

    handleSubmit(event) {
        event.preventDefault();
        const form = this.template.querySelector('form');
        if (!form) return;
        const data = new FormData(form);
        const payload = {};
        data.forEach((v,k) => { payload[k] = v; });

        // Log to console (client-only, no Apex)
        // eslint-disable-next-line no-console
        console.log('Contact form submitted', payload);

        // show a brief success toast and reset the form
        this.submitted = true;
        form.reset();
        setTimeout(() => { this.submitted = false; }, 3500);
    }

    resetForm() {
        const form = this.template.querySelector('form');
        if (form) form.reset();
    }

}