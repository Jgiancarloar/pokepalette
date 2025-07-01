import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from 'emailjs-com'

const FeedbackSection = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const templateParams = {
      user_email: email,
      message: message,
    }

    emailjs
      .send(
        'service_4xeapch', 
        'template_8nd714b', 
        templateParams,
        'UO5H5DcIeBQST2dtr'
      )
      .then(() => {
        setLoading(false)
        setSuccess(true)
        setEmail('')
        setMessage('')
      })
      .catch(() => {
        setLoading(false)
        setSuccess(false)
      })
  }

  return (
    <div id='feedback' className='bg-[var(--bg3)]/10 w-full'>
      <div className='flex flex-col gap-10 items-center max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-20 w-full'>
        <h2 className='font-bold text-center text-3xl lg:text-5xl text-[var(--text2)]'>
          {t('feedback.title')}
        </h2>
        <p className='font-medium max-w-4xl text-center text-[var(--text3)]'>
          {t('feedback.description')}
        </p>
        <form className='max-w-md w-full' onSubmit={handleSubmit}>
          <input
            className='border border-[var(--bg1)] text-[var(--bg1)] mb-5 outline-none p-3 rounded-md w-full'
            placeholder={t('feedback.emailPlaceholder')}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            name='user_email'
          />
          <textarea
            className='border border-[var(--bg1)] text-[var(--bg1)] mb-5 min-h-40 outline-none p-3 rounded-md w-full'
            placeholder={t('feedback.textareaPlaceholder')}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            name='message'
          ></textarea>
          <button
            className='bg-[var(--bg1)] font-medium px-5 py-3 rounded-md text-white w-full'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Enviando...' : t('feedback.button')}
          </button>
        </form>
        {success === true && <p className="text-green-600 mt-3">Mensaje enviado correctamente!</p>}
        {success === false && <p className="text-red-600 mt-3">Error al enviar el mensaje. Intenta de nuevo.</p>}
      </div>
    </div>
  )
}

export default FeedbackSection
