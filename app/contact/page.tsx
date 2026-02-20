import ContactForm from '@/components/ContactForm';
import { FaEnvelope, FaPhone, FaLinkedin, FaGoogle } from 'react-icons/fa';

export const metadata = {
  title: 'Contact - Dr. Dorsa',
  description: 'Get in touch with Dr. Dorsa',
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-100 p-3 rounded-lg">
            <FaEnvelope className="text-3xl text-gradient-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary">Get In Touch</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          I&apos;d love to hear from you. Whether you&apos;re interested in collaboration, 
          have questions, or just want to connect, please feel free to reach out.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <ContactForm />
        </div>

        <div className="mt-8 bg-primary-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gradient-primary mb-4 flex items-center gap-2">
            <FaEnvelope />
            Other Ways to Connect
          </h2>
          <p className="text-gray-700 mb-4">
            For urgent matters or professional inquiries, please use the contact form above. 
            I typically respond within 2-3 business days.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-primary-500" />
              <a href="mailto:dorsaghasemi.md@gmail.com" className="hover:text-primary-600 transition-colors">
                dorsaghasemi.md@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-primary-500" />
              <a href="tel:+989123950245" className="hover:text-primary-600 transition-colors">
                +98 912 395 0245
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaGoogle className="text-primary-500" />
              <span>Google Scholar</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaLinkedin className="text-primary-500" />
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
