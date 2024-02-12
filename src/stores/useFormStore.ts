import { defineStore } from 'pinia'
import _ from 'lodash';

interface FormData {
  [key: string]: any;
}

// Interface for the state
interface FormState {
  formData: FormData;
  isAccessUserPage: boolean;
  activeLink: string;
}

export const useFormStore = defineStore('formStore', {
  state: (): FormState => ({
    formData: {},
    isAccessUserPage: false,
    activeLink: 'Form'
  }),
  actions: {
    async submitForm(data: FormData): Promise<void> {
      // Simulate API call with a timeout
      await new Promise<void>((resolve) => setTimeout(resolve, 400));
      this.formData = _.cloneDeep(data);
      this.isAccessUserPage = true;
    },

    changeActiveLink(activeLink: any): void {
      this.activeLink = activeLink;
    }
  }
});
