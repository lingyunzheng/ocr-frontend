import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Offline OCR",
  description: "Your Offline OCR subscription payment was completed.",
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentSuccessPageProps = {
  searchParams?: {
    subscription_id?: string;
    product_id?: string;
    request_id?: string;
  };
};

export default function PaymentSuccessPage(_: PaymentSuccessPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
        <section className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm dark:border-emerald-900/60 dark:bg-slate-800">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            OK
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-normal">
            Payment successful
          </h1>
          <p className="mb-8 text-base leading-7 text-slate-600 dark:text-slate-300">
            Thanks for subscribing. Your premium access is ready and may take a
            few seconds to appear across all devices.
          </p>

          <div className="mb-8 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
            You can return to the web app now. If you are using the Android app,
            reopen it to refresh your subscription status.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Back to Offline OCR
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=io.github.lingyunzheng.ocr"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              Open Android app
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
