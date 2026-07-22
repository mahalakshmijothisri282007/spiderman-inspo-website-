import { type FormEvent, useState } from 'react'
import { CONTACT, EDITORIAL } from './portfolioContent'

export function ContactPanel() {
  const [sentHint, setSentHint] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const draft = [`Hi mj — ${name}`, email ? `(${email})` : '', '', message].filter(Boolean).join('\n')

    void navigator.clipboard?.writeText(draft).catch(() => {})
    window.open(CONTACT.whatsappHref, '_blank', 'noopener,noreferrer')
    setSentHint(true)
    window.setTimeout(() => setSentHint(false), 6200)
  }

  return (
    <div className="contact-panel">
      {!sentHint ? (
        <>
          <h2 id="contact-heading" className="contact-panel__kicker">
            {EDITORIAL.formHeadline}
          </h2>
          <form className="contact-form contact-form--hki" onSubmit={handleSubmit} aria-labelledby="contact-heading">
            <label className="contact-form__label">
              <span className="sr-only">{CONTACT.fields.name}</span>
              <input name="name" type="text" required placeholder={CONTACT.fields.name} autoComplete="name" />
            </label>
            <label className="contact-form__label">
              <span className="sr-only">{CONTACT.fields.email}</span>
              <input name="email" type="email" required placeholder={CONTACT.fields.email} autoComplete="email" />
            </label>
            <label className="contact-form__label">
              <span className="sr-only">{CONTACT.fields.message}</span>
              <textarea name="message" rows={5} required placeholder={CONTACT.fields.message} />
            </label>
            <div className="contact-form__actions contact-form__actions--hki">
              <button type="submit" className="contact-form__submit-hki">
                {CONTACT.fields.submit}
              </button>
              <button type="button" className="contact-form__ghost-hki" onClick={() => window.open(CONTACT.whatsappHref, '_blank')}>
                {CONTACT.whatsappLabel}
              </button>
            </div>
          </form>
          <p className="contact-panel__fineprint contact-panel__fineprint--hki">
            Sends via WhatsApp; draft copies to clipboard when allowed.
          </p>
        </>
      ) : (
        <div className="contact-panel__thankyou" role="status">
          <p className="contact-panel__sent">{EDITORIAL.sentTitle}</p>
          <p className="contact-panel__thank">{EDITORIAL.thankYouLine}</p>
          <button
            type="button"
            className="contact-form__ghost-hki"
            onClick={() => {
              setSentHint(false)
            }}
          >
            resend
          </button>
        </div>
      )}
    </div>
  )
}
