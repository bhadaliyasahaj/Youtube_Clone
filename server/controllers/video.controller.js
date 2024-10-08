import { createError } from "../error.js";
import Video from "../models/Video.model.js";
import User from "../models/User.model.js";
import Comment from "../models/Comment.model.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found!!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You Can Update Only Your Video"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found!!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      await Comment.deleteMany({videoID:req.params.id})
      // const playlist = await Playlist.find({playlist:{$in:req.params.id}})
      res.status(200).json("The Video Has Been Deleted!!");
    } else {
      return next(createError(403, "You Can Delete Only Your Video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  console.log(req.connection.remoteAddress);
  
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The View Has Been Increased");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      {
        $sort: { views: -1 ,createdAt:-1 }
      },
      {
        $limit: 10
      }
    ])
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const users = await User.findById(req.user.id);
    const subscribedChannels = users.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      }),
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const myvideos = async (req, res, next) => {
  const user = req.user.id;
  try {
    const videos = await Video.find({ userId: `${user}` });
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const category = async (req, res, next) => {
  try {
    const videos = await Video.find({ category: req.params.cat }).sort({
      views: -1,
    });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const gethistory = async (req, res, next) => {
  try {
    const users = await User.findById(req.user.id);
    const history = users.history;
    const videos = await Video.find({ _id: { $in: history } });
    res.status(200).json(videos);
  } catch (err) {
    next(createError(404, "History Not Found"));
  }
};

export const getChannelVideo = async(req,res,next)=>{
  try{
    const videos = await Video.aggregate([
      {
        $match:{userId:req.params.id}
      },
      {
        $sort:{createdAt:-1}
      }
    ])
    res.status(200).json(videos)
  }catch(err){
    next(createError(402,"Channel Video Not Found"))
  }
}
