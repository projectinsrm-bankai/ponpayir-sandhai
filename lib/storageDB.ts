// File Storage Interface
export interface StoredFile {
    id: string;
    fileName: string;
    fileType: 'image' | 'video';
    fileSize: number;
    mimeType: string;
    uri: string; // Local URI for now
    uploadedAt: string;
    auctionId?: string;
}

// In-memory storage for demo purposes
let storedFiles: StoredFile[] = [];

// Utility function to generate file ID
export const generateFileId = (fileName: string, timestamp: string): string => {
    const data = `${fileName}-${timestamp}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return `FILE-${Math.abs(hash).toString(36).toUpperCase()}`;
};

// Utility function to get file extension
export const getFileExtension = (uri: string): string => {
    return uri.split('.').pop()?.toLowerCase() || '';
};

// Utility function to get MIME type from extension
export const getMimeType = (extension: string, fileType: 'image' | 'video'): string => {
    const imageMimeTypes: { [key: string]: string } = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
    };

    const videoMimeTypes: { [key: string]: string } = {
        'mp4': 'video/mp4',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo',
        'mkv': 'video/x-matroska',
        'webm': 'video/webm',
    };

    if (fileType === 'image') {
        return imageMimeTypes[extension] || 'image/jpeg';
    } else {
        return videoMimeTypes[extension] || 'video/mp4';
    }
};

// Database functions for file storage
export const storageDB = {
    // Store file
    storeFile: (fileData: {
        fileName: string;
        fileType: 'image' | 'video';
        fileSize: number;
        uri: string;
        auctionId?: string;
    }): StoredFile => {
        const now = new Date().toISOString();
        const fileId = generateFileId(fileData.fileName, now);
        const extension = getFileExtension(fileData.uri);
        const mimeType = getMimeType(extension, fileData.fileType);

        const newFile: StoredFile = {
            id: fileId,
            fileName: fileData.fileName,
            fileType: fileData.fileType,
            fileSize: fileData.fileSize,
            mimeType,
            uri: fileData.uri,
            uploadedAt: now,
            auctionId: fileData.auctionId,
        };

        storedFiles.push(newFile);
        return newFile;
    },

    // Get file by ID
    getFileById: (id: string): StoredFile | null => {
        return storedFiles.find(file => file.id === id) || null;
    },

    // Get files by auction
    getFilesByAuction: (auctionId: string): StoredFile[] => {
        return storedFiles.filter(file => file.auctionId === auctionId);
    },

    // Get images by auction
    getImagesByAuction: (auctionId: string): StoredFile[] => {
        return storedFiles.filter(file => file.auctionId === auctionId && file.fileType === 'image');
    },

    // Get videos by auction
    getVideosByAuction: (auctionId: string): StoredFile[] => {
        return storedFiles.filter(file => file.auctionId === auctionId && file.fileType === 'video');
    },

    // Get all files
    getAllFiles: (): StoredFile[] => {
        return [...storedFiles];
    },

    // Delete file
    deleteFile: (id: string): boolean => {
        const index = storedFiles.findIndex(file => file.id === id);
        if (index === -1) return false;
        storedFiles.splice(index, 1);
        return true;
    },

    // Update file auction association
    updateFileAuction: (fileId: string, auctionId: string): StoredFile | null => {
        const file = storedFiles.find(f => f.id === fileId);
        if (!file) return null;

        file.auctionId = auctionId;
        return file;
    },

    // Get file statistics
    getFileStats: () => {
        const totalFiles = storedFiles.length;
        const totalSize = storedFiles.reduce((sum, file) => sum + file.fileSize, 0);
        const imageCount = storedFiles.filter(f => f.fileType === 'image').length;
        const videoCount = storedFiles.filter(f => f.fileType === 'video').length;

        return {
            totalFiles,
            totalSize,
            imageCount,
            videoCount,
            averageSize: totalFiles > 0 ? totalSize / totalFiles : 0,
        };
    },
};

export default storageDB;
