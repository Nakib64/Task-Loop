"use client";

import { LoadingSpinner, PageLoader, InlineLoader } from "@/components/LoadingSpinner";

export default function LoadingDemo() {
    return (
        <div className="p-8 space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Loading Components</h1>
                <p className="text-gray-400">Preview of all loading animation variants</p>
            </div>

            {/* Default Variant */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Default Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Small</p>
                        <LoadingSpinner variant="default" size="sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Medium</p>
                        <LoadingSpinner variant="default" size="md" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Large</p>
                        <LoadingSpinner variant="default" size="lg" />
                    </div>
                </div>
            </section>

            {/* Minimal Variant */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Minimal Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Small</p>
                        <LoadingSpinner variant="minimal" size="sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Medium</p>
                        <LoadingSpinner variant="minimal" size="md" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Large</p>
                        <LoadingSpinner variant="minimal" size="lg" />
                    </div>
                </div>
            </section>

            {/* Dots Variant */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Dots Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Small</p>
                        <LoadingSpinner variant="dots" size="sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Medium</p>
                        <LoadingSpinner variant="dots" size="md" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Large</p>
                        <LoadingSpinner variant="dots" size="lg" />
                    </div>
                </div>
            </section>

            {/* Pulse Variant */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Pulse Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Small</p>
                        <LoadingSpinner variant="pulse" size="sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Medium</p>
                        <LoadingSpinner variant="pulse" size="md" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <p className="text-sm text-gray-400 mb-4 text-center">Large</p>
                        <LoadingSpinner variant="pulse" size="lg" />
                    </div>
                </div>
            </section>

            {/* With Messages */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">With Messages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <LoadingSpinner variant="default" size="md" message="Loading your data..." />
                    </div>
                    <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                        <LoadingSpinner variant="dots" size="md" message="Please wait..." />
                    </div>
                </div>
            </section>

            {/* Inline Loader */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Inline Loader</h2>
                <div className="bg-white/5 rounded-xl p-8 border border-blue-500/20">
                    <p className="text-gray-300 mb-4">
                        This is some text with an inline loader: <InlineLoader />
                    </p>
                </div>
            </section>
        </div>
    );
}
