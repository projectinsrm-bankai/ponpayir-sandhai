# Database Structure Documentation

This directory contains the database modules for the Ponpayir Sandhai auction system.

## Files Overview

### 1. `auctionDB.ts`
Contains the main auction database logic with in-memory storage for demo purposes.

**Key Interfaces:**
- `AuctionProduct`: Main auction data structure
- `Bid`: Bid data structure

**Key Functions:**
- `auctionDB.createAuction()`: Create new auction
- `auctionDB.getAuctionsByFarmer()`: Get farmer's auctions
- `auctionDB.getActiveAuctions()`: Get currently active auctions
- `auctionDB.updateAuctionStatus()`: Update auction status
- `bidDB.createBid()`: Create new bid
- `bidDB.getBidsByAuction()`: Get bids for specific auction

**Features:**
- Hash-based auction ID generation
- Automatic auction timing (2 hours from creation)
- Bid management with winning bid tracking
- Status management (pending, active, completed, cancelled)

### 2. `storageDB.ts`
Handles file storage for images and videos.

**Key Interface:**
- `StoredFile`: File metadata structure

**Key Functions:**
- `storageDB.storeFile()`: Store file with metadata
- `storageDB.getFilesByAuction()`: Get files for specific auction
- `storageDB.getImagesByAuction()`: Get images for auction
- `storageDB.getVideosByAuction()`: Get videos for auction

**Features:**
- File type detection (image/video)
- MIME type mapping
- File size tracking
- Auction association

### 3. `auctionUtils.ts`
Utility functions for auction display and management.

**Key Functions:**
- `auctionUtils.formatAuctionTime()`: Format timestamps
- `auctionUtils.getTimeUntilStart()`: Calculate time until auction starts
- `auctionUtils.isAuctionActive()`: Check if auction is currently active
- `auctionUtils.getAuctionStatusText()`: Get human-readable status
- `auctionUtils.formatPrice()`: Format prices for display

### 4. `farmerDB.ts`
Farmer user management (existing).

### 5. `buyerDB.ts`
Buyer user management (existing).

## Database Schema

### Auction Product
```typescript
interface AuctionProduct {
  id: string;                    // Internal ID
  auctionId: string;             // Hash-based unique identifier
  farmerId: string;              // Farmer who created the auction
  productName: string;           // Product type (Tomato, Potato, etc.)
  productDescription?: string;   // Optional description
  daysOld: number;              // Age of product in days
  quantityKg: number;           // Available quantity in kg
  minimumPricePerKg: number;    // Minimum price per kg
  deliveryAvailable: boolean;   // Whether delivery is available
  imageUrl?: string;            // Product image URL
  videoUrl?: string;            // Product video URL
  grade?: string;               // AI-generated quality grade
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;            // Creation timestamp
  auctionStartTime: string;     // When auction starts (2 hours from creation)
  auctionEndTime?: string;      // When auction ends (24 hours from start)
  currentBid?: number;          // Current highest bid
  winningBidderId?: string;     // ID of current winning bidder
  finalPrice?: number;          // Final selling price
}
```

### Bid
```typescript
interface Bid {
  id: string;                   // Internal ID
  auctionId: string;            // Associated auction ID
  bidderId: string;             // Buyer who placed the bid
  bidAmount: number;            // Bid amount
  bidTime: string;              // When bid was placed
  isWinning: boolean;           // Whether this is the current winning bid
}
```

### Stored File
```typescript
interface StoredFile {
  id: string;                   // File ID
  fileName: string;             // Original filename
  fileType: 'image' | 'video'; // File type
  fileSize: number;             // File size in bytes
  mimeType: string;             // MIME type
  uri: string;                  // File URI
  uploadedAt: string;           // Upload timestamp
  auctionId?: string;           // Associated auction ID
}
```

## Usage Examples

### Creating an Auction
```typescript
import { auctionDB } from '@/lib/auctionDB';

const auction = auctionDB.createAuction({
  farmerId: 'farmer123',
  productName: 'Tomato',
  daysOld: 2,
  quantityKg: 50,
  minimumPricePerKg: 25,
  deliveryAvailable: true,
  grade: 'A+'
});
```

### Storing Files
```typescript
import { storageDB } from '@/lib/storageDB';

const imageFile = storageDB.storeFile({
  fileName: 'tomato-image.jpg',
  fileType: 'image',
  fileSize: 1024000,
  uri: 'file://path/to/image.jpg',
  auctionId: 'AUCT-ABC123'
});
```

### Querying Auctions
```typescript
// Get all active auctions
const activeAuctions = auctionDB.getActiveAuctions();

// Get farmer's auctions
const farmerAuctions = auctionDB.getAuctionsByFarmer('farmer123');

// Get auction by ID
const auction = auctionDB.getAuctionByAuctionId('AUCT-ABC123');
```

## Key Features

1. **Hash-based IDs**: Each auction gets a unique hash-based ID for easy reference
2. **Automatic Timing**: Auctions start 2 hours after creation and run for 24 hours
3. **File Management**: Images and videos are stored with proper metadata
4. **Bid Tracking**: Automatic tracking of winning bids
5. **Status Management**: Clear status tracking throughout auction lifecycle
6. **In-memory Storage**: Perfect for demo and testing purposes

## Future Enhancements

- Replace in-memory storage with persistent database
- Add real-time updates for active auctions
- Implement file upload to cloud storage
- Add auction analytics and reporting
- Implement notification system for auction events
