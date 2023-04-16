import Link from "next/link";
import { ReactNode } from "react";

interface types {
  title: string;
  children: ReactNode;
}

export default function DashboardLayout({ title, children }: types) {
  return (
    <section>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <Link
            href="/templates"
            className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add Query
          </Link>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{children}</div>
        </div>
      </main>
    </section>
  );
}
