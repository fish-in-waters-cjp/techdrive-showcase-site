import { configure } from 'vee-validate'
import * as yup from 'yup'

// 配置 VeeValidate 全域設定
export function configureValidation(i18n) {
  configure({
    // 產生錯誤訊息
    generateMessage: (context) => {
      const { t } = i18n.global
      const fieldName = t(`fields.${context.field}`) || context.field

      // 根據規則類型返回對應的錯誤訊息
      const messages = {
        required: t('validation.required', { field: fieldName }),
        email: t('validation.email', { field: fieldName }),
        min: t('validation.min', { field: fieldName, min: context.rule?.params?.[0] }),
        max: t('validation.max', { field: fieldName, max: context.rule?.params?.[0] }),
        confirmed: t('validation.confirmed', { field: fieldName }),
      }

      return messages[context.rule?.name] || t('validation.invalid', { field: fieldName })
    },
  })
}

// Yup schemas (可在表單中使用)
export const schemas = {
  // 聯絡表單
  contactForm: yup.object({
    name: yup.string().required(),
    company: yup.string().optional(),
    email: yup.string().required().email(),
    message: yup.string().required().max(600)
  }),

  // 經銷商申請表單
  retailerApplicationForm: yup.object({
    companyName: yup.string().required(),
    region: yup.string().required(),
    contactPerson: yup.string().optional(),
    email: yup.string().required().email(),
    message: yup.string().required().max(600)
  }),

  // 產品註冊表單
  productRegistrationForm: yup.object({
    productModel: yup.string().required(),
    serialNumber: yup.string().required(),
    email: yup.string().required().email()
  })
}

export default {
  configureValidation,
  schemas
}
