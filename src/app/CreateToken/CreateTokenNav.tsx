import { motion } from "framer-motion";


export default function CreateTokenNav() {

 const navItems = [
  { name: "Create Token", href: "#create-token" },
  { name: "Available Token Environments", href: "#token-environments" },
  { name: "How to Create", href: "#how-to-create" },
  { name: "Security", href: "#security" },
  { name: "Gas Fees", href: "#gas-fees" },
  { name: "FAQ", href: "#faq" },
  { name: "Testimonials", href: "#testimonials" },
];


  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-4 px-6 flex items-center justify-evenly bg-black fixed top-0 z-50 border-b border-white/20"
    >
      {/* All Tokens Dropdown */}
     
      {/* Nav Links */}
      {navItems.map((item, index) => (
        <a
          key={index}
          className="hover:text-gray-300 transition cursor-pointer text-white"
          href={item.href}
        >
          {item.name}
        </a>
      ))}

     
      {/* Connect Wallet Button */}
      <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition whitespace-nowrap">
        Connect Wallet
      </button>
    </motion.nav>






  );
}
