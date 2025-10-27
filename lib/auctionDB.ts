
// Auction Product Interface
export interface AuctionProduct {
    id: string;
    auctionId: string; // Hash-based unique identifier
    farmerId: string;
    productName: string;
    productDescription?: string;
    daysOld: number;
    quantityKg: number;
    minimumPricePerKg: number;
    deliveryAvailable: boolean;
    imageUrl?: string;
    videoUrl?: string;
    grade?: string; // AI-generated grade
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    createdAt: string;
    auctionStartTime: string; // 2 hours from upload
    auctionEndTime?: string;
    currentBid?: number;
    winningBidderId?: string;
    finalPrice?: number;
}

// Bid Interface
export interface Bid {
    id: string;
    auctionId: string;
    bidderId: string;
    bidAmount: number;
    bidTime: string;
    isWinning: boolean;
}

// In-memory storage for demo purposes
let auctions: AuctionProduct[] = [];
let bids: Bid[] = [];

// Utility function to generate hash-based auction ID
export const generateAuctionId = (farmerId: string, productName: string, timestamp: string): string => {
    const data = `${farmerId}-${productName}-${timestamp}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return `AUCT-${Math.abs(hash).toString(36).toUpperCase()}`;
};

// Utility function to calculate auction start time (2 hours from now)
export const calculateAuctionStartTime = (): string => {
    const now = new Date();
    const auctionStart = new Date(now.getTime() + (2 * 60 * 60 * 1000)); // 2 hours from now
    return auctionStart.toISOString();
};

// Utility function to calculate auction end time (24 hours from start)
export const calculateAuctionEndTime = (startTime: string): string => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from start
    return end.toISOString();
};

// Database functions for auctions
export const auctionDB = {
    // Create new auction
    createAuction: (auctionData: Omit<AuctionProduct, 'id' | 'auctionId' | 'createdAt' | 'auctionStartTime' | 'status'>): AuctionProduct => {
        const now = new Date().toISOString();
        const auctionId = generateAuctionId(auctionData.farmerId, auctionData.productName, now);
        const auctionStartTime = calculateAuctionStartTime();

        const newAuction: AuctionProduct = {
            ...auctionData,
            id: (auctions.length + 1).toString(),
            auctionId,
            createdAt: now,
            auctionStartTime,
            status: 'pending',
        };

        auctions.push(newAuction);
        return newAuction;
    },

    // Get auction by ID
    getAuctionById: (id: string): AuctionProduct | null => {
        return auctions.find(auction => auction.id === id) || null;
    },

    // Get auction by auction ID (hash)
    getAuctionByAuctionId: (auctionId: string): AuctionProduct | null => {
        return auctions.find(auction => auction.auctionId === auctionId) || null;
    },

    // Get auctions by farmer
    getAuctionsByFarmer: (farmerId: string): AuctionProduct[] => {
        return auctions.filter(auction => auction.farmerId === farmerId);
    },

    // Get active auctions
    getActiveAuctions: (): AuctionProduct[] => {
        const now = new Date().toISOString();
        return auctions.filter(auction =>
            auction.status === 'active' &&
            new Date(auction.auctionStartTime) <= new Date(now) &&
            (!auction.auctionEndTime || new Date(auction.auctionEndTime) > new Date(now))
        );
    },

    // Get pending auctions
    getPendingAuctions: (): AuctionProduct[] => {
        return auctions.filter(auction => auction.status === 'pending');
    },

    // Update auction status
    updateAuctionStatus: (auctionId: string, status: AuctionProduct['status']): AuctionProduct | null => {
        const auction = auctions.find(a => a.auctionId === auctionId);
        if (!auction) return null;

        auction.status = status;
        if (status === 'active' && !auction.auctionEndTime) {
            auction.auctionEndTime = calculateAuctionEndTime(auction.auctionStartTime);
        }

        return auction;
    },

    // Update auction with current bid
    updateCurrentBid: (auctionId: string, bidAmount: number, bidderId: string): AuctionProduct | null => {
        const auction = auctions.find(a => a.auctionId === auctionId);
        if (!auction) return null;

        auction.currentBid = bidAmount;
        auction.winningBidderId = bidderId;

        return auction;
    },

    // Complete auction
    completeAuction: (auctionId: string, finalPrice: number, winningBidderId: string): AuctionProduct | null => {
        const auction = auctions.find(a => a.auctionId === auctionId);
        if (!auction) return null;

        auction.status = 'completed';
        auction.finalPrice = finalPrice;
        auction.winningBidderId = winningBidderId;

        return auction;
    },

    // Get all auctions
    getAllAuctions: (): AuctionProduct[] => {
        return [...auctions];
    },

    // Delete auction
    deleteAuction: (auctionId: string): boolean => {
        const index = auctions.findIndex(auction => auction.auctionId === auctionId);
        if (index === -1) return false;
        auctions.splice(index, 1);
        return true;
    },
};

// Database functions for bids
export const bidDB = {
    // Create new bid
    createBid: (bidData: Omit<Bid, 'id' | 'bidTime' | 'isWinning'>): Bid => {
        const now = new Date().toISOString();
        const newBid: Bid = {
            ...bidData,
            id: (bids.length + 1).toString(),
            bidTime: now,
            isWinning: false,
        };

        // Check if this is the highest bid
        const auctionBids = bids.filter(bid => bid.auctionId === bidData.auctionId);
        const highestBid = Math.max(...auctionBids.map(bid => bid.bidAmount), 0);

        if (bidData.bidAmount > highestBid) {
            // Mark previous winning bid as not winning
            auctionBids.forEach(bid => {
                if (bid.isWinning) bid.isWinning = false;
            });
            newBid.isWinning = true;

            // Update auction with new current bid
            auctionDB.updateCurrentBid(bidData.auctionId, bidData.bidAmount, bidData.bidderId);
        }

        bids.push(newBid);
        return newBid;
    },

    // Get bids by auction
    getBidsByAuction: (auctionId: string): Bid[] => {
        return bids.filter(bid => bid.auctionId === auctionId).sort((a, b) => b.bidAmount - a.bidAmount);
    },

    // Get bids by bidder
    getBidsByBidder: (bidderId: string): Bid[] => {
        return bids.filter(bid => bid.bidderId === bidderId);
    },

    // Get winning bid for auction
    getWinningBid: (auctionId: string): Bid | null => {
        return bids.find(bid => bid.auctionId === auctionId && bid.isWinning) || null;
    },

    // Get all bids
    getAllBids: (): Bid[] => {
        return [...bids];
    },

    // Delete bid
    deleteBid: (bidId: string): boolean => {
        const index = bids.findIndex(bid => bid.id === bidId);
        if (index === -1) return false;
        bids.splice(index, 1);
        return true;
    },
};

export default { auctionDB, bidDB };
