import * as yup from 'yup'

// Contact Form Schema
export const contactFormSchema = yup.object({
  name: yup.string().required('姓名為必填'),
  company: yup.string().optional(),
  email: yup.string().required('Email 為必填').email('Email 格式不正確'),
  message: yup.string().required('訊息為必填').max(600, '訊息最多 600 字')
})

// Retailer Application Form Schema
export const retailerApplicationFormSchema = yup.object({
  companyName: yup.string().required('公司名稱為必填'),
  region: yup.string().required('地區為必填'),
  contactPerson: yup.string().optional(),
  email: yup.string().required('Email 為必填').email('Email 格式不正確'),
  message: yup.string().required('訊息為必填').max(600, '訊息最多 600 字')
})

// Product Registration Form Schema
export const productRegistrationFormSchema = yup.object({
  productModel: yup.string().required('產品型號為必填'),
  serialNumber: yup.string().required('序號為必填'),
  email: yup.string().required('Email 為必填').email('Email 格式不正確')
})

export default {
  contactFormSchema,
  retailerApplicationFormSchema,
  productRegistrationFormSchema
}
