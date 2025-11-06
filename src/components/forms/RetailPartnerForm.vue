<template>
  <Card variant="elevated">
    <form @submit="onSubmit" class="space-y-6">
      <FormInput
        name="companyName"
        :label="$t('fields.companyName')"
        v-model="companyName"
        required
      />

      <FormInput
        name="region"
        :label="$t('fields.region')"
        v-model="region"
        required
      />

      <FormInput
        name="contactPerson"
        :label="$t('fields.contactPerson')"
        v-model="contactPerson"
      />

      <FormInput
        name="email"
        type="email"
        :label="$t('fields.email')"
        v-model="email"
        required
      />

      <FormTextarea
        name="message"
        :label="$t('fields.message')"
        v-model="message"
        :rows="6"
        required
      />

      <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-800">{{ $t('retailPartner.form.success') }}</p>
      </div>

      <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-800">{{ $t('retailPartner.form.error') }}</p>
      </div>

      <div class="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          :disabled="isSubmitting"
          class="flex-1"
        >
          {{ isSubmitting ? $t('common.loading') : $t('retailPartner.form.submit') }}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          @click="resetForm"
          :disabled="isSubmitting"
        >
          {{ $t('retailPartner.form.reset') }}
        </Button>
      </div>
    </form>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { schemas } from '@/lib/validation'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import FormInput from './FormInput.vue'
import FormTextarea from './FormTextarea.vue'

const { t } = useI18n()
const { handleSubmit, resetForm: veeResetForm } = useForm({
  validationSchema: schemas.retailerApplicationForm
})

const companyName = ref('')
const region = ref('')
const contactPerson = ref('')
const email = ref('')
const message = ref('')
const submitStatus = ref(null)
const isSubmitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', values)
    submitStatus.value = 'success'
    veeResetForm()
    companyName.value = ''
    region.value = ''
    contactPerson.value = ''
    email.value = ''
    message.value = ''
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
})

const resetForm = () => {
  veeResetForm()
  companyName.value = ''
  region.value = ''
  contactPerson.value = ''
  email.value = ''
  message.value = ''
  submitStatus.value = null
}
</script>
