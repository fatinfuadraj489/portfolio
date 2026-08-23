"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of videos do you edit?",
      answer: "I mainly work with talking-head videos, YouTube videos, short-form content like TikTok\u2019s, Instagram reels, YouTube Shorts, Documentary also product ads. Whether you need a polished full-length video or quick, eye-catching clips for social media, I can help make it stand out!"
    },
    {
      question: "What does your editing process look like?",
      answer: "You share your raw footage and references, I will take care of the rest."
    },
    {
      question: "How can I share large files with you?",
      answer: "We can use platforms like Google Drive or Dropbox. I\u2019ll guide you through the process if needed!"
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <p className="section-eyebrow reveal">FAQ</p>
        <h2 className="section-title reveal">Questions, answered</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="reveal"
                style={{ "--reveal-delay": `${index * 0.12}s` }}
              >
                <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <h3 className="faq-question-wrap">
                  <button
                    className="faq-question"
                    id={`faq-q${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a${index}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-a${index}`}
                  role="region"
                  aria-labelledby={`faq-q${index}`}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
