<template>
  <div class="form mt-5">
    <v-card class="mx-auto">
      <v-form @submit.prevent="submitForm">
        <v-container>
          <v-text-field
            v-model="form.userName"
            :error="v$.userName.$error"
            color="primary"
            label="User Name"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="form.phoneNumber"
            :error="v$.phoneNumber.$error"
            color="primary"
            label="Phone Number"
            min="0"
            variant="outlined"
            type="number"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :error="v$.password.$error"
            color="primary"
            label="Password"
            variant="outlined"
            type="password"
          ></v-text-field>

          <v-text-field
            v-model="form.confirmPassword"
            :error="v$.confirmPassword.$error"
            color="primary"
            label="Confirm Password"
            variant="outlined"
            type="password"
          ></v-text-field>

          <v-btn type="submit" color="primary">Submit</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, maxLength, helpers } from '@vuelidate/validators';
import { ValidatorFn } from '@vuelidate/core';
import { useFormStore } from '@/stores/useFormStore';
import { useRouter } from 'vue-router';

// Define the form structure using an interface
interface Form {
  userName: string;
  phoneNumber: string | null;
  password: string;
  confirmPassword: string;
}

// Define the structure for the rules using an interface
interface Rules {
  userName: { 
    required: typeof required,
    maxLength: ReturnType<typeof maxLength>
  };
  phoneNumber: { 
    required: typeof required; 
    numeric: typeof numeric; 
    maxLength: ReturnType<typeof maxLength>;
  };
  password: {
    required: typeof required; 
    passwordPattern: ValidatorFn;
  };
  confirmPassword: {
    required: typeof required;
    sameAsPassword: ReturnType<typeof helpers.withMessage>;
  };
}

export default {
  setup() {
    const formStore = useFormStore();
    const router = useRouter();

    const form: Ref<Form> = ref({
      userName: '',
      phoneNumber: null,
      password: '',
      confirmPassword: '',
    });

    const passwordPattern = helpers.regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,12}$/
    );

    const rules: Rules = {
      userName: { 
        required,
        maxLength: maxLength(32) 
      },
      phoneNumber: { 
        required, 
        numeric, 
        maxLength: maxLength(10) 
      },
      password: {
        required,
        passwordPattern,
      },
      confirmPassword: {
        required,
        sameAsPassword: helpers.withMessage(
          'Passwords do not match',
          (value) => value === form.value.password
        ),
      },
    };

    const v$ = useVuelidate(rules, form);

    const submitForm = async () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        try {
          await formStore.submitForm(form.value);
        } catch(e) {
          console.log(e)
        }

        form.value = {
          userName: '',
          phoneNumber: null,
          password: '',
          confirmPassword: '',
        };

        v$.value.$reset();

        formStore.changeActiveLink('User');
        router.push({ path: '/user' });
      }
    };

    return { form, formStore, v$, submitForm };
  },
};
</script>

