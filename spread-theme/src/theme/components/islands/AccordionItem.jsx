import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import './AccordionItem.css';

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setBodyHeight(open ? el.scrollHeight : 0);
  }, [open, answer]);

  return (
    <div className={`accordion-item${open ? ' accordion-item--open' : ''}`}>
      <button className="accordion-item__trigger" onClick={toggle} aria-expanded={open}>
        <span className="accordion-item__question">{question}</span>
        <span className="accordion-item__icon" aria-hidden="true" />
      </button>
      <div
        className="accordion-item__body"
        ref={bodyRef}
        style={{ maxHeight: bodyHeight }}
        aria-hidden={!open}
      >
        <div className="accordion-item__answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
