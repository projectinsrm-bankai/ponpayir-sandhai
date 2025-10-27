import { AuctionProduct } from './auctionDB';

// Utility functions for auction management
export const auctionUtils = {
    // Format auction start time for display
    formatAuctionTime: (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    },

    // Get time remaining until auction starts
    getTimeUntilStart: (auctionStartTime: string): string => {
        const now = new Date();
        const start = new Date(auctionStartTime);
        const diff = start.getTime() - now.getTime();

        if (diff <= 0) return "Auction has started";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m remaining`;
        } else {
            return `${minutes}m remaining`;
        }
    },

    // Get time remaining until auction ends
    getTimeUntilEnd: (auctionEndTime: string): string => {
        const now = new Date();
        const end = new Date(auctionEndTime);
        const diff = end.getTime() - now.getTime();

        if (diff <= 0) return "Auction ended";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m left`;
        } else {
            return `${minutes}m left`;
        }
    },

    // Check if auction is currently active
    isAuctionActive: (auction: AuctionProduct): boolean => {
        const now = new Date();
        const start = new Date(auction.auctionStartTime);
        const end = auction.auctionEndTime ? new Date(auction.auctionEndTime) : null;

        return (
            auction.status === 'active' &&
            start <= now &&
            (!end || end > now)
        );
    },

    // Check if auction is pending (not started yet)
    isAuctionPending: (auction: AuctionProduct): boolean => {
        const now = new Date();
        const start = new Date(auction.auctionStartTime);
        return auction.status === 'pending' && start > now;
    },

    // Check if auction has ended
    isAuctionEnded: (auction: AuctionProduct): boolean => {
        const now = new Date();
        const end = auction.auctionEndTime ? new Date(auction.auctionEndTime) : null;
        return auction.status === 'completed' || (end && end <= now);
    },

    // Get auction status text
    getAuctionStatusText: (auction: AuctionProduct): string => {
        if (auctionUtils.isAuctionPending(auction)) {
            return "Pending";
        } else if (auctionUtils.isAuctionActive(auction)) {
            return "Active";
        } else if (auctionUtils.isAuctionEnded(auction)) {
            return "Ended";
        } else {
            return "Cancelled";
        }
    },

    // Get auction status color
    getAuctionStatusColor: (auction: AuctionProduct): string => {
        if (auctionUtils.isAuctionPending(auction)) {
            return "#FFA500"; // Orange
        } else if (auctionUtils.isAuctionActive(auction)) {
            return "#00FF00"; // Green
        } else if (auctionUtils.isAuctionEnded(auction)) {
            return "#808080"; // Gray
        } else {
            return "#FF0000"; // Red
        }
    },

    // Format price for display
    formatPrice: (price: number): string => {
        return `₹${price.toLocaleString('en-IN')}`;
    },

    // Format quantity for display
    formatQuantity: (quantity: number): string => {
        return `${quantity} kg`;
    },

    // Get auction summary
    getAuctionSummary: (auction: AuctionProduct): string => {
        const status = auctionUtils.getAuctionStatusText(auction);
        const timeInfo = auctionUtils.isAuctionActive(auction)
            ? auction.auctionEndTime
                ? auctionUtils.getTimeUntilEnd(auction.auctionEndTime)
                : "Active"
            : auctionUtils.isAuctionPending(auction)
                ? auctionUtils.getTimeUntilStart(auction.auctionStartTime)
                : status;

        return `${status} • ${timeInfo}`;
    },
};

export default auctionUtils;
