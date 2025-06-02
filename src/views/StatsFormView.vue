<template>
  <div class="space-y-8 mt-8">
    <h1 class="font-poppins text-3xl font-bold text-slate-100 sm:text-4xl md:text-5xl">
      Обратная связь
    </h1>

    <div class="max-w-2xl rounded-xl bg-gray-900/50 p-6 shadow-lg sm:p-8">
      <p class="mb-6 text-slate-300">
        Мы ценим ваше мнение! Пожалуйста, оставьте свой отзыв или предложение по улучшению нашего
        сервиса "КиноВью". Этот проект разработан студентом Дубиной Дмитрием в рамках курсового
        проекта.
      </p>

      <form @submit.prevent="handleFormSubmit" class="space-y-6">
        <div>
          <label for="name" class="mb-1 block text-sm font-medium text-slate-300">
            Ваше имя (необязательно):
          </label>
          <AppInput
            id="name"
            v-model="formInputData.name"
            type="text"
            placeholder="Иван Иванов"
            :has-icon="false"
            wrapper-class="bg-slate-800/70 outline-slate-700 focus-within:ring-1 focus-within:ring-violet-500"
          />
        </div>

        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-slate-300">
            Ваш Email (необязательно):
          </label>
          <AppInput
            id="email"
            v-model="formInputData.email"
            type="email"
            placeholder="ivan@example.com"
            :has-icon="false"
            wrapper-class="bg-slate-800/70 outline-slate-700 focus-within:ring-1 focus-within:ring-violet-500"
          />
        </div>

        <div>
          <label for="feedbackType" class="mb-1 block text-sm font-medium text-slate-300">
            Тип обращения:
          </label>
          <select
            id="feedbackType"
            v-model="formInputData.feedbackType"
            required
            class="w-full rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-slate-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
          >
            <option disabled value="">Выберите тип</option>
            <option value="bug">Сообщение об ошибке</option>
            <option value="feature">Предложение по улучшению</option>
            <option value="general">Общий отзыв</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div>
          <label for="message" class="mb-1 block text-sm font-medium text-slate-300">
            Ваше сообщение:
          </label>
          <textarea
            id="message"
            v-model="formInputData.message"
            rows="5"
            placeholder="Напишите здесь ваше сообщение..."
            required
            class="w-full rounded-xl border-slate-700 bg-black/20 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500 caret-violet-500"
          ></textarea>
        </div>

        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          :disabled="isFormSubmitting"
          class="w-full sm:w-auto"
        >
          {{ isFormSubmitting ? 'Отправка...' : 'Отправить сообщение' }}
        </AppButton>
      </form>

      <StatusMessage
        v-if="formSubmissionMessage.text"
        :type="formSubmissionMessage.type"
        :title="formSubmissionMessage.type === 'success' ? 'Сообщение отправлено!' : 'Ошибка'"
        :message="formSubmissionMessage.text"
        class="mt-6"
      />

      <div v-if="lastSubmittedData" class="mt-8 rounded-lg bg-slate-800 p-4">
        <h3 class="mb-2 text-lg font-semibold text-slate-200">
          Собранные данные (для демонстрации):
        </h3>
        <pre class="whitespace-pre-wrap text-xs text-slate-300">{{
          JSON.stringify(lastSubmittedData, null, 2)
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import StatusMessage from '@/components/ui/StatusMessage.vue'

const formInputData = reactive({
  name: '',
  email: '',
  feedbackType: '',
  message: '',
})

const isFormSubmitting = ref(false)
const formSubmissionMessage = reactive({ type: '', text: '' })
const lastSubmittedData = ref(null)

async function handleFormSubmit() {
  if (formInputData.feedbackType === '' || formInputData.message.trim() === '') {
    formSubmissionMessage.type = 'error'
    formSubmissionMessage.text = 'Пожалуйста, выберите тип обращения и заполните текст сообщения.'
    return
  }

  isFormSubmitting.value = true
  formSubmissionMessage.text = ''
  lastSubmittedData.value = null

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000)
  })

  lastSubmittedData.value = {
    name: formInputData.name,
    email: formInputData.email,
    feedbackType: formInputData.feedbackType,
    message: formInputData.message,
  }

  formSubmissionMessage.type = 'success'
  let userName = 'Аноним'
  if (formInputData.name !== '') {
    userName = formInputData.name
  }
  formSubmissionMessage.text =
    'Спасибо за ваш отзыв, ' +
    userName +
    '! Ваше сообщение (' +
    formInputData.feedbackType +
    ') успешно "отправлено".'

  formInputData.name = ''
  formInputData.email = ''
  formInputData.feedbackType = ''
  formInputData.message = ''

  isFormSubmitting.value = false

  setTimeout(function () {
    formSubmissionMessage.text = ''
  }, 7000)
}
</script>
<style scoped>
select {
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5em 1.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 2.5rem;
}
select option {
  background-color: #161b22;
  color: #f0f6fc;
}
</style>
