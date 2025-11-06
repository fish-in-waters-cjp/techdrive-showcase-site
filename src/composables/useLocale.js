import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

export function useLocale() {
  const { t, locale } = useI18n()
  const localeStore = useLocaleStore()

  const currentLocale = computed(() => localeStore.currentLocale)

  const setLocale = (newLocale) => {
    localeStore.setLocale(newLocale)
    locale.value = newLocale
  }

  const formatDate = (date, format = 'long') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    const options = {
      short: { year: 'numeric', month: '2-digit', day: '2-digit' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }

    return new Intl.DateTimeFormat(currentLocale.value, options[format]).format(dateObj)
  }

  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(currentLocale.value, options).format(number)
  }

  const formatCurrency = (amount, currency = 'TWD') => {
    return new Intl.NumberFormat(currentLocale.value, {
      style: 'currency',
      currency
    }).format(amount)
  }

  return {
    t,
    currentLocale,
    setLocale,
    formatDate,
    formatNumber,
    formatCurrency
  }
}
