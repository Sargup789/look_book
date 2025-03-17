// This is a reference schema for the backend database

// Look Schema
const LookSchema = {
  id: String, // Unique identifier
  title: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  mediaItems: [
    {
      id: String,
      type: String, // 'image' or 'video'
      url: String,
      duration: Number, // for videos
      annotations: [
        {
          id: String,
          productId: String,
          x: Number, // x-coordinate as percentage of image width
          y: Number, // y-coordinate as percentage of image height
        }
      ]
    }
  ],
  products: [
    {
      id: String,
      name: String,
      price: Number,
      imageUrl: String,
      productUrl: String,
    }
  ],
  creator: {
    id: String,
    name: String,
    isCelebrity: Boolean,
    profileImage: String,
  },
  engagement: {
    likes: Number,
    saves: Number,
    views: Number,
  }
};

// Lookbook Schema
const LookbookSchema = {
  id: String,
  title: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  looks: [LookSchema],
  isActive: Boolean,
};

// User Engagement Schema
const UserEngagementSchema = {
  userId: String,
  lookId: String,
  liked: Boolean,
  saved: Boolean,
  viewedAt: Date,
}; 