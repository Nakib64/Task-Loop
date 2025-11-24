import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface AddEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newEventTitle: string;
    setNewEventTitle: (value: string) => void;
    newEventDesc: string;
    setNewEventDesc: (value: string) => void;
    newEventStart: string;
    setNewEventStart: (value: string) => void;
    newEventEnd: string;
    setNewEventEnd: (value: string) => void;
    createEvent: () => void;
}

export default function AddEventDialog({
    open,
    onOpenChange,
    newEventTitle,
    setNewEventTitle,
    newEventDesc,
    setNewEventDesc,
    newEventStart,
    setNewEventStart,
    newEventEnd,
    setNewEventEnd,
    createEvent
}: AddEventDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border-white/20 text-white">
                <DialogHeader>
                    <DialogTitle>Add Calendar Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Event Title</label>
                        <input
                            type="text"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Meeting with team"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Description</label>
                        <textarea
                            value={newEventDesc}
                            onChange={(e) => setNewEventDesc(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                            placeholder="Optional details..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Start Time</label>
                            <input
                                type="datetime-local"
                                value={newEventStart}
                                onChange={(e) => setNewEventStart(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">End Time</label>
                            <input
                                type="datetime-local"
                                value={newEventEnd}
                                onChange={(e) => setNewEventEnd(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={createEvent}
                        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 font-bold transition-colors"
                    >
                        Create Event
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
