import { Post } from '../models/post.models.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createPost = async (req, res) => {
  const userId = req.userId;
  const { location, content } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User is not registered' });
    return;
  }

  // Access the file path from req.file
  const postImageLocal = req.file.path;
  console.log(postImageLocal);

  if (!postImageLocal) {
    res.status(400).json({ message: 'Image is necessary' });
    return;
  }

  const postImage = await uploadOnCloudinary(postImageLocal);
//   console.log(postImage);

  if (!postImage) {
    res.status(400).json({ message: 'Post image is required' });
    return;
  }

  try {
    const newPost = await Post.create({
      user: userId, // assuming Post model has a 'user' field for the user who created the post
      location: location,
      content: content,
      image: postImage.url,
    });

    res.status(201).json(
      new ApiResponse(200, newPost, 'Post successfully created')
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
