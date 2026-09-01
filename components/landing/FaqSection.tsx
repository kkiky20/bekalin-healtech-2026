"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FaqSection() {
  const faqs = [
    {
      q: "Apa itu BEKALIN?",
      a: "BEKALIN (Best Clinical Logistics Integration Network) adalah platform Decision Support System (DSS) berbasis web yang membantu rumah sakit memantau persediaan, mengelola kebutuhan, memprioritaskan permintaan, dan menemukan peluang redistribusi stok antarunit secara real-time.",
    },
    {
      q: "Siapa yang menggunakan BEKALIN?",
      a: "Sistem ini dirancang untuk Admin Gudang (Farmasi/Logistik), Admin CSSD, Perawat di Unit Pelayanan (seperti IGD, ICU, Rawat Inap, Rawat Jalan), serta Manajer Operasional rumah sakit yang membutuhkan analitik dan pemantauan kinerja.",
    },
    {
      q: "Apa yang dapat dimonitor?",
      a: "Anda dapat memantau kondisi ketersediaan obat, alat kesehatan, dan bahan medis habis pakai, status stok kritis, tanggal kedaluwarsa, hingga proses distribusi logistik secara langsung (real-time).",
    },
    {
      q: "Bagaimana BEKALIN membantu redistribusi stok?",
      a: "Saat suatu unit mengajukan permintaan barang yang stoknya habis di gudang utama, sistem akan mengecek ketersediaan di unit lain. Jika ada unit dengan stok berlebih (surplus), BEKALIN akan memberikan rekomendasi redistribusi sebelum rumah sakit harus melakukan pengadaan atau pembelian baru.",
    },
    {
      q: "Apa yang dimaksud Smart Priority Queue?",
      a: "Smart Priority Queue adalah fitur yang mengurutkan antrean permintaan secara otomatis berdasarkan tingkat urgensi pelayanan. Misalnya, permintaan dari unit kritis seperti IGD atau Ruang Operasi akan diprioritaskan di atas permintaan dari unit reguler.",
    },
    {
      q: "Apakah BEKALIN dapat digunakan pada perangkat mobile?",
      a: "Ya, BEKALIN memiliki antarmuka yang responsif (Responsive Interface) sehingga dapat diakses dan digunakan dengan nyaman melalui desktop, tablet, maupun telepon pintar (mobile) oleh tenaga medis dan staf gudang.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Pertanyaan Umum
          </h2>
          <p className="text-xl text-muted-foreground">
            Temukan jawaban untuk pertanyaan yang sering diajukan mengenai implementasi dan fitur BEKALIN.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border bg-surface px-6 rounded-xl mb-4 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary dark:hover:text-blue-400 transition-colors py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
