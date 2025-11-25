"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    videoUrl: string | null;
    title: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Reset video when URL changes
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [videoUrl]);

    if (!videoUrl) {
        return (
            <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-white/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <p className="text-white/70 text-lg font-medium">No video available</p>
                    <p className="text-white/50 text-sm mt-2">
                        Video content will be added soon
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video
                ref={videoRef}
                controls
                className="w-full h-full"
                controlsList="nodownload"
                preload="metadata"
            >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
