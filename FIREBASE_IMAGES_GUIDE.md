# 📚 Firebase Book Cover Images - Auto-Loading System

## 🎯 What This System Does

Your website now automatically loads book cover images from your Firebase Storage folder! Instead of hardcoding long Firebase URLs, you can simply use book IDs and the system handles the rest.

## 🚀 How It Works

### Current Setup
- **Firebase Storage Path**: `Eros/` folder
- **Automatic URL Generation**: Based on book ID mappings
- **Token Management**: Automatically includes Firebase tokens for better caching

### Current Book Covers
```typescript
"high-card-stud" → "Book_Cover.png"
"sloppy-jo" → "Sloppy%20Jo%20Book%20Cover.png"
```

## 📖 Adding New Books

### Method 1: Quick Add (Recommended)
```typescript
import { getBookCoverUrl } from "~/utils/firebase-images";

// In your book data:
const newBook = {
  id: "my-new-book",
  title: "My New Book Title",
  coverImage: getBookCoverUrl("my-new-book"), // Automatically generates URL!
  // ... other book data
};
```

### Method 2: Auto-Generate Everything
```typescript
import { createBookWithCover } from "~/utils/firebase-images";

const bookInfo = createBookWithCover("new-romance", "New Romance Novel");
// Returns: { id: "new-romance", coverImage: "https://...", fileName: "New_Romance_Novel_Book_Cover.png" }
```

## 🔧 Firebase Upload Process

### Step 1: Get Upload Instructions
```typescript
import { getUploadInstructions } from "~/utils/firebase-images";

console.log(getUploadInstructions("my-book", "My Book Title"));
```

### Step 2: Upload to Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Storage > Files**
3. Open the **Eros** folder
4. Upload your image with the exact filename shown in instructions
5. Copy the download token from the URL

### Step 3: Add to Your Code
```typescript
// Option A: Add to the mappings file
// Edit src/utils/firebase-images.ts and add:
"my-book": "My_Book_Title_Book_Cover.png"

// Option B: Add programmatically
import { addBookCoverMapping } from "~/utils/firebase-images";
addBookCoverMapping("my-book", "My_Book_Title_Book_Cover.png");
```

## 📝 File Naming Convention

The system expects this naming pattern:
- **Book ID**: `my-awesome-book` (lowercase, hyphens)
- **Firebase Filename**: `My_Awesome_Book_Book_Cover.png` (title case, underscores, ends with `_Book_Cover.png`)

### Examples:
```
Book ID: "high-card-stud" → File: "High_Card_Stud_Book_Cover.png"
Book ID: "love-in-paris" → File: "Love_In_Paris_Book_Cover.png"
Book ID: "dark-romance" → File: "Dark_Romance_Book_Cover.png"
```

## 🛠️ Advanced Usage

### Check if Cover Exists
```typescript
import { hasBookCover } from "~/utils/firebase-images";

if (hasBookCover("my-book")) {
  console.log("Cover exists!");
} else {
  console.log("Need to upload cover");
}
```

### Get All Available Covers
```typescript
import { getAvailableBookCovers } from "~/utils/firebase-images";

const covers = getAvailableBookCovers();
console.log("Available covers:", covers);
```

### Batch Add Multiple Books
```typescript
import { createMultipleBookCovers } from "~/utils/firebase-images";

const books = [
  { id: "book-one", title: "Book One" },
  { id: "book-two", title: "Book Two" },
  { id: "book-three", title: "Book Three" }
];

const bookCovers = createMultipleBookCovers(books);
// Each book now has auto-generated cover URLs
```

## 🎨 Current Implementation

Your books are already using this system:

```typescript
// Before (hardcoded URLs):
coverImage: "https://firebasestorage.googleapis.com/v0/b/endless-fire-467204-n2.firebasestorage.app/o/Eros%2FBook_Cover.png?alt=media&token=43df0d98-5cfc-4c5d-a15e-8d9dcc358ba9"

// After (automatic):
coverImage: getBookCoverUrl("high-card-stud")
```

## 🔄 Adding Your Next Book

When you're ready to add a new book:

1. **Choose a book ID**: `"my-next-romance"` (lowercase, hyphens)
2. **Get the filename**: Run `getUploadInstructions("my-next-romance", "My Next Romance")`
3. **Upload to Firebase**: Use the exact filename provided
4. **Add to mappings**: Update `firebase-images.ts` or use `addBookCoverMapping()`
5. **Use in book data**: `coverImage: getBookCoverUrl("my-next-romance")`

## 🎯 Benefits

✅ **No more long URLs** in your code  
✅ **Automatic token management**  
✅ **Consistent naming convention**  
✅ **Easy to add new books**  
✅ **Fallback system** if mapping is missing  
✅ **Type-safe** with TypeScript  

## 🚨 Important Notes

- **Filename must match exactly** what's in the mappings
- **Upload to the `Eros/` folder** in Firebase Storage
- **Use underscores** in Firebase filenames, **hyphens** in book IDs
- **Always end with** `_Book_Cover.png`

Your book cover system is now fully automated! 🎉
