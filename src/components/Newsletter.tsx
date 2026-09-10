"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, SparkleIcon } from "./icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-center text-pearl sm:px-12 sm:py-16">
      <SparkleIcon className="absolute left-[10%] top-[18%] h-4 w-4 text-gold/70 animate-sparkle-float" />
      <SparkleIcon
        className="absolute right-[14%] top-[30%] h-3 w-3 text-blush/70 animate-sparkle-float"
        style={{ animationDelay: "1.5s" }}
      />
      <SparkleIcon
        className="absolute bottom-[20%] left-[22%] h-3 w-3 text-gold/50 animate-sparkle-float"
        style={{ animationDelay: "0.7s" }}
      />
      <h3 className="font-script text-3xl sm:text-4xl">Stay in the sparkle</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-pearl/70">
        New drops, styling notes, and the occasional just-for-subscribers
        discount. No spam, just shine.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-full bg-pearl/10 px-5 py-3 text-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-ink">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            You&apos;re on the list — welcome to Bejeweled.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-pearl/20 bg-pearl/5 px-5 py-3 text-sm text-pearl placeholder:text-pearl/40 outline-none transition-colors focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              Subscribe
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
