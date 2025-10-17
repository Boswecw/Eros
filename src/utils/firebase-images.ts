// Firebase Storage utility for automatically loading book cover images

const FIREBASE_BASE_URL = "https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2F";

// Known book cover mappings - updated with WebP images for better performance
const BOOK_COVER_MAPPINGS: Record<string, string> = {
  "high-card-stud": "High_Card_Stud_Poke_Her_book_cover.webp", // Updated to WebP format for better performance
  "sloppy-jo": "Sloppy_Jo_Book_over.webp", // Updated to WebP format (note: filename has "over" not "Cover")
  // Add more mappings here as you upload new book covers
  // Format: "book-id": "Title_Book_Cover.webp"

  // Examples for future books:
  // "new-book-title": "New_Book_Title_Book_Cover.webp",
  // "another-book": "Another_Book_Book_Cover.webp",
};

// Known tokens for each image (auto-detected during build for WebP images)
const BOOK_COVER_TOKENS: Record<string, string> = {
  // Tokens will be auto-detected for WebP images during build
  // Add manual tokens here only if auto-detection fails
};

/**
 * Generate Firebase Storage URL for a book cover
 * @param bookId - The book ID (e.g., "high-card-stud")
 * @param token - Optional Firebase token (if you have one, otherwise uses stored token)
 * @returns Complete Firebase Storage URL or placeholder
 */
export function getBookCoverUrl(bookId: string, token?: string): string {
  const fileName = BOOK_COVER_MAPPINGS[bookId];
  const storedToken = token || BOOK_COVER_TOKENS[bookId];

  if (!fileName) {
    // Fallback: try to generate filename from book ID
    const fallbackFileName = generateBookCoverFileName(bookId);
    console.warn(`No mapping found for book ID "${bookId}", trying fallback: ${fallbackFileName}`);
    return buildFirebaseUrl(fallbackFileName, storedToken);
  }

  // Handle special cases for non-standard image formats
  if (fileName.endsWith('.epub')) {
    // EPUB files can't be displayed as images, use placeholder
    console.warn(`Book "${bookId}" has an EPUB file instead of an image. Using placeholder.`);
    return getPlaceholderBookCover(bookId, 'EPUB Available');
  }

  if (fileName.endsWith('.tif') || fileName.endsWith('.tiff')) {
    // TIFF files may not display in all browsers, but let's try
    console.warn(`Book "${bookId}" uses TIFF format which may not display in all browsers.`);
    return buildFirebaseUrl(fileName, storedToken);
  }

  // Standard image formats (webp, png, jpg, jpeg, gif) - now optimized with WebP!
  return buildFirebaseUrl(fileName, storedToken);
}

/**
 * Generate a book cover filename from book ID
 * Converts "high-card-stud" to "High_Card_Stud_Book_Cover.webp" (WebP preferred for performance)
 */
function generateBookCoverFileName(bookId: string): string {
  const titleCase = bookId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');

  return `${titleCase}_Book_Cover.webp`;
}

/**
 * Build complete Firebase Storage URL
 */
function buildFirebaseUrl(fileName: string, token?: string): string {
  const encodedFileName = encodeURIComponent(fileName);
  let url = `${FIREBASE_BASE_URL}${encodedFileName}?alt=media`;

  if (token) {
    url += `&token=${token}`;
  }

  return url;
}

/**
 * Generate a placeholder book cover image
 * Uses a simple colored rectangle with the book title
 */
function getPlaceholderBookCover(bookId: string, statusMessage: string = 'Cover Coming Soon'): string {
  // Create a simple data URL placeholder
  const bookTitle = bookId.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Generate a simple SVG placeholder
  const svg = `
    <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#A78BFA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#grad)" />
      <rect x="20" y="20" width="260" height="410" fill="none" stroke="#E9D5FF" stroke-width="2" />
      <text x="150" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold"
            text-anchor="middle" fill="#FFFFFF" dominant-baseline="middle">
        ${bookTitle}
      </text>
      <text x="150" y="250" font-family="Arial, sans-serif" font-size="16"
            text-anchor="middle" fill="#E9D5FF" dominant-baseline="middle">
        by Ἔρως
      </text>
      <text x="150" y="350" font-family="Arial, sans-serif" font-size="12"
            text-anchor="middle" fill="#E9D5FF" dominant-baseline="middle">
        ${statusMessage}
      </text>
    </svg>
  `;

  // Convert SVG to data URL
  const encodedSvg = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSvg}`;
}

/**
 * Get the actual Firebase URL (bypassing placeholder)
 * Use this when you want to test if the actual image exists
 */
export function getActualFirebaseUrl(bookId: string, token?: string): string {
  const fileName = BOOK_COVER_MAPPINGS[bookId];
  const storedToken = token || BOOK_COVER_TOKENS[bookId];

  if (!fileName) {
    const fallbackFileName = generateBookCoverFileName(bookId);
    return buildFirebaseUrl(fallbackFileName, storedToken);
  }

  return buildFirebaseUrl(fileName, storedToken);
}

/**
 * Add a new book cover mapping
 * Use this when you upload a new book cover to Firebase
 */
export function addBookCoverMapping(bookId: string, fileName: string): void {
  BOOK_COVER_MAPPINGS[bookId] = fileName;
}

/**
 * Get all available book cover mappings
 */
export function getAvailableBookCovers(): Record<string, string> {
  return { ...BOOK_COVER_MAPPINGS };
}

/**
 * Check if a book cover exists for a given book ID
 */
export function hasBookCover(bookId: string): boolean {
  return bookId in BOOK_COVER_MAPPINGS;
}

/**
 * Auto-generate book cover URLs for multiple books
 * @param bookIds - Array of book IDs
 * @returns Object mapping book IDs to cover URLs
 */
export function generateBookCoverUrls(bookIds: string[]): Record<string, string> {
  const coverUrls: Record<string, string> = {};
  
  for (const bookId of bookIds) {
    coverUrls[bookId] = getBookCoverUrl(bookId);
  }
  
  return coverUrls;
}

/**
 * Auto-scan Firebase Storage folder for book cover images
 * Uses Firebase Storage REST API to list files
 */
export async function scanFirebaseFolder(): Promise<{files: string[], mappings: Record<string, string>}> {
  try {
    // Firebase Storage REST API endpoint for listing files
    const listUrl = `https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o?prefix=Eros%2F&delimiter=%2F`;

    const response = await fetch(listUrl);
    if (!response.ok) {
      throw new Error(`Firebase API error: ${response.status}`);
    }

    const data = await response.json();
    const files: string[] = [];
    const autoMappings: Record<string, string> = {};

    // Process each file in the response
    if (data.items) {
      for (const item of data.items) {
        const fileName = item.name.replace('Eros/', ''); // Remove folder prefix

        // Only process image files that look like book covers
        if (isBookCoverFile(fileName)) {
          files.push(fileName);

          // Auto-generate book ID from filename
          const bookId = generateBookIdFromFilename(fileName);
          if (bookId) {
            autoMappings[bookId] = fileName;
          }
        }
      }
    }

    console.log(`Auto-discovered ${files.length} book cover files:`, files);
    console.log('Auto-generated mappings:', autoMappings);

    return { files, mappings: autoMappings };

  } catch (error) {
    console.warn('Failed to auto-scan Firebase folder:', error);
    console.log('Falling back to manual mappings.');
    return {
      files: Object.values(BOOK_COVER_MAPPINGS),
      mappings: { ...BOOK_COVER_MAPPINGS }
    };
  }
}

/**
 * Check if a filename looks like a book cover
 */
function isBookCoverFile(fileName: string): boolean {
  const lowerName = fileName.toLowerCase();

  // Must be an image file
  const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(fileName);

  // Must contain "cover" or "book" in the name
  const isBookCover = lowerName.includes('cover') || lowerName.includes('book');

  // Exclude signature/logo files
  const isNotSignature = !lowerName.includes('signature') && !lowerName.includes('logo');

  return isImage && isBookCover && isNotSignature;
}

/**
 * Generate book ID from filename
 * "High_Card_Stud_Poke_Her_book_cover.png" → "high-card-stud-poke-her"
 */
function generateBookIdFromFilename(fileName: string): string | null {
  try {
    // Remove file extension
    const nameWithoutExt = fileName.replace(/\.[^.]+$/, '');

    // Remove common suffixes
    const cleanName = nameWithoutExt
      .replace(/_book_cover$/i, '')
      .replace(/_cover$/i, '')
      .replace(/_book$/i, '');

    // Convert to kebab-case
    const bookId = cleanName
      .replace(/[_\s]+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return bookId || null;
  } catch (error) {
    console.warn(`Failed to generate book ID from filename: ${fileName}`, error);
    return null;
  }
}

/**
 * Helper function to easily add a new book with auto-generated cover URL
 * @param bookId - The book ID (e.g., "new-book-title")
 * @param title - The book title (e.g., "New Book Title")
 * @param token - Optional Firebase token
 * @returns Object with book ID and cover URL
 */
export function createBookWithCover(bookId: string, title: string, token?: string) {
  // Auto-generate filename from title (WebP preferred for performance)
  const fileName = title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '_Book_Cover.webp';

  // Add to mappings
  BOOK_COVER_MAPPINGS[bookId] = fileName;

  if (token) {
    BOOK_COVER_TOKENS[bookId] = token;
  }

  return {
    id: bookId,
    coverImage: getBookCoverUrl(bookId, token),
    fileName: fileName
  };
}

/**
 * Batch create multiple book covers
 * @param books - Array of {id, title, token?} objects
 * @returns Array of book objects with cover URLs
 */
export function createMultipleBookCovers(books: Array<{id: string, title: string, token?: string}>) {
  return books.map(book => createBookWithCover(book.id, book.title, book.token));
}

/**
 * Auto-detect Firebase token for a file
 * Makes a HEAD request to get the current token
 */
export async function autoDetectToken(fileName: string): Promise<string | null> {
  try {
    const url = buildFirebaseUrl(fileName);
    const response = await fetch(url, { method: 'HEAD' });

    if (response.ok) {
      // Extract token from the response URL or headers
      const finalUrl = response.url;
      const tokenMatch = finalUrl.match(/[?&]token=([^&]+)/);
      return tokenMatch ? tokenMatch[1] : null;
    }

    return null;
  } catch (error) {
    console.warn(`Failed to auto-detect token for ${fileName}:`, error);
    return null;
  }
}

/**
 * Initialize auto-discovery system
 * Scans Firebase folder and updates mappings automatically
 */
export async function initializeAutoDiscovery(): Promise<{
  discovered: number;
  mappings: Record<string, string>;
  tokens: Record<string, string>;
}> {
  console.log('🔍 Starting auto-discovery of book covers...');

  const { files, mappings: autoMappings } = await scanFirebaseFolder();
  const autoTokens: Record<string, string> = {};

  // Auto-detect tokens for discovered files
  for (const [bookId, fileName] of Object.entries(autoMappings)) {
    const token = await autoDetectToken(fileName);
    if (token) {
      autoTokens[bookId] = token;
    }
  }

  // Merge with existing mappings (manual mappings take precedence)
  const finalMappings = { ...autoMappings, ...BOOK_COVER_MAPPINGS };
  const finalTokens = { ...autoTokens, ...BOOK_COVER_TOKENS };

  console.log(`✅ Auto-discovery complete: ${Object.keys(autoMappings).length} books discovered`);
  console.log('📋 Final mappings:', finalMappings);

  return {
    discovered: Object.keys(autoMappings).length,
    mappings: finalMappings,
    tokens: finalTokens
  };
}

/**
 * Get book cover URL with auto-discovery fallback
 * First tries manual mappings, then auto-discovery
 */
export async function getBookCoverUrlAuto(bookId: string): Promise<string> {
  // Try manual mapping first
  if (BOOK_COVER_MAPPINGS[bookId]) {
    return getBookCoverUrl(bookId);
  }

  // Try auto-discovery
  const { mappings, tokens } = await initializeAutoDiscovery();

  if (mappings[bookId]) {
    const fileName = mappings[bookId];
    const token = tokens[bookId];
    return buildFirebaseUrl(fileName, token);
  }

  // Fallback to placeholder
  return getPlaceholderBookCover(bookId);
}

/**
 * Get Firebase upload instructions for a book
 * @param bookId - The book ID
 * @param title - The book title
 * @returns Instructions for uploading to Firebase
 */
export function getUploadInstructions(bookId: string, title: string): string {
  const fileName = title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '_Book_Cover.webp';

  return `
📚 Firebase Upload Instructions for "${title}":

1. Go to Firebase Console: https://console.firebase.google.com/
2. Navigate to Storage > Files
3. Go to the "Eros" folder
4. Upload your book cover image with this exact filename: ${fileName}
5. The system will auto-discover it within a few minutes!

Expected Firebase path: Eros/${fileName}

💡 Pro tip: The system now auto-detects new book covers!
   Just upload with a descriptive filename and it will be discovered automatically.
`;
}

// Export the base URL and mappings for other uses
export { FIREBASE_BASE_URL, BOOK_COVER_MAPPINGS, BOOK_COVER_TOKENS };
