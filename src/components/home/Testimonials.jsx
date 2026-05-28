import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Principal, Delhi Public School',
    text: 'Niyo Uniformals delivered 800 uniforms on time with excellent quality. The fabric is durable and the stitching is perfect. Highly recommended for school bulk orders!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'HR Manager, TechCorp India',
    text: 'We ordered corporate uniforms for our entire team of 200 employees. The customization options are great and the delivery was faster than expected.',
    rating: 5,
  },
  {
    name: 'Dr. Amit Verma',
    role: 'Director, City Hospital',
    text: 'The hospital uniforms are of premium quality — comfortable for long shifts and easy to maintain. Great experience working with the Niyo team.',
    rating: 5,
  },
  {
    name: 'Sunita Agarwal',
    role: 'Owner, Grand Palace Hotel',
    text: 'Beautiful hospitality uniforms that perfectly matched our brand colors. The team was very cooperative and professional throughout the process.',
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative"
    >
      <Quote size={28} className="text-gold-200 absolute top-5 right-5" fill="currentColor" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-gold-400" fill="currentColor" />
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{testimonial.text}"</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-500 flex items-center justify-center text-white text-sm font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-900">{testimonial.name}</p>
          <p className="text-xs text-slate-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-2"
          >
            What Our Clients Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-navy-900"
          >
            Trusted by Hundreds of Businesses
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
