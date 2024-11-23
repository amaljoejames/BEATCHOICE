'use client'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { ChevronUp, ChevronDown, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

function VideoQueue({ videos, onVote, onVideoClick }) {
  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto border-light-animated">
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <Card key={index} className="p-2 flex items-center justify-between bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2" onClick={() => onVideoClick(video.url)}>
              <img src={video.thumbnail} alt={video.title} className="w-16 h-9 object-cover rounded cursor-pointer" />
              <div className="text-sm text-gray-800 cursor-pointer">{video.title}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => onVote(index, 'up')}>
                <ChevronUp className="text-green-600" />
              </Button>
              <span className="text-gray-800">{video.votes}</span>
              <Button variant="ghost" size="icon" onClick={() => onVote(index, 'down')}>
                <ChevronDown className="text-red-600" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onVote(index, 'heart')}>
                <Heart className={video.liked ? 'text-pink-500' : 'text-gray-400'} />
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-gray-400 text-center">No videos added</div>
      )}
    </div>
  );
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPreview, setVideoPreview] = useState(null);
  const [queuedVideos, setQueuedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [streamerDashboardUrl, setStreamerDashboardUrl] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleShare = () => {
    if (streamerDashboardUrl) {
      navigator.clipboard.writeText(streamerDashboardUrl);
      alert('Dashboard URL copied to clipboard!');
    }
  };

  useEffect(() => {
    const fetchVideoData = async (url) => {
      let videoId;

      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
          videoId = parsedUrl.searchParams.get('v');
        } else if (parsedUrl.hostname === 'youtu.be') {
          videoId = parsedUrl.pathname.split('/')[1];
        }

        if (videoId) {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAbKAbibKC7bepwSIIHOiQi397xTYHqBI4&part=snippet`
          );

          if (response.data.items.length > 0) {
            const { title, thumbnails } = response.data.items[0].snippet;
            const videoData = {
              title,
              thumbnail: thumbnails.high.url,
              url: `https://www.youtube.com/embed/${videoId}`,
            };
            setVideoPreview(videoData);
          } else {
            throw new Error('Video not found');
          }
        } else {
          throw new Error('Invalid URL format');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        setVideoPreview(null);
        alert(error.message);
      }
    };

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      fetchVideoData(videoUrl);
    } else {
      setVideoPreview(null);
    }
  }, [videoUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoPreview) {
      const newVideo = {
        id: Date.now().toString(),
        title: videoPreview.title,
        thumbnail: videoPreview.thumbnail,
        votes: 0,
        liked: false,
        url: videoPreview.url,
      };
      setQueuedVideos((prev) => {
        const updatedVideos = [...prev, newVideo];
        return updatedVideos.sort((a, b) => b.votes - a.votes);
      });
      setCurrentVideoIndex(queuedVideos.length);
      setVideoUrl('');
      setVideoPreview(null);
    }
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleVote = (index, type) => {
    setQueuedVideos((prevVideos) => {
      const updatedVideos = prevVideos.map((video, i) => {
        if (i === index) {
          const updatedVotes = type === 'up' ? video.votes + 1 : type === 'down' ? video.votes - 1 : video.votes;
          const updatedLiked = type === 'heart' ? !video.liked : video.liked;
          return { ...video, votes: updatedVotes, liked: updatedLiked };
        }
        return video;
      });
      return updatedVideos.sort((a, b) => b.votes - a.votes);
    });
  };

  const handlePlayNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % queuedVideos.length);
  };

  const handlePlayPrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + queuedVideos.length) % queuedVideos.length);
  };

  const handleVideoClick = (url) => {
    const index = queuedVideos.findIndex((video) => video.url === url);
    if (index !== -1) {
      setCurrentVideoIndex(index);
    }
  };

  const handleVideoEnded = () => {
    handlePlayNext();
  };

  useEffect(() => {
    setStreamerDashboardUrl(window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://wallpaperaccess.com/full/19609.jpg')] bg-cover bg-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col md:flex-row">
        <header className="md:fixed left-0 top-0 md:top-18 p-6 md:p-10 flex justify-between items-center w-full z-20">
          <h1 className="text-4xl font-bold glow3d">BEATCHOICE</h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 shadow-lg"
            >
              Logout
            </Button>
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-4 py-2 shadow-lg"
            >
              Share
            </Button>
          </div>
        </header>

        <div className="container mx-auto p-4 flex-grow flex flex-col md:flex-row gap-8 justify-center pt-24">
          <div className="w-full md:w-1/2 space-y-4 mt-10">
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="text"
                placeholder="Paste YouTube URL here"
                value={videoUrl}
                onChange={handleUrlChange}
                className="bg-white/20 border-white/30 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                Add to Queue
              </Button>
            </form>
            {videoPreview && (
              <Card className="p-4 bg-white/20 backdrop-blur-md mb-6">
                <img src={videoPreview.thumbnail} alt="Video Preview" className="w-full rounded-md mb-2" />
                <p className="text-sm">{videoPreview.title}</p>
              </Card>
            )}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border-light-animated mt-4">
              <h2 className="text-xl font-semibold mb-2 glow">Upcoming Songs</h2>
              <VideoQueue videos={queuedVideos} onVote={handleVote} onVideoClick={handleVideoClick} />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            {queuedVideos.length > 0 ? (
              <iframe
                width="100%"
                height="500px"
                src={queuedVideos[currentVideoIndex]?.url}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
                onEnded={handleVideoEnded}
              />
            ) : (
              <div className="w-full h-[500px] flex items-center justify-center text-gray-400 bg-black/20 rounded-md">
                <p className="text-lg">No videos available. Add a video to get started!</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={handlePlayPrev} className="bg-gray-600 hover:bg-gray-700 text-white">
                Previous
              </Button>
              <Button onClick={handlePlayNext} className="bg-gray-600 hover:bg-gray-700 text-white">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
