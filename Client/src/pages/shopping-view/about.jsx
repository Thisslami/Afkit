
import { motion } from "framer-motion";
import { FaShieldAlt, FaTruck, FaCheckCircle, FaQuestionCircle } from "react-icons/fa"; // Added FaQuestionCircle
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaNairaSign,
  FaWhatsapp
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import HappyCustomersSection from "@/components/shopping-view/happy-customer";

const AboutPage = () => {
    const handleWhatsAppClick = () => {
    const phoneNumber = "2348164014304";
    const message = "Hello AFKiT, I have a question about your products and services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
      >
        <span className="text-orange-500 font-bold">Afkit</span> is Nigeria’s trusted source for clean, UK-used laptops, phones, and accessories that feel brand new at affordable prices. Every UK-USED product we sell comes with 6-month warranty protection, free tech support, and Payment on delivery.
      </motion.p>

      {/* Why Choose Us? (Replaces original Features Section) */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-4xl font-extrabold text-primary mb-8"
        >
          Why Choose Us?
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }} // Increased delay for a nicer staggered entry
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
      >
        {[
          {
            Icon: FaCheckCircle,
            title: "6-Month Warranty",
            desc: "We repair or replace at no cost if your uk-used gadget develops a fault within 6 months, even after months of use.",
          },
          {
            Icon: FaNairaSign, // Reusing Naira icon for 'Pay on Delivery' as it implies transaction
            title: "Pay on Delivery",
            desc: "Inspect your item first, then pay. No risk involved, you're in control.",
          },
          {
            Icon: FaTruck,
            title: "Nationwide Delivery",
            desc: "Fast, safe, and reliable delivery to your doorstep across Nigeria.",
          },
          {
            Icon: FaQuestionCircle, // New icon for tech support
            title: "Free Online Tech Support",
            desc: "We’re here when you need us, providing expert assistance for your gadgets.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300"
          >
            <item.Icon size={48} className="text-blue-900 mx-auto mb-4" /> {/* Darker blue for icons */}
            <h3 className="text-xl font-bold text-primary mb-3">
              {item.title}
            </h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Our Promise Section (New Section) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-10 md:p-16 text-white shadow-xl mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
          Our Promise
        </h2>
        <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
          At <span className="text-orange-300 font-bold">Afkit</span>, we’re here to give you quality UK-used gadgets you can count on, fully tested by our team to keep you productive and worry-free.
        </p>
        <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed mt-4">
          If your gadget develops a fault within 6 months, we’ll fix it for free or replace it. We believe reliable gadgets power your success and drive Nigeria’s growth through technology.
        </p>
        <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed mt-4 font-semibold">
          This is why our tagline, "Delivering HAPPINESS," is not just words, it’s our mission. With <span className="text-orange-300 font-bold">Afkit</span>, you’re part of a family that’s got your back.
        </p>
      </motion.div>

      <HappyCustomersSection/>


      {/* CTA Section */}
       <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-center bg-blue-900 rounded-2xl p-12 text-white shadow-xl"
      >
        <h2 className="text-3xl font-extrabold mb-4">
          Ready to Upgrade Your Tech?
        </h2>
        <p className="text-lg mb-6">
          Join thousands of happy customers enjoying the latest gadgets at
          unbeatable prices.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            asChild
            className="bg-white text-blue-900 font-bold hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            <Link to="/shop/listing">Shop Now 🛒</Link>
          </Button>

          <Button
            onClick={handleWhatsAppClick}
            variant="outline"
            className="border-white text-blue-900 font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
          >
            <FaWhatsapp size={18} />
            Chat on WhatsApp
          </Button>
        </div>
      </motion.div>

      {/* Accordion for Policies */}
      <Accordion type="single" collapsible className="mt-12 max-w-3xl mx-auto"> {/* Added max-w and mx-auto for better centering */}
        <AccordionItem value="return-policy">
          <AccordionTrigger className="text-primary font-bold">
            Return Policy
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>
              We offer a 7-day return policy for all products. If you're not satisfied with your purchase, you can return it in its original condition for a full refund or exchange.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="delivery-info">
          <AccordionTrigger className="text-primary font-bold flex items-center gap-2">
            Delivery Information
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>
              Our delivery time is <strong>2-3 business days</strong>. We ensure quick and secure shipping so you receive your gadgets in top condition. Tracking details will be provided once your order is shipped.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms">
          <AccordionTrigger className="text-primary font-bold">
            Terms and Conditions
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>
              By using our website, you agree to our terms and conditions. All products are subject to availability.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutPage;