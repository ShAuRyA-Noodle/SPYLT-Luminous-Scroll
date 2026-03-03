import { Link } from 'react-router-dom'

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'Last updated: March 3, 2026',
    sections: [
      {
        heading: 'Data We Collect',
        body: 'We collect the information you share with us directly, such as email addresses submitted in the newsletter field.',
      },
      {
        heading: 'How We Use Data',
        body: 'Submitted information is used to deliver product news, early access updates, and support requests.',
      },
      {
        heading: 'Data Sharing',
        body: 'We do not sell personal data. We only share required information with trusted service providers for operations.',
      },
      {
        heading: 'Contact',
        body: 'For privacy requests, email privacy@spyltmilk.com.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'Last updated: March 3, 2026',
    sections: [
      {
        heading: 'Website Use',
        body: 'You may use this site for personal, non-commercial browsing and product discovery.',
      },
      {
        heading: 'Content Ownership',
        body: 'All branding, videos, and creative assets on this site are protected and may not be reused without permission.',
      },
      {
        heading: 'Availability',
        body: 'Products, campaigns, and site content may change at any time without prior notice.',
      },
      {
        heading: 'Contact',
        body: 'For terms questions, email hello@spyltmilk.com.',
      },
    ],
  },
}

const LegalPage = ({ type = 'privacy' }) => {
  const content = LEGAL_CONTENT[type] ?? LEGAL_CONTENT.privacy

  return (
    <main className="min-h-dvh bg-[#1e1d1f] text-milk px-5 md:px-10 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-milk/65 hover:text-milk transition-colors"
        >
          <span>←</span>
          Back to home
        </Link>

        <header className="mt-6 md:mt-10">
          <h1 className="text-4xl md:text-7xl leading-none tracking-tight uppercase">
            {content.title}
          </h1>
          <p className="mt-3 text-milk/60 font-paragraph">{content.intro}</p>
        </header>

        <section className="mt-10 md:mt-14 space-y-8 md:space-y-10">
          {content.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="text-xl md:text-3xl uppercase tracking-tight mb-3">
                {section.heading}
              </h2>
              <p className="text-sm md:text-lg leading-relaxed text-milk/80 font-paragraph">
                {section.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default LegalPage
