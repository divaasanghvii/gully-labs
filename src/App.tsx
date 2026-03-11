import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  Star,
  ShieldCheck,
  Zap,
  Leaf
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage?: string;
  color: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "GL001 Buransh Red",
    price: 9490,
    category: "",
    image: "https://gullylabs.com/cdn/shop/files/DSC09477.jpg?v=1769173399&width=1280",
    hoverImage: "https://gullylabs.com/cdn/shop/files/DSCF7305.jpg?v=1769173430&width=1280",
    color: "Buransh Red",
    description: "Engineered for speed, designed for the streets."
  },
  {
    id: 2,
    name: "Gully Number 001 - Barfi Burgundy",
    price: 7990,
    category: "",
    image: "https://gullylabs.com/cdn/shop/files/8_a300406f-12be-4ffb-b1b5-8ecfd607e876.jpg?v=1769173074&width=2080",
    hoverImage: "https://gullylabs.com/cdn/shop/files/4_b73da82b-5a70-4cf0-bcbb-56501918061b.jpg?v=1769173074&width=1280",
    color: "Barfi Burgundy",
    description: "Unparalleled comfort for your daily journey."
  },
  {
    id: 3,
    name: "GL001 Kulfi Badaam",
    price: 6290,
    category: "",
    image: "https://gullylabs.com/cdn/shop/files/DSC09934_7b703780-ac43-4b44-b732-982b3b7f0bb7.jpg?v=1769173005&width=1280",
    hoverImage: "https://gullylabs.com/cdn/shop/files/DSC09936_ec245fcd-1be2-4668-88f3-10b44fdb3d7b.jpg?v=1769173005&width=1280",
    color: "Kulfi Badaam",
    description: "Conquer any terrain with superior grip."
  },
  {
    id: 4,
    name: "Gully Number 002 - 1928 Turf Olive",
    price: 7490,
    category: "",
    image: "https://gullylabs.com/cdn/shop/files/DSC00020_59030464-9795-4362-a9d0-079643d4ea58.jpg?v=1769173347&width=1280",
    hoverImage: "https://gullylabs.com/cdn/shop/files/DSC09447_8392c2ac-6620-4298-9760-a75283106014.jpg?v=1769173347&width=1280",
    color: "Turf Olive",
    description: "High-visibility performance for night runners."
  }
];

// --- Components ---

const Navbar = ({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter">गली LABS</a>
          <div className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-widest">
            <a href="https://gullylabs.com/collections/everyday" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">Shop</a>
            <a href="#about" className="hover:text-neutral-500 transition-colors">About</a>
            <a href="#technology" className="hover:text-neutral-500 transition-colors">Tech</a>
            <a href="https://gullylabs.com/blogs/news/%E0%A4%97%E0%A4%B2%E0%A5%80-labs-manifesto" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">Journal</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-4xl font-display font-bold">
              <a href="https://gullylabs.com/collections/everyday" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#technology" onClick={() => setIsMobileMenuOpen(false)}>Technology</a>
              <a href="https://gullylabs.com/blogs/news/%E0%A4%97%E0%A4%B2%E0%A5%80-labs-manifesto" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>Journal</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img 
          src="https://gullylabs.com/cdn/shop/files/dekstop.png?v=1769086837" 
          alt="Hero background"
          className="max-w-full max-h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-2xl mb-4">
        <img 
          src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-white"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        {product.category && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display font-bold text-lg tracking-tight">{product.name}</h3>
          <p className="text-neutral-500 text-sm">{product.color}</p>
        </div>
        <p className="font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    { icon: <Zap className="text-emerald-500" />, title: "Energy Return", desc: "Proprietary foam technology that gives back what you put in." },
    { icon: <ShieldCheck className="text-blue-500" />, title: "Durability", desc: "Tested in extreme conditions to ensure long-lasting performance." },
    { icon: <Leaf className="text-green-500" />, title: "Sustainable", desc: "Made with 40% recycled materials without compromising quality." }
  ];

  return (
    <section id="technology" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-xl font-display font-bold">{f.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://gullylabs.com/cdn/shop/files/11111111xxxxxxxx111111-7.jpg?v=1759844657&width=1280" 
              alt="Our Story"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-400 rounded-3xl -z-10 hidden md:block" />
        </div>
        <div>
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Story</span>
          <h2 className="text-5xl font-display font-bold tracking-tighter mb-8 leading-tight">
            WE DON'T JUST MAKE SHOES. WE CRAFT <span className="italic">EXPERIENCES</span>.
          </h2>
          <div className="text-neutral-600 text-lg mb-8 space-y-6 leading-relaxed">
            <p>
              When Arjun returned from Australia, he saw a gap: A culture obsessed with Western kicks but blind to its own soul. So he penned down a manifesto and set out to put India’s authentic culture on the global map.
            </p>
            <p>
              Animesh was the first to see the fire. And also to give it form. Arjun’s junior from college and one of the first members in the Gully Labs Whatsapp group, he quit his job at Bain and joined us as a co-founder.
            </p>
            <p>
              With Arjun’s vision and Animesh’s execution, Gully Labs is building more than sneakers. We’re building cultural currency. Made by hand, powered by belief, and unapologetically Indian.
            </p>
          </div>
          <a 
            href="https://gullylabs.com/pages/our-story" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex text-black font-bold items-center gap-2 border-b-2 border-black pb-1 hover:gap-4 transition-all"
          >
            Learn More About Our Process <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <button onClick={() => onRemoveItem(item.id)} className="text-neutral-400 hover:text-red-500">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500 mb-3">{item.color}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border rounded-full px-2 py-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 rounded-full"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 rounded-full"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-neutral-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-2xl font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <button className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isJoined, setIsJoined] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsJoined(true);
    }
  };

  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <h2 className="text-3xl font-display font-bold tracking-tighter mb-8">गली LABS</h2>
            <p className="text-neutral-400 max-w-sm mb-8">
              Join our community and stay updated with the latest releases, exclusive events, and performance tips.
            </p>
            <AnimatePresence mode="wait">
              {!isJoined ? (
                <motion.form 
                  key="signup-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex gap-4"
                >
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="bg-neutral-800 border-none rounded-full px-6 py-3 flex-1 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button type="submit" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                    Join
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 font-bold flex items-center gap-2"
                >
                  <Zap size={18} /> Welcome to the community!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-neutral-500">Shop</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Running</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lifestyle</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-neutral-500">Connect</h4>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-center gap-2"><Instagram size={16} /> <a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li className="flex items-center gap-2"><Twitter size={16} /> <a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li className="flex items-center gap-2"><Facebook size={16} /> <a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
          <p>© 2026 गली LABS. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        <Features />

        <section id="shop" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 block">Featured</span>
                <h2 className="text-4xl font-display font-bold tracking-tighter">ESSENTIAL RELEASES</h2>
              </div>
              <a 
                href="https://gullylabs.com/collections/everyday" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden md:flex items-center gap-2 font-bold hover:gap-4 transition-all"
              >
                View All <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>

        <About />

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-8">
                  READY TO ELEVATE YOUR STRIDE?
                </h2>
                <p className="text-white/60 text-lg mb-10">
                  Join over 50,000 athletes who have already made the switch to Gully Labs. Experience the difference today.
                </p>
                <a 
                  href="https://gullylabs.com/collections/everyday" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-emerald-400 text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-300 transition-all transform hover:scale-105"
                >
                  Shop the Collection
                </a>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full" />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
