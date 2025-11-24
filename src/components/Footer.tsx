import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative z-10 py-12 px-6 md:px-12 border-t border-white/10 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg linear-primary flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">TaskLoop</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The ultimate productivity platform for modern professionals.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <Link href="/features"><li className="hover:text-white cursor-pointer transition-colors">Features</li></Link>
                            <Link href="/pricing"><li className="hover:text-white cursor-pointer transition-colors">Pricing</li></Link>
                            <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <Link href="/about"><li className="hover:text-white cursor-pointer transition-colors">About</li></Link>
                            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <Link href="/contact"><li className="hover:text-white cursor-pointer transition-colors">Contact</li></Link>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Cookies</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    <p>© 2025 TaskLoop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
